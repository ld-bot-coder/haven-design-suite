#!/bin/bash

# Haven Design Suite - Quick Setup Script

echo "🏠 Haven Design Suite - Quick Setup"
echo "===================================="
echo ""

# Check if MongoDB is running
echo "📊 Checking MongoDB..."
if ! pgrep -x "mongod" > /dev/null; then
    echo "⚠️  MongoDB is not running!"
    echo "   Start it with: brew services start mongodb-community"
    echo "   Or use MongoDB Atlas (cloud)"
    read -p "   Continue anyway? (y/n) " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        exit 1
    fi
else
    echo "✅ MongoDB is running"
fi

echo ""
echo "📦 Installing dependencies..."
echo ""

# Install frontend dependencies
echo "Installing frontend dependencies..."
npm install

# Install backend dependencies
echo "Installing backend dependencies..."
cd server
npm install --legacy-peer-deps
cd ..

echo ""
echo "✅ Dependencies installed!"
echo ""

# Check for .env files
if [ ! -f ".env" ]; then
    echo "⚠️  Frontend .env file not found"
    echo "   Creating .env from template..."
    echo "VITE_API_URL=http://localhost:5000/api" > .env
    echo "✅ Created .env"
fi

if [ ! -f "server/.env" ]; then
    echo "⚠️  Backend .env file not found"
    echo "   Please configure server/.env with your credentials"
    echo "   Copy from server/.env.example and fill in:"
    echo "   - MongoDB URI"
    echo "   - Cloudinary credentials"
    echo ""
    read -p "   Open .env.example now? (y/n) " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        open server/.env.example 2>/dev/null || cat server/.env.example
    fi
else
    echo "✅ Backend .env exists"
fi

echo ""
read -p "🌱 Seed the database with sample data? (y/n) " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    echo "Seeding database..."
    cd server
    npm run seed
    cd ..
fi

echo ""
echo "🎉 Setup complete!"
echo ""
echo "📝 Next steps:"
echo "   1. Configure server/.env with your MongoDB and Cloudinary credentials"
echo "   2. Run: npm run dev:all"
echo "   3. Open: http://localhost:5173"
echo "   4. Admin login: admin@Sri Venkateswara Furnishings.in / admin123"
echo ""
echo "📚 See README.md for detailed instructions"
echo ""
