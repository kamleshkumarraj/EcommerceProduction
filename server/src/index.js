import { app } from './app.js';
import dotenv from 'dotenv';
import cloudinary from 'cloudinary';
import connectdb from './db/dbConnection.js';

//now we handle uncaught errors.
process.on('uncaughtException', (err) => {
  console.log(`Error : uncaught exception ${err}`);
  process.exit(1);
});

dotenv.config({
  path: './src/.env',
});

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

connectdb().then(() => {
  app.listen(process.env.PORT || 3000, () => {
    console.log(`server listening on ${process.env.PORT || 3000}`);
  });
});

//promise unresolved error handling.
process.on('unhandledRejection', (err) => {
  console.log(`Error : unhandledRejection ${err}`);
  process.exit(1);
});
