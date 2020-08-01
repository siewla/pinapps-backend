const appControllers = require('../controllers');

module.exports = (app) => {
    app.use('/auth', require('./auth.routes'));
    app.use('/apps', require('./apps.routes'));
};
