import multer from "multer";
import path from "path";

const zipStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/temp");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`); // Add timestamp to avoid filename collisions
  },
});

// File filter to only allow ZIP files
const zipFileFilter = (req, file, cb) => {
  const fileTypes = /zip/; // Only allow ZIP files
  const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());

  if (extname) {
    cb(null, true);
  } else {
    cb(new Error("Only ZIP files are allowed!"), false);
  }
};

// Set max file size limit (e.g., 70MB)
const maxFileSize = 70 * 1024 * 1024; // 70 MB

// Create upload middleware for ZIP files
export const uploadZip = multer({
  storage: zipStorage,
  fileFilter: zipFileFilter,
  limits: { fileSize: maxFileSize }, // Set file size limit to 70MB
});
