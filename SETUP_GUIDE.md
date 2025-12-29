# SMS Platform - Complete Setup Guide

## 🚀 Project Overview

A modern, full-stack SMS management platform featuring:
- Multiple frontend frameworks (Vue, React, Angular, Svelte) integrated via Astro
- Flask REST API backend
- Real-time message sending and scheduling
- Contact management
- Analytics dashboard
- Responsive design with Tailwind CSS

---

## 📋 Prerequisites

- **Node.js** 18+ and pnpm
- **Python** 3.11+
- **Git**
- **Docker** (optional, for containerized deployment)

---

## 🛠️ Installation

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
pnpm install
```

3. Create environment file:
```bash
cp .env.example .env
```

4. Start development server:
```bash
pnpm run dev
```

The frontend will be available at `http://localhost:4321`

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Create a virtual environment:
```bash
python -m venv venv
```

3. Activate the virtual environment:
- **Windows**: `venv\Scripts\activate`
- **macOS/Linux**: `source venv/bin/activate`

4. Install dependencies:
```bash
pip install -r requirements.txt
```

5. Create environment file:
```bash
cp .env.example .env
```

6. Start the server:
```bash
python app.py
```

The API will be available at `http://localhost:5000`

---

## 🏗️ Project Structure

```
sms-sample-project/
├── frontend/
│   ├── src/
│   │   ├── components/      # Framework-specific components
│   │   │   ├── angular/     # Angular components
│   │   │   ├── astro/       # Astro components
│   │   │   ├── react/       # React components
│   │   │   ├── svelte/      # Svelte components
│   │   │   └── vue/         # Vue components
│   │   ├── layouts/         # Page layouts
│   │   ├── pages/           # Route pages
│   │   └── styles/          # Global styles
│   ├── docs/                # Documentation
│   └── scripts/             # Build scripts
└── backend/
    ├── app.py              # Flask application
    ├── requirements.txt    # Python dependencies
    ├── DockerFile          # Docker configuration
    └── API_DOCS.md         # API documentation
```

---

## 🎯 Features by Framework

### Vue Component - Quick Send SMS
- Real-time message composition
- Character counter
- Phone number validation
- Instant feedback

### React Component - Contact Management
- Contact list with search
- Message history tracking
- Quick send functionality
- Responsive grid layout

### Angular Component - Analytics Dashboard
- Real-time statistics
- Message delivery rates
- Activity feed
- Styled with Angular Material patterns

### Svelte Component - Message Scheduling
- Schedule messages for future delivery
- Date and time picker
- Manage scheduled messages
- Cancel scheduled messages

---

## 🔌 API Endpoints

See [backend/API_DOCS.md](backend/API_DOCS.md) for complete API documentation.

### Quick Reference:
- `POST /api/sms/send` - Send SMS
- `GET /api/sms/messages` - Get all messages
- `GET /api/contacts` - Get contacts
- `POST /api/contacts/add` - Add contact
- `POST /api/sms/schedule` - Schedule message
- `GET /api/analytics` - Get analytics

---

## 🐳 Docker Deployment

Build and run the backend with Docker:

```bash
cd backend
docker build -t sms-platform-api .
docker run -p 5000:5000 sms-platform-api
```

---

## 🧪 Development Workflow

### Frontend Development
```bash
cd frontend
pnpm run dev          # Start dev server
pnpm run build        # Build for production
pnpm run preview      # Preview production build
```

### Backend Development
```bash
cd backend
python app.py         # Run development server
```

---

## 🎨 Tech Stack

### Frontend
- **Astro** - Meta-framework
- **Vue 3** - Quick Send component
- **React 19** - Contact Management
- **Angular 20** - Analytics Dashboard
- **Svelte 5** - Message Scheduling
- **Tailwind CSS** - Styling
- **TypeScript** - Type safety

### Backend
- **Flask** - Python web framework
- **Flask-CORS** - Cross-origin support
- **Gunicorn** - Production WSGI server

---

## 📝 Configuration

### Frontend Environment Variables
Create `.env` in the frontend directory:
```env
VITE_API_URL=http://localhost:5000
VITE_APP_NAME=SMS Platform
```

### Backend Environment Variables
Create `.env` in the backend directory:
```env
FLASK_ENV=development
SECRET_KEY=your-secret-key
PORT=5000
```

---

## 🚀 Production Deployment

### Frontend (Static Export)
```bash
cd frontend
pnpm run build
# Deploy the 'dist' folder to your hosting service
```

### Backend (Docker)
```bash
cd backend
docker build -t sms-api .
docker run -d -p 5000:5000 --env-file .env sms-api
```

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

---

## 📄 License

See [LICENSE](frontend/LICENSE) file for details.

---

## 🐛 Troubleshooting

### Port Already in Use
- Frontend: Change port in `astro.config.mjs`
- Backend: Change port in `.env` or `app.py`

### CORS Errors
- Ensure backend has flask-cors installed
- Check CORS_ORIGINS in backend `.env`

### Build Errors
- Clear cache: `pnpm store prune`
- Reinstall: `rm -rf node_modules && pnpm install`

---

## 📞 Support

For issues and questions:
- Check documentation in `/docs` folder
- Review API documentation in `backend/API_DOCS.md`
- Open an issue on GitHub

---

**Built with ❤️ using modern web technologies**
