#!/bin/bash

echo "Cleaning up project..."

# Delete node_modules
if [ -d "node_modules" ]; then
    echo "Removing node_modules..."
    rm -rf node_modules
fi

# Delete package-lock.json
if [ -f "package-lock.json" ]; then
    echo "Removing package-lock.json..."
    rm package-lock.json
fi

# Delete yarn.lock if exists
if [ -f "yarn.lock" ]; then
    echo "Removing yarn.lock..."
    rm yarn.lock
fi

# Clear npm cache
echo "Clearing npm cache..."
npm cache clean --force

# Remove Vite cache
if [ -d ".vite" ]; then
    echo "Removing .vite cache..."
    rm -rf .vite
fi

# Remove dist folder
if [ -d "dist" ]; then
    echo "Removing dist folder..."
    rm -rf dist
fi

echo "Installing dependencies..."
npm install

echo "Setup complete! Run 'npm run dev' to start the development server."