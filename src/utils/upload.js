import path from "path";
import fs from "fs";
import multer from "multer";
import { nanoid } from "nanoid";
import { AppError } from "./error.js";

export const extensions = {
  image: ["image/png", "image/gif", "image/jpg"],
  pdf: ["application/pdf"],
  video: ["video/mp4", "video/mkv"],
};

export const localUpload = (valid, dir = "general") => {
  const fullPath = path.resolve(`uploads/${dir}`);
  if (!fs.existsSync(fullPath)) {
    fs.mkdirSync(fullPath, { recursive: true });
  }

  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, fullPath);
    },
    filename: (req, file, cb) => {
      cb(null, nanoid() + "-" + file.originalname);
    },
  });

  const fileFilter = (req, file, cb) => {
    if (valid.includes(file.mimetype)) cb(null, true);
    else
      cb(
        new AppError("File type not supported: PDF files only accepted", 403),
        false
      );
  };

  const upload = multer({ storage, fileFilter });
  return upload;
};
