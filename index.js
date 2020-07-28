/*------------DEPENDENCIES------------*/ 
const express   =   require ('express');
const app       =   express ();
const PORT      =   process.env.PORT || 3000;
const cors      =   require('cors');

/*------------MIDDLEWARE------------*/ 
app.use(cors());
app.use(express.urlencoded({ extended: false })); // extended: false - does not allow nested objects in query strings
app.use(express.json());

/*------------Route------------*/
require('./routes')(app);

//This will catch any route that doesn't exist
app.get('*', (re1,res) =>{
    res.status(404).json('Page Not Found');
});

/*------------LISTENER------------*/ 
app.listen(PORT, () => {
    console.log(`PinApps is listening on PORT: ${PORT}`);
});