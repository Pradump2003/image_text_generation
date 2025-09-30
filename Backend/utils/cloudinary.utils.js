const expressAsyncHandler = require("express-async-handler");
const v2 = require("../config/cloudinary.config");

const uploadImageOnCloudinary = expressAsyncHandler(async (url) => {
  // v2.uploader.upload(...)	Cloudinary's method to upload media (images, videos, etc.).
  const uploaded = await v2.uploader.upload(url, {
    folder: "bitbucket",
    resource_type: "auto",
  });
  console.log(uploaded);
  return uploaded;
});

module.exports = {
  uploadImageOnCloudinary,
};
