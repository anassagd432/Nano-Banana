# Contributing to Nano Banana 🍌

First off, thanks for taking the time to contribute! 🎉

## How Can I Contribute?

### 🐛 Reporting Bugs

Before creating bug reports, please check the existing issues to avoid duplicates. When creating a bug report, include as many details as possible:

- **Use a clear and descriptive title**
- **Describe the exact steps to reproduce the problem**
- **Provide specific examples** (code snippets, screenshots, etc.)
- **Describe the behavior you observed and what you expected**
- **Include your environment details** (browser, OS, Node version)

### 💡 Suggesting Features

Feature suggestions are welcome! Please:

- **Use a clear and descriptive title**
- **Provide a detailed description of the proposed feature**
- **Explain why this feature would be useful**
- **Include mockups or examples if applicable**

### 🔧 Pull Requests

1. **Fork the repository** and create your branch from `main`
2. **Install dependencies**: `npm install`
3. **Make your changes** and ensure the code follows the existing style
4. **Test your changes**: `npm run build` and `npm run lint`
5. **Commit your changes** with a descriptive commit message
6. **Push to your fork** and submit a pull request

## Development Setup

```bash
# Clone your fork
git clone https://github.com/YOUR_USERNAME/Nano-Banana.git
cd Nano-Banana

# Install dependencies
npm install

# Copy environment variables
cp .env.example .env
# Add your GEMINI_API_KEY to .env

# Start development server
npm run dev

# For full-stack development with API
npm run dev:full
```

## Code Style

- Use TypeScript for all new code
- Follow the existing code formatting (Prettier/ESLint)
- Use meaningful variable and function names
- Add comments for complex logic
- Keep components small and focused

## Commit Messages

Use clear, concise commit messages:

- `feat: add new theme option`
- `fix: resolve image upload error`
- `docs: update README installation steps`
- `refactor: simplify API response handling`

## Questions?

Feel free to open an issue with your question or reach out to the maintainer.

---

Thank you for contributing! 🚀
