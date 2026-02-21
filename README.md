# Haven Design Suite - Full-Stack Application

A luxury interior design and furniture e-commerce platform with a complete admin panel for managing products, enquiries, appointments, and gallery.

## 🚀 Features

### User Website
- **Home Page** - Elegant hero section with featured categories
- **Collections** - Browse furniture and decor by category
- **Solutions** - Interior design solutions and services
- **About** - Company information and values
- **Contact** - Enquiry form for consultations

### Admin Panel
- **Dashboard** - Overview of business metrics
- **Products** - Full CRUD operations with image upload
- **Enquiries** - Manage customer contact form submissions
- **Appointments** - Track and manage consultation bookings
- **Gallery** - Upload and manage portfolio images
- **Content** - Edit website content dynamically
- **Settings** - Configure application settings

## 🛠️ Tech Stack

### Frontend
- **React 18** with TypeScript
- **Vite** for blazing fast development
- **TailwindCSS** for styling
- **shadcn/ui** for UI components
- **React Router** for navigation
- **Axios** for API calls
- **Framer Motion** for animations

### Backend
- **Node.js** with Express.js
- **TypeScript** for type safety
- **MongoDB** with Mongoose ODM
- **JWT** for authentication
- **Cloudinary** for image storage
- **Multer** for file uploads
- **bcryptjs** for password hashing

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v18 or higher)
- **npm** or **yarn**
- **MongoDB** (local or MongoDB Atlas account)
- **Cloudinary** account (for image uploads)

## 🔧 Installation

### 1. Clone the repository
```bash
git clone <your-repo-url>
cd haven-design-suite
```

### 2. Install dependencies

**Frontend:**
```bash
npm install
```

**Backend:**
```bash
cd server
npm install --legacy-peer-deps
cd ..
```

### 3. Configure Environment Variables

**Frontend** - Create `.env` in the root directory:
```env
VITE_API_URL=http://localhost:5000/api
```

**Backend** - Create `server/.env`:
```env
# Server
PORT=5000
NODE_ENV=development

# MongoDB
MONGODB_URI=mongodb://localhost:27017/haven-design-suite
# Or for MongoDB Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/haven-design-suite

# JWT
JWT_SECRET=your-super-secret-jwt-key-change-this
JWT_EXPIRES_IN=7d

# Cloudinary (Get these from https://cloudinary.com)
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret

# Admin Credentials
ADMIN_EMAIL=admin@Sri Venkateswara Furnishings.in
ADMIN_PASSWORD=admin123
```

### 4. Set up MongoDB

**Option A: Local MongoDB**
```bash
# Install MongoDB (macOS)
brew tap mongodb/brew
brew install mongodb-community
brew services start mongodb-community
```

**Option B: MongoDB Atlas (Cloud)**
1. Create account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a new cluster
3. Get your connection string
4. Update `MONGODB_URI` in `server/.env`

### 5. Set up Cloudinary

1. Create account at [Cloudinary](https://cloudinary.com)
2. Go to Dashboard
3. Copy your Cloud Name, API Key, and API Secret
4. Update the Cloudinary variables in `server/.env`

### 6. Seed the Database

```bash
cd server
npm run seed
```

This will create:
- Admin user (admin@Sri Venkateswara Furnishings.in / admin123)
- Sample products
- Default site content

## 🚀 Running the Application

### Development Mode

**Run both frontend and backend concurrently:**
```bash
npm run dev:all
```

**Or run them separately:**

Terminal 1 (Frontend):
```bash
npm run dev
```

Terminal 2 (Backend):
```bash
npm run dev:server
```

The application will be available at:
- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:5000/api
- **Admin Panel**: http://localhost:5173/admin/login

### Production Build

```bash
# Build frontend
npm run build

# Build backend
cd server
npm run build

# Start production server
npm start
```

## 🔐 Default Admin Credentials

```
Email: admin@Sri Venkateswara Furnishings.in
Password: admin123
```

**⚠️ Important:** Change these credentials after first login!

## 📁 Project Structure

```
haven-design-suite/
├── src/                      # Frontend source code
│   ├── components/           # React components
│   ├── pages/               # Page components
│   ├── lib/                 # Utilities (API client)
│   └── hooks/               # Custom hooks
├── server/                   # Backend source code
│   ├── src/
│   │   ├── routes/          # API routes
│   │   ├── models/          # Mongoose models
│   │   ├── middleware/      # Express middleware
│   │   ├── config/          # Configuration files
│   │   ├── utils/           # Utility functions
│   │   └── scripts/         # Database scripts
│   └── package.json
├── public/                   # Static assets
└── package.json
```

## 🔌 API Endpoints

### Authentication
- `POST /api/auth/login` - Admin login
- `GET /api/auth/me` - Get current user
- `POST /api/auth/logout` - Logout

### Products
- `GET /api/products` - List products (with filters)
- `GET /api/products/:id` - Get single product
- `POST /api/products` - Create product (admin)
- `PUT /api/products/:id` - Update product (admin)
- `DELETE /api/products/:id` - Delete product (admin)
- `PATCH /api/products/:id/visibility` - Toggle visibility (admin)

### Enquiries
- `POST /api/enquiries` - Submit enquiry
- `GET /api/enquiries` - List enquiries (admin)
- `PATCH /api/enquiries/:id/status` - Update status (admin)
- `DELETE /api/enquiries/:id` - Delete enquiry (admin)

### Appointments
- `POST /api/appointments` - Book appointment
- `GET /api/appointments` - List appointments (admin)
- `PATCH /api/appointments/:id/status` - Update status (admin)
- `DELETE /api/appointments/:id` - Delete appointment (admin)

### Gallery
- `GET /api/gallery` - Get gallery images
- `POST /api/gallery` - Upload image (admin)
- `DELETE /api/gallery/:id` - Delete image (admin)

### Content
- `GET /api/content` - Get site content
- `PUT /api/content` - Update content (admin)
- `POST /api/content/bulk` - Bulk update (admin)

## 🧪 Testing

Test the API using the health check endpoint:
```bash
curl http://localhost:5000/api/health
```

## 🐛 Troubleshooting

### MongoDB Connection Issues
- Ensure MongoDB is running: `brew services list`
- Check connection string in `.env`
- For Atlas, whitelist your IP address

### Cloudinary Upload Issues
- Verify credentials in `.env`
- Check Cloudinary dashboard for quota limits
- Ensure image size is within limits (5MB for products, 10MB for gallery)

### Port Already in Use
```bash
# Kill process on port 5000
lsof -ti:5000 | xargs kill -9

# Kill process on port 5173
lsof -ti:5173 | xargs kill -9
```

## 📝 License

This project is licensed under the MIT License.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📧 Support

For support, email hello@Sri Venkateswara Furnishings.in or create an issue in the repository.
