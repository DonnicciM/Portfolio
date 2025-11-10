# Use official Node.js runtime as base image
FROM node:18-slim

# Set working directory in container
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install production dependencies only
RUN npm ci --omit=dev

# Copy application files
COPY . .

# Expose port (Cloud Run will override this with PORT env variable)
EXPOSE 8080

# Start the application
CMD ["node", "server.js"]
