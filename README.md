# MERN Stack Template

A modern, production-ready MERN (MongoDB, Express.js, React, Node.js) stack template with TypeScript, designed to help developers quickly bootstrap their full-stack applications.

## ✨ Features

### Frontend (React + TypeScript + Vite)
- ⚡ **Vite** for lightning-fast development
- 🎨 **Tailwind CSS** for utility-first styling
- 📱 **Responsive Design** out of the box
- 🔒 **TypeScript** for type safety
- 🧹 **ESLint** for code quality
- 🔄 **Hot Module Replacement** for instant updates

### Backend (Node.js + Express + TypeScript)
- 🚀 **Express.js** web framework
- 🗄️ **MongoDB** with **Mongoose** ODM
- 🔐 **Environment variables** configuration
- 🌐 **CORS** enabled for cross-origin requests
- 📝 **TypeScript** for better development experience
- 🔄 **Nodemon** for auto-restart during development

### Development Experience
- 🛠️ **Concurrently** run both client and server
- 📋 **Consistent code formatting**
- 🎯 **RESTful API** architecture
- 🧪 **Sample Todo application** included
- 📚 **Comprehensive documentation**

## 🚀 Quick Start

### Prerequisites

Make sure you have the following installed:
- **Node.js** (v18 or higher) - [Download here](https://nodejs.org/)
- **npm** or **yarn** package manager
- **MongoDB** - [MongoDB Atlas](https://www.mongodb.com/atlas) (cloud) or [MongoDB Community](https://www.mongodb.com/try/download/community) (local)
- **Git** - [Download here](https://git-scm.com/)

### 1. Clone the Repository

```bash
git clone https://github.com/mwenaro/gomycode-mern-template-app.git
cd gomycode-mern-template-app
```

### 2. Install Dependencies

Install both client and server dependencies:

```bash
# Quick setup with our script
./setup.sh

# Or if you encounter any dependency issues:
./fix-deps.sh

# Manual installation:
# Install server dependencies
cd server
npm install

# Install client dependencies
cd ../client
npm install
```

### 3. Environment Setup

Create environment files:

```bash
# Create server environment file
cd ../server
cp env-example .env
```

Edit the `.env` file and add your MongoDB connection string:

```env
MONGODB_URI=mongodb://localhost:27017/your-database-name
# OR for MongoDB Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/database-name

PORT=5000
NODE_ENV=development
```

### 4. Start Development Servers

You can start both client and server with a single command:

```bash
cd client
npm start
```

This will run:
- **Client** on `http://localhost:5173`
- **Server** on `http://localhost:5000`

Or start them individually:

```bash
# Terminal 1 - Start server
cd server
npm run dev

# Terminal 2 - Start client
cd client
npm run dev
```

## 📁 Project Structure

```
gomycode-mern-template-app/
├── client/                     # React frontend
│   ├── public/                 # Static assets
│   ├── src/
│   │   ├── components/         # Reusable React components
│   │   │   ├── AddTodoForm.tsx
│   │   │   └── TodoItem.tsx
│   │   ├── App.tsx            # Main App component
│   │   ├── main.tsx           # App entry point
│   │   ├── index.css          # Global styles (Tailwind)
│   │   └── vite-env.d.ts      # Vite type definitions
│   ├── index.html             # HTML template
│   ├── package.json           # Client dependencies
│   ├── vite.config.ts         # Vite configuration
│   ├── tsconfig.json          # TypeScript configuration
│   └── eslint.config.js       # ESLint configuration
├── server/                     # Express backend
│   ├── src/
│   │   ├── db/
│   │   │   └── dbConnect.ts   # Database connection
│   │   ├── models/
│   │   │   └── TodoModel.ts   # Mongoose models
│   │   ├── routes/
│   │   │   └── todoRoute.ts   # API routes
│   │   └── server.ts          # Server entry point
│   ├── package.json           # Server dependencies
│   ├── tsconfig.json          # TypeScript configuration
│   └── env-example            # Environment variables template
├── .gitignore                 # Git ignore rules
└── README.md                  # This file
```

## 🛠️ Available Scripts

### Client Scripts (run from `/client` directory)

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Run ESLint
npm start        # Start both client and server concurrently
```

### Server Scripts (run from `/server` directory)

```bash
npm run dev      # Start development server with nodemon
```

## 🗄️ Database Setup

### Option 1: MongoDB Atlas (Recommended for beginners)

1. Go to [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Create a free account
3. Create a new cluster
4. Go to "Database Access" and create a user
5. Go to "Network Access" and add your IP address (or 0.0.0.0/0 for development)
6. Click "Connect" and copy the connection string
7. Replace the placeholder values in your `.env` file

### Option 2: Local MongoDB

1. Install MongoDB Community Edition
2. Start MongoDB service
3. Use this connection string in your `.env`:
   ```
   MONGODB_URI=mongodb://localhost:27017/your-database-name
   ```

## 🔧 API Endpoints

The template includes a complete Todo API with the following endpoints:

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET    | `/todos` | Get all todos |
| POST   | `/todos` | Create a new todo |
| GET    | `/todos/:id` | Get a specific todo |
| PUT    | `/todos/:id` | Update a todo |
| DELETE | `/todos/:id` | Delete a todo |

### Example API Requests

```javascript
// Get all todos
fetch('http://localhost:5000/todos')

// Create a new todo
fetch('http://localhost:5000/todos', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ title: 'Learn MERN Stack' })
})

// Update a todo
fetch('http://localhost:5000/todos/123', {
  method: 'PUT',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ completed: true })
})
```

## 🎨 Customization

### Adding New Routes

1. Create a new route file in `server/src/routes/`
2. Define your routes using Express Router
3. Import and use in `server/src/server.ts`

```typescript
// server/src/routes/userRoute.ts
import { Router } from 'express';
const router = Router();

router.get('/', (req, res) => {
  res.json({ message: 'Users endpoint' });
});

export { router as userRouter };
```

### Adding New Models

Create Mongoose models in `server/src/models/`:

```typescript
// server/src/models/UserModel.ts
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true }
}, { timestamps: true });

export const UserModel = mongoose.model('User', userSchema);
```

### Styling with Tailwind

The template uses Tailwind CSS for styling. You can customize the design by:

1. Editing `client/src/index.css`
2. Using Tailwind classes in your components
3. Adding custom CSS if needed

## 🚢 Deployment

### Frontend Deployment (Vercel/Netlify)

1. Build the client:
   ```bash
   cd client
   npm run build
   ```
2. Deploy the `dist` folder to your hosting platform

### Backend Deployment (Railway/Heroku/DigitalOcean)

1. Set environment variables on your hosting platform
2. Ensure your `package.json` has proper build scripts
3. Deploy your `server` directory

### Environment Variables for Production

```env
MONGODB_URI=your-production-mongodb-uri
PORT=5000
NODE_ENV=production
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit your changes: `git commit -m 'Add feature'`
4. Push to the branch: `git push origin feature-name`
5. Submit a pull request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [React](https://reactjs.org/) - Frontend library
- [Express.js](https://expressjs.com/) - Backend framework
- [MongoDB](https://www.mongodb.com/) - Database
- [Vite](https://vitejs.dev/) - Build tool
- [Tailwind CSS](https://tailwindcss.com/) - CSS framework
- [TypeScript](https://www.typescriptlang.org/) - Type safety

## 📞 Support

If you have any questions or run into issues, please:

1. Check the documentation above
2. Search existing [GitHub issues](https://github.com/mwenaro/gomycode-mern-template-app/issues)
3. Create a new issue if needed

---

**Happy Coding! 🚀**
