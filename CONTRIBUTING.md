# Contributing to MERN Template

Thank you for your interest in contributing to the MERN Template! This document provides guidelines and instructions for contributing.

## 🎯 How Can You Contribute?

### 🐛 Reporting Bugs
- Use the bug report template
- Include detailed steps to reproduce
- Provide environment information
- Include screenshots if applicable

### ✨ Suggesting Features
- Use the feature request template
- Explain the motivation and use case
- Provide mockups or examples if possible

### 💻 Code Contributions
- Fix bugs
- Add new features
- Improve documentation
- Optimize performance
- Add tests

## 🚀 Getting Started

### 1. Fork the Repository
```bash
# Fork the repo on GitHub, then clone your fork
git clone https://github.com/YOUR_USERNAME/gomycode-mern-template-app.git
cd gomycode-mern-template-app
```

### 2. Set Up Development Environment
```bash
# Run the setup script
./setup.sh

# Or manually install dependencies
npm run install:all
```

### 3. Create a Feature Branch
```bash
git checkout -b feature/your-feature-name
# or
git checkout -b bugfix/issue-number
```

### 4. Make Your Changes
- Follow the coding standards
- Add tests for new features
- Update documentation as needed

### 5. Test Your Changes
```bash
# Run the full application
npm start

# Run linting
npm run lint

# Test in both development and production builds
npm run client:build
```

### 6. Commit Your Changes
```bash
git add .
git commit -m "feat: add new feature description"
```

#### Commit Message Format
We follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

**Types:**
- `feat`: A new feature
- `fix`: A bug fix
- `docs`: Documentation only changes
- `style`: Changes that do not affect the meaning of the code
- `refactor`: A code change that neither fixes a bug nor adds a feature
- `perf`: A code change that improves performance
- `test`: Adding missing tests or correcting existing tests
- `chore`: Changes to the build process or auxiliary tools

**Examples:**
```
feat: add user authentication system
fix: resolve todo deletion issue #123
docs: update installation instructions
style: format code with prettier
refactor: simplify database connection logic
perf: optimize todo rendering performance
test: add unit tests for todo service
chore: update dependencies
```

### 7. Push and Create Pull Request
```bash
git push origin feature/your-feature-name
```

Then create a pull request on GitHub using the provided template.

## 📝 Coding Standards

### Backend (Node.js/Express)
- Use TypeScript for type safety
- Follow RESTful API conventions
- Implement proper error handling
- Use async/await for asynchronous operations
- Add JSDoc comments for complex functions

```typescript
/**
 * Creates a new todo item
 * @param {ITodoInput} todoData - The todo data
 * @returns {Promise<ITodo>} The created todo
 */
async function createTodo(todoData: ITodoInput): Promise<ITodo> {
  // Implementation
}
```

### Frontend (React/TypeScript)
- Use functional components with hooks
- Implement proper TypeScript interfaces
- Follow React best practices
- Use Tailwind CSS for styling
- Add prop validation

```typescript
interface ComponentProps {
  title: string;
  onAction: (id: string) => void;
  isLoading?: boolean;
}

export function Component({ title, onAction, isLoading = false }: ComponentProps) {
  // Implementation
}
```

### General Guidelines
- Use meaningful variable and function names
- Keep functions small and focused
- Add comments for complex logic
- Follow DRY (Don't Repeat Yourself) principle
- Handle edge cases and errors gracefully

## 🧪 Testing Guidelines

### Backend Testing
```bash
cd server
npm install --save-dev jest @types/jest supertest
```

Example test:
```typescript
import request from 'supertest';
import app from '../src/server';

describe('GET /todos', () => {
  it('should return all todos', async () => {
    const response = await request(app)
      .get('/todos')
      .expect(200);
    
    expect(response.body.success).toBe(true);
    expect(Array.isArray(response.body.data)).toBe(true);
  });
});
```

### Frontend Testing
```bash
cd client
npm install --save-dev @testing-library/react @testing-library/jest-dom vitest
```

Example test:
```typescript
import { render, screen } from '@testing-library/react';
import { TodoItem } from './TodoItem';

test('renders todo item', () => {
  const mockTodo = {
    _id: '1',
    title: 'Test Todo',
    completed: false
  };
  
  render(<TodoItem todo={mockTodo} />);
  expect(screen.getByText('Test Todo')).toBeInTheDocument();
});
```

## 📚 Documentation Standards

- Update README.md for significant changes
- Add JSDoc comments for functions
- Update API documentation for endpoint changes
- Include code examples in documentation
- Keep documentation up to date with code changes

## 🎨 Design Guidelines

### UI/UX Principles
- **Consistency**: Use consistent patterns and components
- **Accessibility**: Follow WCAG guidelines
- **Responsive**: Ensure mobile-first design
- **Performance**: Optimize for fast loading
- **User-Friendly**: Intuitive and easy to use

### Tailwind CSS Usage
- Use utility classes consistently
- Create reusable component classes when needed
- Follow the design system colors and spacing
- Ensure accessibility with proper contrast ratios

## 🔍 Code Review Process

### For Contributors
- Ensure your PR is ready for review
- Respond to feedback promptly
- Make requested changes in additional commits
- Squash commits if requested

### For Reviewers
- Be constructive and helpful
- Focus on code quality and best practices
- Test the changes locally if possible
- Approve when ready or request changes with clear feedback

## 📋 Project Structure Guidelines

### Adding New Features

#### Backend Endpoints
1. Create model in `server/src/models/`
2. Create routes in `server/src/routes/`
3. Add route to main server file
4. Update API documentation

#### Frontend Components
1. Create component in `client/src/components/`
2. Add TypeScript interfaces
3. Implement with proper props
4. Add to main application

#### Database Changes
1. Update models with new fields
2. Consider migration needs
3. Update seed data if applicable
4. Document schema changes

## 🚀 Release Process

### Version Numbering
We follow [Semantic Versioning](https://semver.org/):
- **MAJOR**: Breaking changes
- **MINOR**: New features (backwards compatible)
- **PATCH**: Bug fixes (backwards compatible)

### Release Checklist
- [ ] All tests pass
- [ ] Documentation updated
- [ ] Version bumped in package.json
- [ ] Changelog updated
- [ ] Docker images built and tested
- [ ] GitHub release created

## 🆘 Getting Help

### Communication Channels
- **GitHub Issues**: For bugs and feature requests
- **GitHub Discussions**: For questions and general discussion
- **Email**: mwenaro@example.com for private inquiries

### Resources
- [Project Documentation](./README.md)
- [Development Guide](./DEVELOPMENT.md)
- [API Documentation](./docs/api.md)
- [Deployment Guide](./docs/deployment.md)

## 📄 License

By contributing to this project, you agree that your contributions will be licensed under the MIT License.

## 🙏 Recognition

Contributors will be recognized in:
- README.md contributors section
- Release notes for significant contributions
- Special thanks in documentation

---

**Thank you for contributing to the MERN Template! 🚀**
