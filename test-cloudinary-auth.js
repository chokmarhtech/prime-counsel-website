import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';
dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true
});

// the public ID from the console log
const publicId = 'eba16b3ab372f2a65b245433c1c7847776cab151bc1c8f7052bbbc26f3e7551f';
const format = 'pdf';

const url = cloudinary.utils.url(`${publicId}.${format}`, {
  sign_url: true,
  resource_type: 'image',
  type: 'upload'
});

console.log("Signed URL:", url);

fetch(url)
  .then(res => {
     console.log("Status:", res.status);
     return res.headers;
  })
  .then(headers => console.log("Headers:", Object.fromEntries(headers.entries())))
  .catch(console.error);
