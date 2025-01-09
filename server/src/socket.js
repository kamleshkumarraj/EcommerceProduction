import { createServer } from 'node:http';
import { app } from './app.js';
import { Server } from 'socket.io';
import { NEW_PRODUCT_ADDED } from './events.js';


export const server = createServer(app);

const io = new Server(server, {
  cors: {
    origin: [
      'http://localhost:3000',
      'http://localhost:5173',
      'http://localhost:5174',
    ],
    credentials : true,
  },
});

io.on('connection', (socket) => {
  socket.broadcast.emit('welcome message',`new user connected with socket id : ${socket.id}`);
  socket.emit('welcome message', 'Welcome to our chat room');


  socket.on(NEW_PRODUCT_ADDED , ({message , productsData}) => {
      io.emit(NEW_PRODUCT_ADDED , {message , productsData}) 
  })

  socket.on('disconnect', () => {
    console.log('User disconnected with socket id : ', socket.id);
  });
});
