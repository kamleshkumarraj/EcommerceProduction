import cookieParser from 'cookie-parser';
import { socketUserAuthentication } from './middlewares/socketUserAuthentication.middleware.js';
import { authUserSockets } from './socket.js';

console.log('Hello world');


export const manageAuthSocket = () => {

    authUserSockets.use((socket , next) => {
        cookieParser()(socket.request , socket.request.res , async (err) => {
            await socketUserAuthentication(err , socket , next);
        })
    })
    
  const userSockets = new Map();

  authUserSockets.on('connection', (socket) => {
    console.log('Authenticated user connected with socket id : ', socket.id);
    userSockets.set(socket?.user?.id, socket);

    socket.on('data', ({ message }) => {
      console.log(message);
    });

    socket.on('disconnect', () => {
      console.log('User disconnected with socket id : ', socket.id);
    });
  });
};
