#!/bin/bash

# Ubuntu Server Setup Script
# Installs Node.js (via nvm), PM2, and nginx

set -e  # Exit on any error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Function to check if command exists
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

# Function to check if running as root
check_root() {
    if [[ $EUID -eq 0 ]]; then
        print_error "This script should not be run as root. Please run as a regular user with sudo privileges."
        exit 1
    fi
}

# Function to update system packages
update_system() {
    print_status "Updating system packages..."
    sudo apt update && sudo apt upgrade -y
    print_success "System packages updated successfully"
}

# Function to install essential packages
install_essential_packages() {
    print_status "Installing essential packages..."
    sudo apt install -y curl wget git build-essential
    print_success "Essential packages installed successfully"
}

# Function to install nvm and Node.js
install_nodejs() {
    print_status "Installing Node.js via nvm..."
    
    # Check if nvm is already installed
    if [ -d "$HOME/.nvm" ]; then
        print_warning "nvm is already installed"
    else
        # Install nvm
        print_status "Installing nvm..."
        curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
        
        # Source nvm
        export NVM_DIR="$HOME/.nvm"
        [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
        [ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"
        
        print_success "nvm installed successfully"
    fi
    
    # Source nvm for current session
    export NVM_DIR="$HOME/.nvm"
    [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
    [ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"
    
    # Install latest LTS version of Node.js
    print_status "Installing latest LTS version of Node.js..."
    nvm install --lts
    nvm use --lts
    nvm alias default node
    
    # Verify installation
    NODE_VERSION=$(node --version)
    NPM_VERSION=$(npm --version)
    print_success "Node.js $NODE_VERSION and npm $NPM_VERSION installed successfully"
}

# Function to install PM2
install_pm2() {
    print_status "Installing PM2..."
    
    if command_exists pm2; then
        print_warning "PM2 is already installed"
    else
        npm install -g pm2
        print_success "PM2 installed successfully"
    fi
}

# Function to install nginx
install_nginx() {
    print_status "Installing nginx..."
    
    if command_exists nginx; then
        print_warning "nginx is already installed"
    else
        sudo apt install -y nginx
        print_success "nginx installed successfully"
    fi
    
    # Start and enable nginx
    print_status "Starting and enabling nginx..."
    sudo systemctl start nginx
    sudo systemctl enable nginx
    print_success "nginx started and enabled"
    
    # Configure firewall (if ufw is active)
    if command_exists ufw && sudo ufw status | grep -q "Status: active"; then
        print_status "Configuring firewall for nginx..."
        sudo ufw allow 'Nginx Full'
        print_success "Firewall configured for nginx"
    fi
}

# Function to display final information
display_final_info() {
    echo
    echo -e "${GREEN}========================================${NC}"
    echo -e "${GREEN}           INSTALLATION COMPLETE        ${NC}"
    echo -e "${GREEN}========================================${NC}"
    echo
    echo -e "${BLUE}Installed Components:${NC}"
    echo -e "  • Node.js $(node --version) (via nvm)"
    echo -e "  • npm $(npm --version)"
    echo -e "  • PM2 $(pm2 --version)"
    echo -e "  • nginx $(nginx -v 2>&1 | cut -d' ' -f3)"
    echo
    echo -e "${BLUE}Next Steps:${NC}"
    echo -e "  1. Restart your terminal or run: source ~/.bashrc"
    echo -e "  2. Verify nvm works: nvm --version"
    echo -e "  3. Check nginx status: sudo systemctl status nginx"
    echo -e "  4. Access nginx default page: http://your-server-ip"
    echo -e "  5. Run pm2 startup: pm2 startup"
    echo
    echo -e "${BLUE}Useful Commands:${NC}"
    echo -e "  • Switch Node.js version: nvm use <version>"
    echo -e "  • List installed Node.js versions: nvm ls"
    echo -e "  • PM2 commands: pm2 start, pm2 list, pm2 stop"
    echo -e "  • nginx commands: sudo systemctl restart nginx"
    echo
}

# Main installation function
main() {
    echo -e "${BLUE}========================================${NC}"
    echo -e "${BLUE}    Ubuntu Server Setup Script         ${NC}"
    echo -e "${BLUE}========================================${NC}"
    echo
    
    # Check if running as root
    check_root
    
    # Update system
    update_system
    
    # Install essential packages
    install_essential_packages
    
    # Install Node.js via nvm
    install_nodejs
    
    # Install PM2
    # install_pm2
    
    # Install nginx
    install_nginx
    
    # Display final information
    display_final_info
}

# Run main function
main "$@"
