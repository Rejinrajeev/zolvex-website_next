const multer = require("multer");
const { ValidationError } = require("../utils/appError");

// Allowed Image MIME types
const ALLOWED_MIME_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
  "image/avif"
];

// Allowed file extensions
const ALLOWED_EXTENSIONS = /\.(jpeg|jpg|png|webp|avif)$/i;

// Configure Multer to use in-memory storage (never write unvalidated files to disk)
const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  if (!ALLOWED_MIME_TYPES.includes(file.mimetype)) {
    return cb(
      new ValidationError(
        `Unsupported file format (${file.mimetype}). Allowed formats: JPEG, PNG, WebP, AVIF.`
      ),
      false
    );
  }

  if (!file.originalname.match(ALLOWED_EXTENSIONS)) {
    return cb(
      new ValidationError(
        "Invalid file extension. Allowed extensions: .jpg, .jpeg, .png, .webp, .avif"
      ),
      false
    );
  }

  cb(null, true);
};

const upload = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5 MB Max File Size Limit
  },
  fileFilter
});

module.exports = upload;
