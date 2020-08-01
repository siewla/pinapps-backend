const appControllers = require('../controllers');

module.exports = (app) => {
    app.use('/auth', require('./auth.routes'));
    app.use('/apps', require('./apps.routes'));
    app.use('/users', require('./users.routes'));
};
