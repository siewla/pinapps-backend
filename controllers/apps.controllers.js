const App = require('../models/apps');
const captureWebsite = require('capture-website');
const {
    unlink
} = require('fs');

const uploadFolder = 'screenshots/';
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
        res.json(successMessage);
    } catch (error) {
        console.log(error);
        res.json(error)
    }
};

exports.getAppByID = (req, res) => {
    App.findById(req.params.id).then(app => {

        res.json(app)
    }).catch(err => {
        console.log(err);
        res.json(err)
    })
}

exports.getAllApps = (req, res) => {
    App.find().then(apps => {
        res.json(apps)
    }).catch(err => {
        console.log(err);
        res.json(err)
    })
}

exports.getAppsByCategory = (req, res) => {
    App.find({
        category: req.params.category
    }).then(apps => {
        res.json(apps)
    }).catch(err => {
        res.json(err)
    })
}
