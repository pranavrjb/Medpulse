FROM node:18-slim
WORKDIR /app
COPY package*.json ./
RUN npm ci
# Copy the rest of the application code
COPY . .
# Build the application
ENV PORT=5000
EXPOSE 5000
# Optional: Create non-root user
RUN adduser --disabled-password --gecos '' appuser
USER appuser
# Start the server
CMD ["node", "server.js"]
