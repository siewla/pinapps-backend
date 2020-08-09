const Apps = require('../models/apps');
const captureWebsite = require('capture-website');
const {
    unlink
} = require('fs');

const uploadFolder = 'screenshots/';
const websiteCaptureOptions = {
    width: 320,
    height: 400,
    type: 'jpeg',
    launchOptions: {
        args: ['--no-sandbox']
    }
};
const cloudinary = require('cloudinary').v2;
cloudinary.config({
    cloud_name: 'apcb',
    api_key: '331716551633671',
    api_secret: process.env.CLOUDINARY_SECRET
});
const successMessage = 'Success';

exports.addApp = async (req, res) => {
    // console.log('request body:', req.body);
    const {
        name,
        url,
        description,
        category,
        userId
    } = req.body;
    let filePath = `${uploadFolder + name}.jpg`;
    try {
        // console.log("capturing website")
        const websiteCaptureResult = await captureWebsite.file(url, filePath, websiteCaptureOptions);
        // console.log('website screenshot result:', websiteCaptureResult)
        // console.log('uploading screenshot')
        const uploadResult = await cloudinary.uploader.upload(filePath);
        // console.log('upload result:', uploadResult);
        const dbResult = await Apps.create({
            name,
            url,
            screenshot: uploadResult.secure_url,
            description,
            category,
            likes: [userId]
        })
        // console.log('db result:', dbResult)
        unlink(filePath, () => console.log(filePath, 'deleted'));
        res.json(successMessage);
    } catch (error) {
        // console.log(error);
        res.json(error)
    }
};

exports.getAppByID = (req, res) => {
    Apps.findById(req.params.appId).then(app => {

        res.json(app)
    }).catch(err => {
        // console.log(err);
        res.json(err)
    })
}

exports.getAllApps = (req, res) => {
    Apps.find().limit(100).then(apps => {
        // console.log('get all apps:', apps)
        res.json(apps)
    }).catch(err => {
        // console.log(err);
        res.json(err)
    })
}

exports.getAppsByCategory = (req, res) => {
    Apps.find({
        category: req.params.category
    }).then(apps => {
        res.json(apps)
    }).catch(err => {
        res.json(err)
    })
}

exports.updateApp = (req, res) => {
    const app = req.params.appId
    Apps.findByIdAndUpdate(app, req.body)
        .then(result => res.json(result.result))
        .catch(err => res.json(err))
}

exports.deleteApp = (req, res) => {
    const app = req.params.appId
    Apps.findByIdAndDelete(app)
        .then(result => res.json(result.result))
        .catch(err => res.json(err))
}

exports.likeApp = async (req, res) => {
    const appId = req.params.appId;
    Apps.findByIdAndUpdate(appId, {
            $push: {
                likes: req.body.userId
            }
        })
        .then(result => res.json(result.result))
        .catch(err => res.json(err))
}

exports.unlikeApp = async (req, res) => {
    const appId = req.params.appId;
    // console.log('request Body:', req.body)
    Apps.findByIdAndUpdate(appId, {
            $pull: {
                likes: req.body.userId
            }
        })
        .then(result => res.json(result.result))
        .catch(err => res.json(err))
}
