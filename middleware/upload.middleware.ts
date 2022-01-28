import multer from "multer";
const path = require("path");

let storage = multer.diskStorage({
  destination: function (req, res, cb) {
    cb(null, path.join(__dirname, "./uploads/"));
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + "-" + Date.now());
  },
});

function fileFilter(req: any, file: any, cb: any) {
  let ext = path.extname(file.originalname);
  if (ext !== ".png" && ext !== ".jpg" && ext !== ".gif" && ext !== ".jpeg") {
    return cb(new Error("Only images"));
  }
  cb(null, true);
}

const upload = multer({ storage: storage, fileFilter: fileFilter });
export const fileUpload = upload.fields([{ name: "image-file", maxCount: 1 }]);
