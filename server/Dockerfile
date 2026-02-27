# ---------- Build Stage ----------
FROM node:current-alpine3.23 AS builder

WORKDIR /app

# Copy package files first
COPY package*.json ./

# Install production dependencies
RUN npm ci --only=production

# Copy source code INCLUDING .env file
COPY . .

# ---------- Runtime Stage ----------
FROM node:current-alpine3.23

# Create non-root user
RUN addgroup -S nodegroup && adduser -S nodeuser -G nodegroup

WORKDIR /app

# Copy built app from builder
COPY --from=builder /app /app

# Fix permissions
RUN chown -R nodeuser:nodegroup /app

USER nodeuser

EXPOSE 4000

# Server is inside src
CMD ["node", "src/index.js"]