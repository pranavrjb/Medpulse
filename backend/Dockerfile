FROM node:18-slim
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
ENV PORT=5000
EXPOSE 5000
RUN adduser --disabled-password --gecos '' appuser
USER appuser
CMD ["node", "server.js"]
