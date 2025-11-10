# Donnicci Marshall Portfolio - Web Application

A dynamic portfolio web application built with Node.js and Express, containerized with Docker and ready for deployment to Google Cloud Run.

## Features

- **Dynamic Contact Form**: Backend API endpoint that processes contact form submissions
- **Visitor Counter**: API endpoint tracking visitor count
- **Responsive Design**: Mobile-friendly interface with animated navigation
- **Containerized**: Docker support for consistent deployment
- **Cloud-Ready**: Optimized for Google Cloud Run deployment

## Tech Stack

- **Backend**: Node.js, Express.js
- **Frontend**: HTML5, CSS3, Vanilla JavaScript
- **Container**: Docker
- **Deployment**: Google Cloud Run

## Local Development

### Prerequisites
- Node.js 18+ installed
- Docker installed (optional, for container testing)

### Run Locally

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open your browser to `http://localhost:8080`

## Docker

### Build the Docker image:
```bash
docker build -t donnicci-portfolio .
```

### Run the container locally:
```bash
docker run -p 8080:8080 donnicci-portfolio
```

## Deploy to Google Cloud Run

### Prerequisites
- Google Cloud account
- gcloud CLI installed and configured
- Project ID ready

### Deployment Steps

1. **Set your project ID**:
```bash
export PROJECT_ID=your-project-id
gcloud config set project $PROJECT_ID
```

2. **Enable required APIs**:
```bash
gcloud services enable cloudbuild.googleapis.com run.googleapis.com
```

3. **Build and deploy in one command**:
```bash
gcloud run deploy donnicci-portfolio \
  --source . \
  --platform managed \
  --region us-central1 \
  --allow-unauthenticated \
  --memory 512Mi \
  --cpu 1
```

Or build with Cloud Build first, then deploy:

4. **Build the container image with Cloud Build**:
```bash
gcloud builds submit --tag gcr.io/$PROJECT_ID/donnicci-portfolio
```

5. **Deploy to Cloud Run**:
```bash
gcloud run deploy donnicci-portfolio \
  --image gcr.io/$PROJECT_ID/donnicci-portfolio \
  --platform managed \
  --region us-central1 \
  --allow-unauthenticated \
  --port 8080
```

6. **Get your service URL**:
```bash
gcloud run services describe donnicci-portfolio \
  --platform managed \
  --region us-central1 \
  --format 'value(status.url)'
```

### Environment Configuration

Cloud Run automatically sets the `PORT` environment variable. The application is configured to use this.

To add custom environment variables:
```bash
gcloud run deploy donnicci-portfolio \
  --set-env-vars "NODE_ENV=production,OTHER_VAR=value"
```

## API Endpoints

- `GET /` - Serves the portfolio homepage
- `POST /api/contact` - Contact form submission endpoint
  - Body: `{ name, email, message }`
  - Returns: `{ success: boolean, message: string }`
- `GET /api/visitor-count` - Returns visitor count
- `GET /health` - Health check endpoint for monitoring

## Project Structure

```
Portfolio/
├── server.js           # Express server with API endpoints
├── index.html          # Main HTML page
├── style.css           # Styles
├── script.js           # Client-side JavaScript
├── images/             # Images directory
├── package.json        # Node.js dependencies
├── Dockerfile          # Container configuration
├── .dockerignore       # Docker build exclusions
└── README.md           # This file
```

## Monitoring

Check logs in Cloud Run:
```bash
gcloud run logs read donnicci-portfolio \
  --platform managed \
  --region us-central1
```

## Security Features

- Non-root user in container
- Health check endpoint
- Input validation on API endpoints
- Production-only dependencies in container

## Future Enhancements

- Add database integration for contact form submissions
- Implement email notifications
- Add authentication for admin panel
- Integrate with Google Analytics
- Add more dynamic features (blog, projects showcase)

## Contact

Donnicci Marshall
- Email: marsh156@purdue.edu
- LinkedIn: [linkedin.com/in/donnicci](https://www.linkedin.com/in/donnicci)
- Phone: 219-413-6939

## License

ISC
