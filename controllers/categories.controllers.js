const Categories = require('../models/categories');

exports.addCategory = async (req, res) => {
    console.log('request body:', req.body);
    const {
        name,
    } = req.body;
    let filePath = `${uploadFolder + name}.jpg`;
    try {

        const dbResult = await Categories.create({
            name
        })
        console.log('db result:', dbResult)
        res.send(successMessage);
    } catch (error) {
        console.log(error);
        res.send(error)
    }
};

exports.getCategoryByID = (req, res) => {
    Categories.findById(req.params.id).then(category => {
        res.send(category)
    }).catch(err => {
        console.log(err);
        res.send(err)
    })
}

exports.getAllCategories = (req, res) => {
    App.find().then(categories => {
        res.send(categories)
    }).catch(err => {
        console.log(err);
        res.send(err)
    })
}
