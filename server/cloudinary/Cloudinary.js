// import multer from "multer";
// import { v2 as cloudinary } from 'cloudinary';

// cloudinary.config({
//     cloud_name: 'dr2dwn77z',
//     api_key :'943369567132644',
//     api_secret : 'VRI_YPbFVUGHMtWT0eV1AB1lWcs',
// });

// const storage = new multer.memoryStorage();

// export async function cloudImageUpload(file) {

//     const result = await cloudinary.uploader.upload(file,{
//       resource_type : 'auto',

//     })
//      return result;
// }

// export const upload =multer({storage})

import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import streamifier from "streamifier";
import dotenv from "dotenv";
dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

const storage = multer.memoryStorage();
export const upload = multer({ storage });

export const cloudImageUpload = async (fileBuffer) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { resource_type: "auto" },
      (error, result) => {
        if (error) return reject(error);
        resolve(result);
      }
    );
    streamifier.createReadStream(fileBuffer).pipe(stream);
  });
};



