/*------------DEPENDENCIES------------*/
const express = require('express');
const morgan = require('morgan');
const app = express();
const cors = require('cors');

require('dotenv').config({
    path: '.env'
});

const PORT = process.env.PORT;
require('./db');

/*------------MIDDLEWARE------------*/
app.use(cors());
app.use(express.urlencoded({
    extended: false
})); // extended: false - does not allow nested objects in query strings
app.use(express.json());

if (process.env.NODE_ENV === 'dev') {
    app.use(cors({
        origin: process.env.CLIENT_URL
    }));
    //Cors allows backend to deal with react for localhost of frontend without any problem

    app.use(morgan('dev'));
    //Morgan gives information about each request
}

/*------------Route------------*/
//Load All routes
const authRouter = require('./routes/auth.route');
app.use('/api/', authRouter);

// require('./routes')(app);

//This will catch any route that doesn't exist
app.get('*', (req, res) => {
    res.status(404).json('Page Not Found');
});

/*------------LISTENER------------*/
app.listen(PORT, () => {
    console.log(`PinApps is listening on PORT: ${PORT}`);
});
