FROM node:current-alpine3.23

WORKDIR /app

# copy package files
COPY package*.json ./

# install dependencies
RUN npm install

# copy project
COPY . .

# expose dev port (vite example)
EXPOSE 5173

# run dev server
CMD ["npm", "run", "dev"]