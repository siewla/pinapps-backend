<< << << < HEAD
const App = require('../models/apps')
const captureWebsite = require('capture-website')
const {
    unlink
} = require('fs')

const uploadFolder = 'screenshots/' ===
    === =
    const App = require('../models/apps');
const captureWebsite = require('capture-website');
const uploadFolder = 'screenshots/'; >>>
>>> > 339878 eb89abc3c4fb4bb1aa89fcab3f5a09bb5f
const websiteCaptureOptions = {
    width: 320,
    height: 400,
    type: 'jpeg'
};
const cloudinary = require('cloudinary').v2;
cloudinary.config({
    cloud_name: 'apcb',
    api_key: '331716551633671',
    api_secret: process.env.CLOUDINARY_SECRET
});
const successMessage = 'Success';

exports.addApp = async (req, res) => {
    console.log('request body:', req.body);
    const {
        name,
        url,
        description,
        category
    } = req.body;
    let filePath = `${uploadFolder + name}.jpg`;
    try {
        await captureWebsite.file(url, filePath, websiteCaptureOptions);
        const uploadResult = await cloudinary.uploader.upload(filePath);
        console.log('upload result:', uploadResult);
        const dbResult = await App.create({
            name,
            url,
            screenshot: uploadResult.secure_url,
            description,
            category
        })
        console.log('db result:', dbResult)
        unlink(filePath, () => console.log(filePath, 'deleted'));
        res.send(successMessage);
    } catch (error) {
        console.log(error);
        res.send(error)
    }
};

exports.getAppByID = (req, res) => {
    App.findById(req.params.id).then(app => {
        res.send(app)
    }).catch(err => {
        console.log(err);
        res.send(err)
    })
}

exports.getAllApps = (req, res) => {
    App.find().then(apps => {
        res.send(apps)
    }).catch(err => {
        console.log(err);
        res.send(err)
    })
}

exports.getAppsByCategory = (req, res) => {
    App.find()
}
