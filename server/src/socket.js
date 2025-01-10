import { createServer } from 'node:http';
import { app } from './app.js';
import { Server } from 'socket.io';
import { AUTHENTICATED, NEW_BLOG_ADDED, NEW_PRODUCT_ADDED } from './events.js';
import cookieParser from 'cookie-parser';
import { socketUserAuthentication } from './middlewares/socketUserAuthentication.middleware.js';


export const server = createServer(app);

export const io = new Server(server, {
  cors: {
    origin: [
      'http://localhost:3000',
      'http://localhost:5173',
      'http://localhost:5174',
    ],
    credentials : true,
  },
});

io.use((socket , next) => {
  cookieParser()(socket.request , socket.request.res , async (error) => {
    await socketUserAuthentication(error , socket , next);
  }) 
})

const userSocketMap = new Map();

io.on('connection', (socket) => {
  
  if(socket?.user?._id){
    userSocketMap.set(socket.user._id.toString() , socket.id);
    console.log('User connected with socket id : ', socket.id);
  }else console.log("Unknown user connected with socket id : " , socket.id)
  
  socket.on(NEW_PRODUCT_ADDED , ({message , productsData}) => {
      io.emit(NEW_PRODUCT_ADDED , {message , productsData}) 
  })

  socket.on(NEW_BLOG_ADDED , ({message , data}) => {
     io.emit(NEW_BLOG_ADDED , {message , data})
  })

  socket.on('disconnect', () => {
    console.log('User disconnected with socket id : ', socket.id);
  });

});
