const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const chatcontentSchema = new mongoose.Schema({
    message :{
        
        type: String
    },

    sender:{
        type: Number
    },
   
    ago:{
        type: String
    },
    reciever:{
        type: Number
    },
    chatId:{
        type: String,
    },
    dateTimeStamp :{
       
        type: Date
    }
    
  

   
})

module.exports = mongoose.model('chatcontent',chatcontentSchema)
