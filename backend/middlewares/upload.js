const multer = require("multer");
const path = require("path");

const ALLOWED = new Set([".jpg", ".jpeg", ".png", ".webp"]);

const storage = multer.diskStorage({
  destination: (req, file, cb) =>
    cb(null, path.join(__dirname, "..", "uploads")),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    const safeExt = ALLOWED.has(ext) ? ext : ".jpg";
    const orderId = req.params.orderId || "NOORDER";
    const ts = Date.now();
    cb(
      null,
      `${orderId}_${ts}_${Math.random().toString(36).slice(2)}${safeExt}`
    );
  },
});

const fileFilter = (req, file, cb) => {
  const ext = path.extname(file.originalname).toLowerCase();
  if (!ALLOWED.has(ext))
    return cb(new Error("Only jpg, jpeg, png, webp allowed"), false);
  cb(null, true);
};

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024, files: 4 },
  fileFilter,
});

module.exports = { upload };
