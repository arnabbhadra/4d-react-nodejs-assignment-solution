import multer from 'multer';
import path from 'path';
// config multer for file upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // folder path
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    // save file with
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

// allow only csv and text
const fileFilter = (req, file, cb) => {
  const allowedTypes = /csv|txt/;
  const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  if (extname) {
    return cb(null, true);

  } else {
    cb(new Error('Invalid file type. Only CSV, TXT are allowed.'), false);
  }
};
const upload = multer({ storage, fileFilter, limits: { fileSize: 5 * 1024 * 1024 } });

const handleFileUploadError = (error, req, res, next) => {
  if (error instanceof multer.MulterError) {
    // handle file size error
    if (error.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).send({ message: 'File size exceeds the 5MB limit.' });
    }
    // handle other error
    return res.status(400).send({ message: `${error.message}` });
  }
  if (error) {
    // General errors
    return res.status(400).send({ message: `${error.message}` });
  }
  next()
};

export { upload, handleFileUploadError }


