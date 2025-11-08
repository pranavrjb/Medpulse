FROM node:18-slim

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json first
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy rest of the code
COPY . .

# Set environment variable for port
ENV PORT=3001

# Expose port
EXPOSE 3001

# Optional: Create non-root user
RUN adduser --disabled-password --gecos '' appuser
USER appuser

# Run the backend directly
CMD ["node", "server.js"]
