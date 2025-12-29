# 📱 SMS Platform - Complete Multi-Framework Messaging Solution

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![Astro](https://img.shields.io/badge/Astro-5.0-blueviolet)](https://astro.build)
[![Flask](https://img.shields.io/badge/Flask-3.0-blue)](https://flask.palletsprojects.com/)

A modern, full-stack SMS management platform demonstrating the power of multi-framework integration with Astro, featuring Vue, React, Angular, and Svelte components working seamlessly together.

## ✨ Features

- **📤 Quick Send SMS** - Instant message sending with Vue 3
- **👥 Contact Management** - Organize contacts with React 19
- **📊 Analytics Dashboard** - Track metrics with Angular 20
- **📅 Message Scheduling** - Schedule messages with Svelte 5
- **🎨 Modern UI** - Beautiful interface with Tailwind CSS 4
- **🔌 REST API** - Complete Flask backend with 8+ endpoints
- **📱 Responsive Design** - Works perfectly on all devices
- **🚀 Performance** - Optimized builds with Astro islands

## 🛠️ Tech Stack

### Frontend
- **Astro 5** - Meta-framework for optimal performance
- **Vue 3** - Quick Send component with Composition API
- **React 19** - Contact Management with hooks
- **Angular 20** - Analytics Dashboard with TypeScript
- **Svelte 5** - Message Scheduler with reactivity
- **Tailwind CSS 4** - Utility-first styling
- **TypeScript** - Type-safe development

### Backend
- **Flask 3** - Python web framework
- **Flask-CORS** - Cross-origin resource sharing
- **Gunicorn** - Production WSGI server
- **Python 3.11+** - Modern Python features

## 📁 Project Structure

```
sms-sample-project/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── angular/      # Analytics Dashboard
│   │   │   ├── astro/        # Feature cards
│   │   │   ├── react/        # Contact Management
│   │   │   ├── svelte/       # Message Scheduler
│   │   │   └── vue/          # Quick Send SMS
│   │   ├── layouts/          # Page layouts
│   │   ├── pages/            # Routes
│   │   └── styles/           # Global CSS
│   ├── docs/                 # Documentation
│   ├── package.json
│   └── astro.config.mjs
│
└── backend/
    ├── app.py               # Flask application
    ├── models.py            # Data models
    ├── utils.py             # Utility functions
    ├── config.py            # Configuration
    ├── test_app.py          # API tests
    ├── requirements.txt     # Dependencies
    └── DockerFile          # Docker config
```

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and pnpm
- Python 3.11+
- Git

### Installation

**1. Clone the repository:**
```bash
git clone https://github.com/yourusername/sms-sample-project.git
cd sms-sample-project
```

**2. Setup Frontend:**
```bash
cd frontend
pnpm install
cp .env.example .env
pnpm dev
```
Frontend runs at: `http://localhost:4321`

**3. Setup Backend:**
```bash
cd backend
python -m venv venv

# Windows
venv\Scripts\activate
# macOS/Linux
source venv/bin/activate

pip install -r requirements.txt
cp .env.example .env
python app.py
```
Backend runs at: `http://localhost:5000`

## 📖 Documentation

- **[Setup Guide](SETUP_GUIDE.md)** - Detailed installation instructions
- **[API Documentation](backend/API_DOCS.md)** - Complete API reference
- **[Deployment Guide](DEPLOYMENT.md)** - Production deployment steps
- **[Frontend Docs](frontend/docs/)** - Framework-specific guides
  - [Astro Setup](frontend/docs/SMS_ASTRO.md)
  - [Angular Integration](frontend/docs/SMS_ANGULAR.md)
  - [API Integration](frontend/docs/API_INTEGRATION.md)

## 🎯 Component Features

### Vue - Quick Send SMS
- Real-time character counter
- Phone number validation
- Instant feedback messages
- Clean, reactive interface

### React - Contact Management
- Searchable contact list
- Message history tracking
- Quick actions
- Responsive grid layout

### Angular - Analytics Dashboard
- Real-time statistics
- Delivery rate tracking
- Activity feed
- API rate limit display

### Svelte - Message Scheduling
- Date/time picker
- Scheduled message management
- Cancel functionality
- Store-based state management

## 🔌 API Endpoints

```
POST   /api/sms/send          # Send SMS
GET    /api/sms/messages      # Get all messages
POST   /api/sms/schedule      # Schedule message
GET    /api/sms/scheduled     # Get scheduled messages
GET    /api/contacts          # Get contacts
POST   /api/contacts/add      # Add contact
GET    /api/analytics         # Get analytics
```

Full API documentation: [API_DOCS.md](backend/API_DOCS.md)

## 🧪 Testing

**Backend Tests:**
```bash
cd backend
pip install -r requirements-dev.txt
pytest test_app.py -v
```

**Frontend Build Test:**
```bash
cd frontend
pnpm build
pnpm preview
```

## 🐳 Docker Deployment

```bash
# Build backend image
cd backend
docker build -t sms-api .

# Run container
docker run -d -p 5000:5000 --env-file .env sms-api
```

## 📦 Production Build

**Frontend:**
```bash
cd frontend
pnpm build
# Deploy the 'dist' folder
```

**Backend:**
```bash
cd backend
gunicorn --bind 0.0.0.0:5000 --workers 4 app:app
```

## 🔐 Environment Variables

**Frontend (.env):**
```env
VITE_API_URL=http://localhost:5000
VITE_APP_NAME=SMS Platform
```

**Backend (.env):**
```env
FLASK_ENV=development
SECRET_KEY=your-secret-key
PORT=5000
RATE_LIMIT_PER_DAY=10000
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](frontend/LICENSE) file for details.

## 🌟 Features Roadmap

- [ ] User authentication
- [ ] Database integration (PostgreSQL)
- [ ] Real-time updates with WebSockets
- [ ] SMS provider integration (Twilio)
- [ ] Bulk SMS sending
- [ ] Template management
- [ ] Advanced analytics
- [ ] Export/Import contacts
- [ ] API rate limiting
- [ ] Multi-language support

## 💡 Learn More

- **Astro**: [docs.astro.build](https://docs.astro.build)
- **Vue 3**: [vuejs.org](https://vuejs.org)
- **React 19**: [react.dev](https://react.dev)
- **Angular 20**: [angular.dev](https://angular.dev)
- **Svelte 5**: [svelte.dev](https://svelte.dev)
- **Flask**: [flask.palletsprojects.com](https://flask.palletsprojects.com)

## 🐛 Troubleshooting

**Port already in use:**
- Change ports in `astro.config.mjs` (frontend) or `.env` (backend)

**CORS errors:**
- Verify backend CORS configuration in `app.py`
- Check `CORS_ORIGINS` in backend `.env`

**Build errors:**
- Clear node_modules: `rm -rf node_modules && pnpm install`
- Clear pnpm cache: `pnpm store prune`

## 📞 Support

- Open an issue for bugs or feature requests
- Check documentation in `/docs` folder
- Review API docs for backend integration

---

**Built with ❤️ by the development team**

**Star ⭐ this repository if you find it helpful!**
