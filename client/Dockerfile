############################
# Stage 1: Build React App
############################
FROM node:current-alpine3.23 AS build

# Set working directory
WORKDIR /app

# Copy only dependency files first (cache optimization)
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy application source code
COPY . .

# Build production-ready static files
RUN npm run build


############################
# Stage 2: Nginx for Production
############################
FROM nginx:latest AS production

# Remove default nginx static assets
RUN rm -rf /usr/share/nginx/html/*

# Copy build output from previous stage
COPY --from=build /app/build /usr/share/nginx/html

# Copy custom nginx config (optional but recommended)
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Use non-root user (security best practice)
USER nginx

# Expose HTTP port
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
