# Cloud Resume Project
https://cloud-resume-taquan.azureedge.net/

A cloud-based digital resume built with modern web technologies and cloud services, following the Cloud Resume Challenge principles. This project demonstrates proficiency in full-stack development, cloud services, and DevOps practices.

## Features

- Interactive web-based resume with modern UI components
- Real-time visitor counter using Azure Functions
- Responsive design optimized for all devices
- Cloud-hosted with high availability
- Automated CI/CD pipeline
- Custom domain with HTTPS
- JSON-based resume data structure
- Dynamic content updates without deployment
- Performance optimization with lazy loading
- SEO optimization

## Tech Stack

### Frontend
- React.js 18 for component-based UI development
- Vite for fast development and optimized builds
- Tailwind CSS for responsive and utility-first styling
- JavaScript ES6+ features
- Custom hooks for data fetching
- React Router for navigation
- State management with React Context
- Responsive images and lazy loading
- Error boundary implementation

### Backend
- Python 3.9+ for Azure Functions
- Azure Functions HTTP triggers
- Azure CosmosDB for visitor counter storage
- RESTful API design
- Error handling and logging
- Rate limiting implementation
- CORS configuration
- Input validation and sanitization

### Infrastructure
- Azure Cloud Services
  - Static Web Apps for hosting
  - Functions for serverless backend
  - CosmosDB for database
  - Application Insights for monitoring
- Infrastructure as Code using Azure ARM templates
- GitHub Actions for CI/CD
- Custom domain configuration
- SSL/TLS certification
- Resource tagging and organization

## Project Architecture

The project implements a modern serverless architecture:

1. Frontend (Static Web App):
   - React SPA hosted on Azure Static Web Apps
   - Optimized asset delivery through CDN
   - Route configuration for SPA navigation

2. Backend (Azure Functions):
   - HTTP-triggered functions for API endpoints
   - Visitor counter implementation
   - Database operations for analytics
   - Authentication and authorization

3. Database (CosmosDB):
   - NoSQL document storage
   - Optimized queries for counter updates
   - Data partitioning strategy

4. DevOps Pipeline:
   - Automated testing before deployment
   - Staging environments
   - Production deployment gates
   - Rollback procedures

## Local Development Setup

1. Clone the repository:
```bash
git clone [repository-url]
cd cloud-resume
```

2. Frontend setup:
```bash
cd frontend
npm install
# Install development dependencies
npm install -D @types/react @types/node
```

3. Configure environment variables:
```bash
cp .env.example .env.local
# Edit .env.local with your configuration
```

4. Start development server:
```bash
npm run dev
# Access at http://localhost:5173
```

5. Backend setup:
```bash
cd backend
# Create virtual environment
python -m venv venv
source venv/bin/activate  # Unix
.\venv\Scripts\activate   # Windows

# Install dependencies
pip install -r requirements.txt
```

6. Azure Functions local development:
```bash
npm install -g azure-functions-core-tools@4
func start
```

## Deployment

The project uses a comprehensive CI/CD pipeline:

1. Frontend Deployment:
   - Automated builds on push to main
   - Asset optimization and bundling
   - Environment variable injection
   - Deploy to Azure Static Web Apps

2. Backend Deployment:
   - Python package compilation
   - Function app deployment
   - Environment configuration
   - Integration tests

3. Infrastructure Updates:
   - ARM template validation
   - Resource deployment
   - Configuration updates
   - Security policy enforcement

## Environment Variables

Frontend (.env):
```plaintext
VITE_API_URL=your_azure_function_url
VITE_ENVIRONMENT=development
VITE_APP_INSIGHTS_KEY=your_insights_key
```

Backend (local.settings.json):
```json
{
  "IsEncrypted": false,
  "Values": {
    "AzureWebJobsStorage": "UseDevelopmentStorage=true",
    "FUNCTIONS_WORKER_RUNTIME": "python",
    "CosmosDBConnectionString": "your_connection_string"
  }
}
```

## Contributing

1. Fork the repository
2. Create a feature branch:
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. Commit changes following conventional commits:
   ```bash
   git commit -m "feat: add new feature"
   ```
4. Push to the branch
5. Open a Pull Request with:
   - Description of changes
   - Screenshots (if UI changes)
   - Test coverage report
   - Performance impact analysis

## Testing

1. Frontend Tests:
```bash
npm run test        # Unit tests
npm run test:e2e    # E2E tests
npm run coverage    # Coverage report
```

2. Backend Tests:
```bash
pytest
pytest --cov=api
```

## Performance Optimization

- Image optimization with WebP format
- Code splitting and lazy loading
- Asset minification
- CDN caching
- Database query optimization
- API response caching

## License

MIT License - See LICENSE file for details


