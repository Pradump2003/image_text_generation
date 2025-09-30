const expressAsyncHandler = require("express-async-handler");
const { uploadImageOnCloudinary } = require("../utils/cloudinary.utils");

const uploadImage = expressAsyncHandler(async (req, res) => {
  let b64 = Buffer.from(req.file.buffer).toString("base64");
  let url = "data:" + req.file.mimetype + ";base64," + b64;
  let uploaded = await uploadImageOnCloudinary(url);
  res.status(200).json({
    success: true,
    message: "Image uploaded",
    data: uploaded,
  });
});

module.exports = { uploadImage };
