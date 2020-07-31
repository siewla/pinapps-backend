const screenshots = require('capture-website');
const captureURL = 'https://www.facebook.com';
const uploadFolder = 'screenshots/'

/**
 * Cloudinary Config
 */
const cloudinary = require('cloudinary').v2;
cloudinary.config({
    cloud_name: 'apcb',
    api_key: '331716551633671',
    api_secret: process.env.CLOUDINARY_SECRET
});
const websiteCaptureOptions = {
    width: 320,
    height: 400,
    type: 'jpg'
}


screenshots.base64(captureURL, websiteCaptureOptions).then((result) => console.log(result)).catch(err => console.log(err)) //.then(
//     (file) => {
//         cloudinary.uploader.upload(file).catch(err => console.log(err));
//     }
// ).catch(err => console.log(err))
