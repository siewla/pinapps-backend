const appControllers = require('../controllers');

module.exports = (app) =>{
    app.use('/backend' , appControllers);
};