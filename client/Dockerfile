# -------- Stage 1: Build --------
FROM node:18-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# Inject env at build time
ARG VITE_API_URL
ENV VITE_API_URL=$VITE_API_URL

RUN npm run build


# -------- Stage 2: Serve --------
FROM node:18-alpine

WORKDIR /app

# Install static server
RUN npm install -g serve

# Copy build files
COPY --from=builder /app/dist ./dist

# Expose port
EXPOSE 4000

# Start server
CMD ["serve", "-s", "dist", "-l", "4000"]