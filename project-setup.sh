#!/bin/bash

set -e

# Check if Redis is installed, install it if missing
if ! command -v redis-server &> /dev/null; then
    echo "Redis not found. Installing via Homebrew..."
    brew install redis
else
    echo "Redis is already installed."
fi

# Install dependencies
echo "Installing npm dependencies..."
npm install
