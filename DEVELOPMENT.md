# Development Guide

This guide will help you understand the structure and development workflow of this MERN template.

## 📁 Project Structure Deep Dive

### Root Level
```
gomycode-mern-template-app/
├── client/          # React frontend application
├── server/          # Express backend application
├── package.json     # Root package.json for managing the monorepo
├── setup.sh         # Setup script for quick installation
├── README.md        # Main documentation
├── LICENSE          # MIT License
└── .gitignore       # Git ignore rules
```

### Server Structure
```
server/
├── src/
│   ├── db/
│   │   └── dbConnect.ts     # Database connection logic
│   ├── models/
│   │   └── TodoModel.ts     # Mongoose schemas and models
│   ├── routes/
│   │   └── todoRoute.ts     # API route handlers
│   └── server.ts            # Express app configuration
├── dist/                    # Compiled TypeScript output
├── package.json             # Server dependencies
├── tsconfig.json            # TypeScript configuration
├── .env                     # Environment variables (created from env-example)
└── env-example              # Environment template
```

### Client Structure
```
client/
├── src/
│   ├── components/          # React components
│   │   ├── AddTodoForm.tsx  # Form for adding/editing todos
│   │   └── TodoItem.tsx     # Individual todo item component
│   ├── hooks/
│   │   └── useApi.ts        # Custom hook for API calls
│   ├── config/
│   │   └── api.ts           # API configuration and utilities
│   ├── App.tsx              # Main App component
│   ├── main.tsx             # App entry point
│   ├── index.css            # Global styles (Tailwind)
│   └── vite-env.d.ts        # Vite type definitions
├── public/                  # Static assets
├── dist/                    # Built application
├── package.json             # Client dependencies
├── vite.config.ts           # Vite configuration
├── tsconfig.json            # TypeScript configuration
├── eslint.config.js         # ESLint configuration
├── .env                     # Environment variables (created from .env.example)
└── .env.example             # Environment template
```

## 🛠️ Development Workflow

### 1. Initial Setup
```bash
# Clone the repository
git clone <your-repo-url>
cd gomycode-mern-template-app

# Run the setup script
./setup.sh

# Or manually install dependencies
npm run install:all
```

### 2. Environment Configuration

**Server Environment (server/.env):**
```env
MONGODB_URI=mongodb://localhost:27017/mern-template-db
PORT=5000
NODE_ENV=development
JWT_SECRET=your-super-secret-jwt-key
CLIENT_URL=http://localhost:5173
```

**Client Environment (client/.env):**
```env
VITE_API_URL=http://localhost:5000
VITE_APP_NAME=MERN Todo App
VITE_APP_VERSION=1.0.0
VITE_DEV_MODE=true
```

### 3. Development Commands

```bash
# Start both client and server
npm start

# Start only server
npm run server:dev

# Start only client
npm run client:dev

# Build client for production
npm run client:build

# Run linting
npm run lint
```

## 🏗️ Architecture Patterns

### Backend Architecture

1. **MVC Pattern**: Models, Views (JSON responses), Controllers (routes)
2. **Middleware Pattern**: CORS, body parsing, error handling
3. **Repository Pattern**: Database operations abstracted in models
4. **Environment Configuration**: Centralized config management

### Frontend Architecture

1. **Component-Based Architecture**: Reusable React components
2. **Custom Hooks**: Business logic separation (`useApi`)
3. **Configuration Management**: Centralized API config
4. **Type Safety**: TypeScript interfaces for data models

## 🔄 API Design

### RESTful Endpoints

```
GET    /todos         # Get all todos
POST   /todos         # Create a new todo
GET    /todos/:id     # Get a specific todo
PUT    /todos/:id     # Update a todo
DELETE /todos/:id     # Delete a todo
```

### Response Format

All API responses follow this structure:
```typescript
{
  success: boolean;
  data?: any;          // Present on successful requests
  error?: string;      // Present on failed requests
  message?: string;    // Optional additional information
}
```

### Error Handling

- **400 Bad Request**: Invalid input data
- **404 Not Found**: Resource not found
- **500 Internal Server Error**: Server-side errors

## 🎨 Styling Guide

### Tailwind CSS Classes

The project uses Tailwind CSS with a design system approach:

**Colors:**
- Primary: `blue-600`, `blue-700`
- Success: `green-500`, `green-600`
- Warning: `orange-500`, `orange-600`
- Error: `red-500`, `red-600`
- Gray scale: `gray-50` to `gray-900`

**Layout:**
- Container: `container mx-auto px-4`
- Cards: `bg-white rounded-lg shadow-sm p-6`
- Buttons: `px-4 py-2 rounded-md font-medium`

## 🧪 Testing Strategy

### Backend Testing
```bash
# Add test dependencies
cd server
npm install --save-dev jest @types/jest supertest

# Create test files
mkdir __tests__
```

### Frontend Testing
```bash
# Add test dependencies
cd client
npm install --save-dev @testing-library/react @testing-library/jest-dom vitest
```

## 📦 Adding New Features

### Adding a New Backend Route

1. Create the route file:
```typescript
// server/src/routes/userRoute.ts
import { Router, Request, Response } from 'express';

const router = Router();

router.get('/', async (req: Request, res: Response) => {
  try {
    // Your logic here
    res.json({ success: true, data: [] });
  } catch (error: any) {
    res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
});

export { router as userRouter };
```

2. Add to main server:
```typescript
// server/src/server.ts
import { userRouter } from './routes/userRoute';
app.use('/users', userRouter);
```

### Adding a New Frontend Component

1. Create the component:
```typescript
// client/src/components/UserList.tsx
import { useState, useEffect } from 'react';
import { useApi } from '../hooks/useApi';

export function UserList() {
  const [users, setUsers] = useState([]);
  const { get } = useApi();

  useEffect(() => {
    get('/users', {
      onSuccess: setUsers,
      onError: (error) => console.error(error)
    });
  }, [get]);

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      {/* Component content */}
    </div>
  );
}
```

2. Use in App:
```typescript
// client/src/App.tsx
import { UserList } from './components/UserList';
```

## 🚀 Production Deployment

### Environment Variables for Production

**Server:**
```env
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/db
PORT=5000
NODE_ENV=production
JWT_SECRET=secure-production-secret
CLIENT_URL=https://yourdomain.com
```

**Client:**
```env
VITE_API_URL=https://api.yourdomain.com
VITE_APP_NAME=Your App Name
VITE_DEV_MODE=false
```

### Build Commands

```bash
# Build server
cd server && npm run build

# Build client
cd client && npm run build
```

## 🔧 Troubleshooting

### Common Issues

1. **Port already in use:**
   ```bash
   # Kill process on port 5000
   lsof -ti:5000 | xargs kill -9
   ```

2. **MongoDB connection issues:**
   - Check MongoDB is running
   - Verify connection string
   - Check network access (Atlas)

3. **CORS errors:**
   - Verify CLIENT_URL in server/.env
   - Check CORS configuration in server.ts

4. **TypeScript errors:**
   ```bash
   # Clear TypeScript cache
   rm -rf node_modules/.cache
   npm install
   ```

### Debug Mode

Enable debug logging by setting:
```env
NODE_ENV=development
DEBUG=true
```

## 📚 Additional Resources

- [React Documentation](https://reactjs.org/docs)
- [Express.js Guide](https://expressjs.com/en/guide)
- [MongoDB Manual](https://docs.mongodb.com/manual/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Vite Guide](https://vitejs.dev/guide/)

---

**Happy Coding! 🚀**
