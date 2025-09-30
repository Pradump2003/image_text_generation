const { Router } = require("express");
const { uploadImage } = require("../controllers/upload.controllers");
const upload = require("../middleware/multer.middleware");

const router = Router();

router.post("/upload", upload.single("image"), uploadImage);

module.exports = router;
