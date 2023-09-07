const mongoose = require('mongoose');
require('dotenv').config();

module.exports = function(){

    mongoose.connect(process.env.MONGODB_URI ,{useNewUrlParser:true});
    mongoose.connection.on('connected',()=>{
        console.log('Mongo db connected');
        
    })
    mongoose.connection.on('error',(err)=>{
        console.log('Mongo db error',err);
    }
    )
}
