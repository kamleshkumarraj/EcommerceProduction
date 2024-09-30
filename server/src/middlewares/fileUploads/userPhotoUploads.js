import multer from 'multer';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './src/uploads');
  },
  filename: (req, file, cb) => {
    const prefix = Date.now() + '_' + (Math.floor(Math.random() * 200) + 1);
    cb(null, prefix + '_' + file.originalname);
  },
});

const uploads = multer({ storage: storage });

export const avatarUpload = uploads.single('avatar');
