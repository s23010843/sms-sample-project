# SMS Platform - Deployment Guide

## 🚀 Production Deployment

### Frontend Deployment (Static Hosting)

#### Netlify
```bash
cd frontend
pnpm build

# Deploy to Netlify
netlify deploy --prod --dir=dist
```

**netlify.toml:**
```toml
[build]
  command = "pnpm build"
  publish = "dist"

[[redirects]]
  from = "/api/*"
  to = "https://your-backend-api.com/api/:splat"
  status = 200
  force = true
```

#### Vercel
```bash
cd frontend
pnpm build

# Deploy to Vercel
vercel --prod
```

**vercel.json:**
```json
{
  "buildCommand": "pnpm build",
  "outputDirectory": "dist",
  "rewrites": [
    {
      "source": "/api/:path*",
      "destination": "https://your-backend-api.com/api/:path*"
    }
  ]
}
```

#### GitHub Pages
```bash
cd frontend

# Update astro.config.mjs with your site URL
# site: 'https://yourusername.github.io'
# base: '/repository-name'

pnpm build

# Deploy dist folder to gh-pages branch
```

---

### Backend Deployment

#### Docker Deployment

**Build and run:**
```bash
cd backend

# Build image
docker build -t sms-platform-api .

# Run container
docker run -d \
  -p 5000:5000 \
  --name sms-api \
  --env-file .env \
  sms-platform-api
```

**Docker Compose (docker-compose.yml):**
```yaml
version: '3.8'

services:
  api:
    build: ./backend
    ports:
      - "5000:5000"
    environment:
      - FLASK_ENV=production
      - SECRET_KEY=${SECRET_KEY}
    restart: always
    
  frontend:
    build: ./frontend
    ports:
      - "80:80"
    depends_on:
      - api
    restart: always
```

Run with:
```bash
docker-compose up -d
```

#### Heroku Deployment

**Requirements:**
- Create `Procfile` in backend:
```
web: gunicorn app:app
```

**Deploy:**
```bash
cd backend

# Login to Heroku
heroku login

# Create app
heroku create sms-platform-api

# Set environment variables
heroku config:set SECRET_KEY=your-secret-key
heroku config:set FLASK_ENV=production

# Deploy
git push heroku main
```

#### AWS EC2 Deployment

**Setup:**
```bash
# SSH into EC2 instance
ssh -i your-key.pem ubuntu@your-ec2-ip

# Install dependencies
sudo apt update
sudo apt install python3-pip nginx

# Clone repository
git clone your-repo-url
cd sms-sample-project/backend

# Install Python packages
pip3 install -r requirements.txt

# Run with Gunicorn
gunicorn --bind 0.0.0.0:5000 --workers 4 app:app
```

**Nginx Configuration (/etc/nginx/sites-available/sms-api):**
```nginx
server {
    listen 80;
    server_name your-domain.com;

    location / {
        proxy_pass http://127.0.0.1:5000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```

#### Digital Ocean App Platform

**app.yaml:**
```yaml
name: sms-platform

services:
  - name: api
    github:
      repo: your-username/sms-sample-project
      branch: main
      deploy_on_push: true
    source_dir: /backend
    run_command: gunicorn --bind 0.0.0.0:5000 app:app
    envs:
      - key: FLASK_ENV
        value: production
      - key: SECRET_KEY
        value: ${SECRET_KEY}
    
  - name: frontend
    github:
      repo: your-username/sms-sample-project
      branch: main
    source_dir: /frontend
    build_command: pnpm install && pnpm build
    output_dir: dist
```

---

## 🔒 Security Checklist

- [ ] Change default SECRET_KEY
- [ ] Enable HTTPS/SSL
- [ ] Set up rate limiting
- [ ] Configure CORS properly
- [ ] Use environment variables for sensitive data
- [ ] Enable firewall on server
- [ ] Set up database authentication (if using database)
- [ ] Implement API authentication/authorization
- [ ] Regular security updates

---

## 📊 Monitoring & Logging

### Application Monitoring

**Install Sentry for error tracking:**
```bash
pip install sentry-sdk[flask]
```

**In app.py:**
```python
import sentry_sdk
from sentry_sdk.integrations.flask import FlaskIntegration

sentry_sdk.init(
    dsn="your-sentry-dsn",
    integrations=[FlaskIntegration()]
)
```

### Logging Configuration

**Add to app.py:**
```python
import logging

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
    handlers=[
        logging.FileHandler('sms_platform.log'),
        logging.StreamHandler()
    ]
)
```

---

## 🧪 Pre-Deployment Testing

```bash
# Backend tests
cd backend
pytest test_app.py -v

# Frontend build test
cd frontend
pnpm build
pnpm preview

# Load testing (optional)
pip install locust
locust -f locustfile.py
```

---

## 🔄 CI/CD Pipeline

**GitHub Actions (.github/workflows/deploy.yml):**
```yaml
name: Deploy

on:
  push:
    branches: [ main ]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      
      - name: Test Backend
        run: |
          cd backend
          pip install -r requirements.txt
          pytest

  deploy:
    needs: test
    runs-on: ubuntu-latest
    steps:
      - name: Deploy to Production
        run: |
          # Your deployment commands here
```

---

## 📱 Production Environment Variables

**Backend (.env.production):**
```env
FLASK_ENV=production
SECRET_KEY=<strong-secret-key>
HOST=0.0.0.0
PORT=5000
CORS_ORIGINS=https://yourdomain.com
DATABASE_URL=<production-db-url>
```

**Frontend (.env.production):**
```env
VITE_API_URL=https://api.yourdomain.com
VITE_APP_NAME=SMS Platform
```

---

## 🔧 Performance Optimization

### Backend
- Use Redis for caching
- Enable gzip compression
- Implement database connection pooling
- Use CDN for static assets

### Frontend
- Enable Astro's static site generation
- Optimize images
- Minimize JavaScript bundles
- Use lazy loading for components

---

## 📞 Post-Deployment

1. Test all API endpoints
2. Verify frontend loads correctly
3. Check SSL certificate
4. Monitor error logs
5. Set up automated backups
6. Configure domain DNS

---

**Successfully deployed? Don't forget to:**
- Document your API endpoints
- Set up monitoring alerts
- Create backup strategy
- Plan for scaling
