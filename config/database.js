const mongoose = require('mongoose')
const {MONGO_URI} = process.env

module.exports.connect = () => {
    /* 
    connect database mongodb and return connect function
    */
    mongoose.connect( MONGO_URI, {
       
        useNewUrlParser: true, 
        useUnifiedTopology: true 

    })
    .then( () => {
        console.log("Succ connect database");
    })
    .catch(e => {
        console.log("Wrroy somting database connect");
        console.error(e)
        process.exit(1)
    })
}