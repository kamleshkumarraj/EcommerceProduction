import multer from 'multer';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if(file?.mimetype == 'image/png' || file?.mimetype == 'image/jpg') cb(null, './src/uploads');
    else cb(new Error("Please upload only png and jpg images 1 ") , false)
  },
  filename: (req, file, cb) => {
    const prefix = Date.now() + '_' + (Math.floor(Math.random() * 200) + 1);
    cb(null, prefix + '_' + file.originalname);
  },
});

const fileFilter = (req , file , cb) => {
  if(file?.mimetype == 'image/png' || file?.mimetype == 'image/jpg') cb(null , true)
  else cb(new Error("Please upload only png and jpg images 2 ") , false)
}

export const uploads = multer({ storage: storage , fileFilter });

export const avatarUpload = uploads.single('avatar');
