FROM node:18-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy full code
COPY . .

# Expose Vite default port
EXPOSE 5173

# Important: allow external access
ENV HOST=0.0.0.0

# Run dev server
CMD ["npm", "run", "dev"]