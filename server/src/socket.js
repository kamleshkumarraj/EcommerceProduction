import { createServer } from 'node:http';
import { app } from './app.js';
import { Server } from 'socket.io';
import { NEW_BLOG_ADDED, NEW_PRODUCT_ADDED, NEW_USER_REGISTERED, UPDATE_ORDER_STATUS } from './events.js';
import cookieParser from 'cookie-parser';
import { socketUserAuthentication } from './middlewares/socketUserAuthentication.middleware.js';
import { getEligibleSocketToGetMessage } from './helper/helper.js';
import { userModels } from './models/userRegistration.model.js';


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
const unKnownSocket = [];
io.on('connection', (socket) => {
  // if user is authenticated then add socket id to userSocketMap
  if(socket?.user?._id){
    if(userSocketMap.has(socket.user._id.toString())){
      userSocketMap.set(socket.user._id.toString() , [...userSocketMap.get(socket.user._id.toString()) , socket.id])
    }else{
      userSocketMap.set(socket.user._id.toString() , [socket.id]);
    }
    
    console.log('User connected with socket id : ', socket.id);
  }else {
    unKnownSocket.push(socket.id);
    console.log('UnKnown user connected with socket id : ', socket.id);
  }

  console.log(unKnownSocket)
  console.log(userSocketMap)
  
  // emit message to all users when new product is added
  socket.on(NEW_PRODUCT_ADDED , ({message , productsData}) => {
      io.emit(NEW_PRODUCT_ADDED , {message , productsData}) 
  })

  // emit message to all users when new blog is added
  socket.on(NEW_BLOG_ADDED , ({message , data}) => {
     io.emit(NEW_BLOG_ADDED , {message , data})
  })

  // emit by admin if order status will be updated for a user.
  socket.on(UPDATE_ORDER_STATUS , ({orderId , status , user}) => {
    const eligibleSockets = getEligibleSocketToGetMessage([user , socket.user.id] , userSocketMap);
    io.to(eligibleSockets).emit(UPDATE_ORDER_STATUS , {orderId , status , user})
  })
  
// emit to admin if new user is registered
  socket.on(NEW_USER_REGISTERED , async (user) => {
    const adminIdList = (await userModels.find({roles : 'admin'} , {_id : 1})).map(({_id}) => _id.toString());
    const adminSocket = getEligibleSocketToGetMessage(adminIdList , userSocketMap)
    io.to(adminSocket).emit(NEW_USER_REGISTERED , user)
  })

  socket.on('disconnect', () => {
    if(socket?.user?._id){
      userSocketMap.set(socket.user._id.toString() , userSocketMap.get(socket.user._id.toString()).filter((id) => id !== socket.id))
    }else socket.disconnect(socket.id);
    console.log('User disconnected with socket id : ', socket.id);
  });

});
