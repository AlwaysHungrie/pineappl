#!/bin/bash

# Script to delete all AWS resources created by create-instance.sh
# This script will clean up EC2 instances, Elastic IPs, security groups, and key pairs

set -e  # Exit on any error

# Configuration variables (must match create-instance.sh)
INSTANCE_NAME="pineappl-instance"
KEY_NAME="pineappl-key"
SECURITY_GROUP_NAME="pineappl-sg"

echo "🗑️  Starting cleanup of AWS resources..."

# Check if AWS CLI is configured
if ! aws --profile admin sts get-caller-identity &>/dev/null; then
    echo "❌ AWS CLI is not configured. Please run 'aws configure' first."
    exit 1
fi

echo "✅ AWS CLI is configured"

# Function to check if a resource exists
resource_exists() {
    local resource_type=$1
    local resource_name=$2
    
    case $resource_type in
        "instance")
            aws --profile admin ec2 describe-instances \
                --filters "Name=tag:Name,Values=$resource_name" \
                --query 'Reservations[].Instances[].InstanceId' \
                --output text 2>/dev/null | grep -q .
            ;;
        "key-pair")
            aws --profile admin ec2 describe-key-pairs \
                --key-names "$resource_name" &>/dev/null
            ;;
        "security-group")
            aws --profile admin ec2 describe-security-groups \
                --group-names "$resource_name" &>/dev/null
            ;;
        *)
            return 1
            ;;
    esac
}

# Function to get resource IDs
get_resource_id() {
    local resource_type=$1
    local resource_name=$2
    
    case $resource_type in
        "instance")
            aws --profile admin ec2 describe-instances \
                --filters "Name=tag:Name,Values=$resource_name" \
                --query 'Reservations[].Instances[].InstanceId' \
                --output text 2>/dev/null
            ;;
        "elastic-ip")
            aws --profile admin ec2 describe-instances \
                --filters "Name=tag:Name,Values=$INSTANCE_NAME" \
                --query 'Reservations[].Instances[].PublicIpAddress' \
                --output text 2>/dev/null
            ;;
        "security-group")
            aws --profile admin ec2 describe-security-groups \
                --group-names "$resource_name" \
                --query 'SecurityGroups[0].GroupId' \
                --output text 2>/dev/null
            ;;
        *)
            echo ""
            ;;
    esac
}

# 1. Terminate EC2 instances
echo "🖥️  Looking for EC2 instances to terminate..."
if resource_exists "instance" "$INSTANCE_NAME"; then
    INSTANCE_IDS=$(get_resource_id "instance" "$INSTANCE_NAME")
    
    if [ -n "$INSTANCE_IDS" ]; then
        echo "📋 Found instances: $INSTANCE_IDS"
        
        # Terminate all instances
        echo "🗑️  Terminating instances..."
        aws --profile admin ec2 terminate-instances --instance-ids $INSTANCE_IDS
        
        # Wait for instances to be terminated
        echo "⏳ Waiting for instances to be terminated..."
        aws --profile admin ec2 wait instance-terminated --instance-ids $INSTANCE_IDS
        echo "✅ Instances terminated successfully"
    fi
else
    echo "ℹ️  No instances found with name: $INSTANCE_NAME"
fi

# 2. Release Elastic IPs
echo "🌐 Looking for Elastic IPs to release..."
if resource_exists "instance" "$INSTANCE_NAME"; then
    PUBLIC_IP=$(get_resource_id "elastic-ip" "$INSTANCE_NAME")
    
    if [ -n "$PUBLIC_IP" ] && [ "$PUBLIC_IP" != "None" ]; then
        echo "📋 Found public IP: $PUBLIC_IP"
        
        # Get the allocation ID for this IP
        ALLOCATION_ID=$(aws --profile admin ec2 describe-addresses \
            --public-ips "$PUBLIC_IP" \
            --query 'Addresses[0].AllocationId' \
            --output text 2>/dev/null)
        
        if [ -n "$ALLOCATION_ID" ] && [ "$ALLOCATION_ID" != "None" ]; then
            echo "🗑️  Releasing Elastic IP: $PUBLIC_IP"
            aws --profile admin ec2 release-address --allocation-id "$ALLOCATION_ID"
            echo "✅ Elastic IP released successfully"
        else
            echo "ℹ️  No allocation ID found for IP: $PUBLIC_IP"
        fi
    fi
else
    echo "ℹ️  No instances found, skipping Elastic IP cleanup"
fi

# 3. Delete security group
echo "🛡️  Looking for security group to delete..."
if resource_exists "security-group" "$SECURITY_GROUP_NAME"; then
    SG_ID=$(get_resource_id "security-group" "$SECURITY_GROUP_NAME")
    
    if [ -n "$SG_ID" ]; then
        echo "📋 Found security group: $SG_ID"
        
        # Check if security group is still attached to any instances
        ATTACHED_INSTANCES=$(aws --profile admin ec2 describe-instances \
            --filters "Name=instance.group-id,Values=$SG_ID" \
            --query 'Reservations[].Instances[].InstanceId' \
            --output text 2>/dev/null)
        
        if [ -n "$ATTACHED_INSTANCES" ]; then
            echo "⚠️  Security group is still attached to instances: $ATTACHED_INSTANCES"
            echo "   Waiting for instances to be fully terminated..."
            sleep 10
        fi
        
        echo "🗑️  Deleting security group: $SG_ID"
        aws --profile admin ec2 delete-security-group --group-id "$SG_ID"
        echo "✅ Security group deleted successfully"
    fi
else
    echo "ℹ️  Security group not found: $SECURITY_GROUP_NAME"
fi

# 4. Delete key pair
echo "🔑 Looking for key pair to delete..."
if resource_exists "key-pair" "$KEY_NAME"; then
    echo "📋 Found key pair: $KEY_NAME"
    
    echo "🗑️  Deleting key pair: $KEY_NAME"
    aws --profile admin ec2 delete-key-pair --key-name "$KEY_NAME"
    echo "✅ Key pair deleted successfully"
    
    # Remove local key file if it exists
    if [ -f "$KEY_NAME.pem" ]; then
        echo "🗑️  Removing local key file: $KEY_NAME.pem"
        rm -f "$KEY_NAME.pem"
        echo "✅ Local key file removed"
    fi
else
    echo "ℹ️  Key pair not found: $KEY_NAME"
fi

# 5. Clean up any orphaned resources
echo "🧹 Looking for orphaned resources..."

# Check for any remaining instances with similar names
REMAINING_INSTANCES=$(aws --profile admin ec2 describe-instances \
    --filters "Name=tag:Name,Values=*pineappl*" "Name=instance-state-name,Values=running,stopped,pending" \
    --query 'Reservations[].Instances[].InstanceId' \
    --output text 2>/dev/null)

if [ -n "$REMAINING_INSTANCES" ]; then
    echo "⚠️  Found remaining instances with 'pineappl' in name: $REMAINING_INSTANCES"
    echo "   These may need manual cleanup if not created by this script"
fi

# Check for any remaining security groups with similar names
REMAINING_SGS=$(aws --profile admin ec2 describe-security-groups \
    --filters "Name=group-name,Values=*pineappl*" \
    --query 'SecurityGroups[].GroupId' \
    --output text 2>/dev/null)

if [ -n "$REMAINING_SGS" ]; then
    echo "⚠️  Found remaining security groups with 'pineappl' in name: $REMAINING_SGS"
    echo "   These may need manual cleanup if not created by this script"
fi

echo ""
echo "🎉 Cleanup complete!"
echo "=================================="
echo "✅ EC2 instances terminated"
echo "✅ Elastic IPs released"
echo "✅ Security groups deleted"
echo "✅ Key pairs deleted"
echo "✅ Local key files removed"
echo "=================================="
echo ""
echo "📝 Note: If you see any warnings above about remaining resources,"
echo "   you may need to manually clean them up or wait for them to be"
echo "   fully terminated before running this script again."
echo ""
echo "🔍 To verify cleanup, you can run:"
echo "   aws --profile admin ec2 describe-instances --filters \"Name=tag:Name,Values=*pineappl*\""
echo "   aws --profile admin ec2 describe-security-groups --filters \"Name=group-name,Values=*pineappl*\""
echo "   aws --profile admin ec2 describe-key-pairs --key-names \"*pineappl*\""
