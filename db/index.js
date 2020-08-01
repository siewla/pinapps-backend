const mongoose = require('mongoose');
const db = mongoose.connection;

//Environment Variables
const mongoURI = process.env.MONGODB_URI;

//connect to Mongo
mongoose.connect(mongoURI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
    },
    () => console.log(`MongoDB connection to ${mongoURI} established`)
);

//Error or Disconnection 
db.on('error', err => console.log(err.message + ' is Mongod not running?'));
db.on('disconnected', () => console.log('mongo disconnected'));
