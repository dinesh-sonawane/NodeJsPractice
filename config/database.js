const mongoose = require('mongoose');
require('dotenv').config();

module.exports = function(){

    mongoose.connect(process.env.MONGODB_URI || `mongodb+srv://root:root@cluster0.lobio1z.mongodb.net/eazy-property?retryWrites=true&w=majority`,{useNewUrlParser:true});
    mongoose.connection.on('connected',()=>{
        console.log('Mongo db connected');
        
    })
    mongoose.connection.on('error',(err)=>{
        console.log('Mongo db error',err);
    }
    )
}