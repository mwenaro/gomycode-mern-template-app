#!/bin/bash

# MERN Template Setup Script
# This script helps you set up the MERN template quickly

echo "🚀 Setting up MERN Template..."
echo "================================"

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

# Check if Node.js is installed
check_node() {
    if command -v node &> /dev/null; then
        NODE_VERSION=$(node --version)
        print_success "Node.js is installed: $NODE_VERSION"
        
        # Check if version is 18 or higher
        NODE_MAJOR_VERSION=$(echo $NODE_VERSION | cut -d'.' -f1 | sed 's/v//')
        if [ "$NODE_MAJOR_VERSION" -ge 18 ]; then
            print_success "Node.js version is compatible (>=18)"
        else
            print_warning "Node.js version should be 18 or higher for best compatibility"
        fi
    else
        print_error "Node.js is not installed. Please install Node.js 18+ from https://nodejs.org/"
        exit 1
    fi
}

# Check if npm is installed
check_npm() {
    if command -v npm &> /dev/null; then
        NPM_VERSION=$(npm --version)
        print_success "npm is installed: $NPM_VERSION"
    else
        print_error "npm is not installed. Please install npm."
        exit 1
    fi
}

# Install dependencies
install_dependencies() {
    print_status "Installing dependencies..."
    
    # Install root dependencies
    print_status "Installing root dependencies..."
    npm install
    
    # Install server dependencies
    print_status "Installing server dependencies..."
    cd server
    npm install
    cd ..
    
    # Install client dependencies
    print_status "Installing client dependencies..."
    cd client
    npm install
    cd ..
    
    print_success "All dependencies installed successfully!"
}

# Setup environment files
setup_env_files() {
    print_status "Setting up environment files..."
    
    # Server .env
    if [ ! -f "server/.env" ]; then
        cp server/env-example server/.env
        print_success "Created server/.env from template"
        print_warning "Please update server/.env with your MongoDB connection string"
    else
        print_warning "server/.env already exists, skipping..."
    fi
    
    # Client .env
    if [ ! -f "client/.env" ]; then
        cp client/.env.example client/.env
        print_success "Created client/.env from template"
    else
        print_warning "client/.env already exists, skipping..."
    fi
}

# Display setup completion message
show_completion_message() {
    echo ""
    echo "🎉 Setup completed successfully!"
    echo "================================"
    echo ""
    echo "📋 Next steps:"
    echo "1. Update server/.env with your MongoDB connection string"
    echo "2. Start the development servers:"
    echo "   npm start  (runs both client and server)"
    echo ""
    echo "🌐 Application URLs:"
    echo "   Client: http://localhost:5173"
    echo "   Server: http://localhost:5000"
    echo ""
    echo "📚 For more information, see README.md"
}

# Main execution
main() {
    print_status "Starting MERN template setup..."
    
    check_node
    check_npm
    install_dependencies
    setup_env_files
    show_completion_message
    
    print_success "Setup script completed! 🚀"
}

# Run main function
main
