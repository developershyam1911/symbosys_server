import multer from "multer";
import path from "path";

// Middleware for handling ZIP files
const zipStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/uploads/zipfiles"); // Directory to save ZIP files
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname); // Save the file with its original name
  },
});

// File filter to only allow ZIP files
const zipFileFilter = (req, file, cb) => {
  const fileTypes = /zip/; // Accept only ZIP files
  const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
  if (extname) {
    return cb(null, true);
  } else {
    cb(new Error("Only ZIP files are allowed!"));
  }
};

// Set file size limit (e.g., 50MB)
const maxFileSize = 70 * 1024 * 1024; // 50 MB

// Create the upload middleware for ZIP files
export const uploadZip = multer({
  storage: zipStorage,
  fileFilter: zipFileFilter,
  limits: { fileSize: maxFileSize }, // Limit file size to 50MB
});
