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
        res.json(successMessage);
    } catch (error) {
        console.log(error);
        res.json(error)
    }
};

exports.getCategoryByID = (req, res) => {
    Categories.findById(req.params.id).then(category => {
        res.json(category)
    }).catch(err => {
        console.log(err);
        res.json(err)
    })
}

exports.getAllCategories = (req, res) => {
    App.find().then(categories => {
        res.json(categories)
    }).catch(err => {
        console.log(err);
        res.json(err)
    })
}
