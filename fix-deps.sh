#!/bin/bash

# Fix dependencies script
echo "🔧 Fixing dependencies..."

echo "📦 Installing server dependencies..."
cd server
npm install
cd ..

echo "📦 Installing client dependencies..."
cd client
npm install
cd ..

echo "✅ Dependencies fixed! You can now run the application with:"
echo "   npm start"
