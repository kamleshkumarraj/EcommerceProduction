# ---------- Build Stage ----------
FROM node:current-alpine3.23  AS builder

WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build


# ---------- Runtime Stage ----------
FROM nginx:latest

# Remove default site
RUN rm -rf /usr/share/nginx/html/*

# Copy build
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy nginx configs
COPY nginx.conf /etc/nginx/nginx.conf
COPY default.conf /etc/nginx/conf.d/default.conf

# Fix permissions
RUN chown -R nginx:nginx /usr/share/nginx/html \
    && chown -R nginx:nginx /var/log/nginx \
    && chown -R nginx:nginx /var/cache/nginx

USER nginx

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]