const App = require('../models/apps')
const captureWebsite = require('capture-website')
const {
    unlink
} = require('fs')

const uploadFolder = 'screenshots/'
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
const successMessage = 'Success'

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
            category <<
            << << < HEAD
        })
        console.log('db result:', dbResult)
        unlink(filePath, () => console.log(filePath, 'deleted'));
        res.send(successMessage);
    } catch (error) {
        console.log(error);
        res.send(error)
    }
} ===
=== =
});
console.log('db result:', dbResult);
}
catch (error) {
    console.log(error);
}

}; >>>
>>> > c41f993061918fbe9c24481ae4e64b0087167a4a

exports.getAppByID = (req, res) => {
    App.findById(req.params.id).then(app => {
        <<
        << << < HEAD
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
        App.find({
            category: req.params.category
        }).then(apps => {
            res.send(apps)
        }).catch(err => {
            res.send(err)
        })
    } ===
    === =
    res.send(app.screenshot);
});
}; >>>
>>> > c41f993061918fbe9c24481ae4e64b0087167a4a
