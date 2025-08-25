#!/bin/bash

# Script to create an EC2 instance with proper security groups and elastic IP
# This script creates a free tier eligible instance with Ubuntu

set -e  # Exit on any error

# Configuration variables
INSTANCE_TYPE="t2.micro"  # Free tier eligible
AMI_NAME="ubuntu/images/hvm-ssd/ubuntu-*"
KEY_NAME="pineappl-key"
SECURITY_GROUP_NAME="pineappl-sg"
INSTANCE_NAME="pineappl-instance"

echo "🚀 Starting EC2 instance creation..."

# Check if AWS CLI is configured
if ! aws --profile admin sts get-caller-identity &>/dev/null; then
    echo "❌ AWS CLI is not configured. Please run 'aws configure' first."
    exit 1
fi

echo "✅ AWS CLI is configured"

# Get the latest Ubuntu 22.04 AMI ID
echo "🔍 Finding latest Ubuntu 22.04 AMI..."
AMI_ID=$(aws --profile admin ec2 describe-images \
    --owners 099720109477 \
    --filters "Name=name,Values=$AMI_NAME" "Name=state,Values=available" \
    --query "sort_by(Images, &CreationDate)[-1].ImageId" \
    --output text)

if [ -z "$AMI_ID" ]; then
    echo "❌ Could not find Ubuntu AMI"
    exit 1
fi

echo "✅ Found AMI: $AMI_ID"

# Create key pair if it doesn't exist
if ! aws --profile admin ec2 describe-key-pairs --key-names "$KEY_NAME" &>/dev/null; then
    echo "🔑 Creating key pair: $KEY_NAME"
    aws --profile admin ec2 create-key-pair --key-name "$KEY_NAME" --query 'KeyMaterial' --output text > "$KEY_NAME.pem"
    chmod 400 "$KEY_NAME.pem"
    echo "✅ Key pair created and saved to $KEY_NAME.pem"
else
    echo "✅ Key pair $KEY_NAME already exists"
fi

# Create security group if it doesn't exist
if ! aws --profile admin ec2 describe-security-groups --group-names "$SECURITY_GROUP_NAME" &>/dev/null; then
    echo "🛡️ Creating security group: $SECURITY_GROUP_NAME"
    SG_ID=$(aws --profile admin ec2 create-security-group \
        --group-name "$SECURITY_GROUP_NAME" \
        --description "Security group for Pineappl instance" \
        --query 'GroupId' --output text)
    
    # Add SSH rule
    aws --profile admin ec2 authorize-security-group-ingress \
        --group-id "$SG_ID" \
        --protocol tcp \
        --port 22 \
        --cidr 0.0.0.0/0 
    
    # Add HTTP rule
    aws --profile admin ec2 authorize-security-group-ingress \
        --group-id "$SG_ID" \
        --protocol tcp \
        --port 80 \
        --cidr 0.0.0.0/0 
    
    # Add HTTPS rule
    aws --profile admin ec2 authorize-security-group-ingress \
        --group-id "$SG_ID" \
        --protocol tcp \
        --port 443 \
        --cidr 0.0.0.0/0 
    
    echo "✅ Security group created with ID: $SG_ID"
else
    echo "✅ Security group $SECURITY_GROUP_NAME already exists"
    SG_ID=$(aws --profile admin ec2 describe-security-groups \
        --group-names "$SECURITY_GROUP_NAME" \
        --query 'SecurityGroups[0].GroupId' --output text)
fi

# Create EC2 instance
echo "🖥️ Creating EC2 instance..."
INSTANCE_ID=$(aws --profile admin ec2 run-instances \
    --image-id "$AMI_ID" \
    --count 1 \
    --instance-type "$INSTANCE_TYPE" \
    --key-name "$KEY_NAME" \
    --security-group-ids "$SG_ID" \
    --tag-specifications "ResourceType=instance,Tags=[{Key=Name,Value=$INSTANCE_NAME}]" \
    --query 'Instances[0].InstanceId' --output text)

if [ -z "$INSTANCE_ID" ]; then
    echo "❌ Failed to create instance"
    exit 1
fi

echo "✅ Instance created with ID: $INSTANCE_ID"

# Wait for instance to be running
echo "⏳ Waiting for instance to be running..."
aws --profile admin ec2 wait instance-running --instance-ids "$INSTANCE_ID"
echo "✅ Instance is now running"

# Allocate Elastic IP
echo "🌐 Allocating Elastic IP..."
EIP_ID=$(aws --profile admin ec2 allocate-address \
    --domain vpc \
    --query 'AllocationId' --output text)

if [ -z "$EIP_ID" ]; then
    echo "❌ Failed to allocate Elastic IP"
    exit 1
fi

echo "✅ Elastic IP allocated with ID: $EIP_ID"

# Associate Elastic IP with instance
echo "🔗 Associating Elastic IP with instance..."
aws --profile admin ec2 associate-address \
    --instance-id "$INSTANCE_ID" \
    --allocation-id "$EIP_ID"

# Get the public IP
PUBLIC_IP=$(aws --profile admin ec2 describe-addresses \
    --allocation-ids "$EIP_ID" \
    --query 'Addresses[0].PublicIp' --output text)

echo "✅ Elastic IP $PUBLIC_IP associated with instance"

# Wait a bit for the instance to fully initialize
echo "⏳ Waiting for instance to fully initialize..."
sleep 30

echo ""
echo "🎉 Instance setup complete!"
echo "=================================="
echo "Instance ID: $INSTANCE_ID"
echo "Public IP: $PUBLIC_IP"
echo "Key file: $KEY_NAME.pem"
echo "Security Group: $SECURITY_GROUP_NAME"
echo "=================================="

echo " Next steps: "
echo "1. scp -i $KEY_NAME.pem install.sh ubuntu@$PUBLIC_IP:~/install.sh"
echo "2. ssh -i $KEY_NAME.pem ubuntu@$PUBLIC_IP"
echo "3. chmod +x install.sh"
echo "4. ./install.sh"

echo ""
echo "🔑 To SSH into your instance, use:"
echo "ssh -i $KEY_NAME.pem ubuntu@$PUBLIC_IP"
echo ""
echo "📝 Note: The key file $KEY_NAME.pem has been created with proper permissions."
echo "   Keep this file secure and don't share it."
echo ""
echo "🌐 Your instance is accessible via:"
echo "   HTTP:  http://$PUBLIC_IP"
echo "   HTTPS: https://$PUBLIC_IP"
echo ""
echo "⚠️  Remember to terminate the instance when you're done to avoid charges:"
echo "   aws ec2 terminate-instances --instance-ids $INSTANCE_ID"
echo "   aws ec2 release-address --allocation-id $EIP_ID"
