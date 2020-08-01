const Categories = require('../models/categories');

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
    App.find({
        category: req.params.category
    }).then(apps => {
        res.send(apps)
    }).catch(err => {
        res.send(err)
    })
}
