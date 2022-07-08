const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema({
   

    sender:{
        type: Number
    },
   
    reciever:{
        type: Number
    },
    
    postId:{
        type: Number
    },

   
})

module.exports = mongoose.model('chat',chatSchema)

