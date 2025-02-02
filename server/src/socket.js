import { createServer } from 'node:http';
import { app } from './app.js';
import { Server } from 'socket.io';
import {
  CREATE_REACTION_FOR_COMMENT,
  CREATE_REVIEW_RATING,
  DELETE_PRODUCT,
  JOIN_ROOM_FOR_BLOG,
  LEAVE_ROOM_FOR_BLOG,
  LOGIN_EVENT,
  LOGOUT_EVENT,
  NEW_BLOG_ADDED,
  NEW_COMMENT_ADDED,
  NEW_PRODUCT_ADDED,
  NEW_USER_REGISTERED,
  UPDATE_ORDER_STATUS,
} from './events.js';
import cookieParser from 'cookie-parser';
import { socketUserAuthentication } from './middlewares/socketUserAuthentication.middleware.js';
import { getEligibleSocketToGetMessage } from './helper/helper.js';
import { userModels } from './models/userRegistration.model.js';
import { Comments } from './models/blog/comments.models.js';
import {
  createReactionForComments,
  getSingleComment,
} from './controllers/blog/reactions.controller.js';

export const server = createServer(app);

export const io = new Server(server, {
  cors: {
    origin: [
      'http://localhost:3000',
      'http://localhost:5173',
      'http://localhost:5174',
    ],
    credentials: true,
  },
});

io.use((socket, next) => {
  cookieParser()(socket.request, socket.request.res, async (error) => {
    await socketUserAuthentication(error, socket, next);
  });
});

const userSocketMap = new Map();
const unKnownSocket = [];
io.on('connection', (socket) => {
  // if user is authenticated then add socket id to userSocketMap
  if (socket?.user?._id) {
    if (userSocketMap.has(socket.user._id.toString())) {
      userSocketMap.set(socket.user._id.toString(), [
        ...userSocketMap.get(socket.user._id.toString()),
        socket.id,
      ]);
    } else {
      userSocketMap.set(socket.user._id.toString(), [socket.id]);
    }

    console.log('User connected with socket id : ', socket.id);
  } else {
    unKnownSocket.push(socket.id);
    console.log('UnKnown user connected with socket id : ', socket.id);
  }

  // handle the socket and user if login the user.
  socket.on(LOGIN_EVENT, (user) => {
    try {
      socket.user = user;
      if (unKnownSocket.includes(socket.id)) {
        unKnownSocket.splice(unKnownSocket.indexOf(socket.id), 1);
      }
      if (userSocketMap.has(user._id.toString())) {
        userSocketMap.set(user._id.toString(), [
          ...userSocketMap.get(user._id.toString()),
          socket.id,
        ]);
      } else userSocketMap.set(user._id.toString(), [socket.id]);
    } catch (error) {
      console.log('We get error during login event');
    }
  });

  // handle the socket and user if logout the user.
  socket.on(LOGOUT_EVENT, (user) => {
    //code for remove from userSocketMap
    if (userSocketMap.has(user._id.toString())) {
      userSocketMap.set(
        user._id.toString(),
        userSocketMap.get(user._id.toString()).filter((id) => id != socket.id),
      );
      if (userSocketMap.get(user._id.toString()).length == 0) {
        userSocketMap.delete(user._id.toString());
      }
    }
    unKnownSocket.push(socket.id);
    socket.user = 'unKnown';
  });

  // emit message to all users when new product is added.
  socket.on(NEW_PRODUCT_ADDED, ({ message, productsData }) => {
    io.emit(NEW_PRODUCT_ADDED, { message, productsData });
  });

  // emit message to all users when new blog is added.
  socket.on(NEW_BLOG_ADDED, ({ message, data }) => {
    io.emit(NEW_BLOG_ADDED, { message, data });
  });

  // emit by admin if order status will be updated for a user.
  socket.on(UPDATE_ORDER_STATUS, ({ orderId, status, user }) => {
    const eligibleSockets = getEligibleSocketToGetMessage(
      [user, socket.user.id],
      userSocketMap,
    );
    io.to(eligibleSockets).emit(UPDATE_ORDER_STATUS, { orderId, status, user });
  });

  // emit to admin if new user is registered.
  socket.on(NEW_USER_REGISTERED, async (user) => {
    const adminIdList = (
      await userModels.find({ roles: 'admin' }, { _id: 1 })
    ).map(({ _id }) => _id.toString());

    const adminSocket = getEligibleSocketToGetMessage(
      adminIdList,
      userSocketMap,
    );
    io.to(adminSocket).emit(NEW_USER_REGISTERED, user);
  });

  socket.on(DELETE_PRODUCT, (productId) => {
    console.log('Products is deleting');
    io.emit(DELETE_PRODUCT, productId);
  });

  socket.on(CREATE_REVIEW_RATING, (data) => {
    io.emit(CREATE_REVIEW_RATING, data);
  });

  socket.on(JOIN_ROOM_FOR_BLOG, (blogId) => {
    socket.join(blogId);
    console.log('New user added in room for blog : ', socket.id);
  });
  socket.on(LEAVE_ROOM_FOR_BLOG, (blogId) => {
    socket.leave(blogId);
    console.log('User removed from room for blog : ', socket.id);
  });

  socket.on(NEW_COMMENT_ADDED, async (data) => {
    // first we create comment for db.
    const { comment, blogId, creator } = data;

    if (!comment || !blogId || !creator) {
      socket.emit(NEW_COMMENT_ADDED, {
        success: false,
        commentData: 'Please fill all fields!',
      });
      return;
    }
    try {
      const comment = await Comments.create(data);
      const { success, commentData } = await getSingleComment(comment._id);
      if (success) {
        io.to(blogId).emit(NEW_COMMENT_ADDED, { success, commentData });
      } else {
        socket.emit(NEW_COMMENT_ADDED, { success, commentData });
      }
    } catch (err) {
      console.log('We get error during creating comment');
      socket.emit(NEW_COMMENT_ADDED, { success: false, commentData: err });
    }
  });

  socket.on(CREATE_REACTION_FOR_COMMENT, async (payload) => {
    try {
      const { commentId, reaction, creator, blogId } = payload;
      if(!commentId || !reaction || !creator || !blogId){
        return {success : false, message : 'Please fill all fields!' }
      }

      // first we perform db operation we create reaction for comment.
      const { success, message } = await createReactionForComments({
        commentId,
        reaction,
        creator,
      });
      
      // after creating reactions we send from fetching the db.
      if (success) {
        // code for fetching the db.
        const { success, commentData } = await getSingleComment(commentId);
        if (success)
          io.to(blogId).emit(CREATE_REACTION_FOR_COMMENT, {
            success,
            commentData,
          });
        else
          socket.emit(CREATE_REACTION_FOR_COMMENT, {
            success: false,
            commentData,
          });
      } else {
        socket.emit(CREATE_REACTION_FOR_COMMENT, {
          success: false,
          message,
        });
      }
    } catch (error) {
      socket.emit(CREATE_REACTION_FOR_COMMENT, {success : false, message : error?.message || error || "Something went wrong !"})
    }
  });

  // handling event for when user is logged out.
  socket.on('disconnect', () => {
    if (socket?.user?._id) {
      userSocketMap.set(
        socket.user._id.toString(),
        userSocketMap
          .get(socket.user._id.toString())
          .filter((id) => id !== socket.id),
      );
    } else socket.disconnect(socket.id);
  });
});
