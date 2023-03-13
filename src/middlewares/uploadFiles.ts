import multer from 'multer'
import path from 'path'

const multerConfig = multer.diskStorage({
  destination: path.join(__dirname, "../", "../", "tmp"),
  filename: (_, file, cb) => {
    cb(null, file.originalname);
  },
});

export const uploadFiles = multer({
  storage: multerConfig,
});
