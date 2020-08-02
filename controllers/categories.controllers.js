const Categories = require('../models/categories');

exports.addCategory = async (req, res) => {
    console.log('Add Category Request Body:', req.body);
    const {
        name,
        description
    } = req.body;

    try {
        const dbResult = await Categories.create({
            name,
            description
        })
        console.log('Add Category DB Result:', dbResult)
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
