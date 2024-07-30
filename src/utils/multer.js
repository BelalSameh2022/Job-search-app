import multer from "multer";
import { nanoid } from "nanoid";
import { AppError } from "./error.js";

export const validExtensions = {
  image: ["image/png", "image/gif", "image/jpg"],
  pdf: ["application/pdf"],
  video: ["video/mp4", "video/mkv"],
};
export const multerLocal = (customValidation) => {
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "uploads/");
    },
    filename: (req, file, cb) => {
      cb(null, nanoid() + "-" + file.originalname);
    },
  });

  const fileFilter = (req, file, cb) => {
    if (customValidation.includes(file.mimetype))
      cb(null, true);
    else
      cb(
        new AppError("File type is not supported: Images only accepted", 403),
        false
      );
  };

  const upload = multer({ storage, fileFilter });
  return upload;
};
