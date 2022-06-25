const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
    name:{
        type: String
    },
    postId: {
       
        type: Number
    },

 title :{
       
        type: String
    },
    isAnonymous: {
       
        type: Number
    },




 userId :{
        
        type: Number
    },
    postViews: {
       
        type: Number
    },




latitude :{
      
        type: String
    },
    Longitude: {
       
        type: String
    },


 postType :{
       
        type: Number
    },
    categoryName : {
       
        type: String
    },



 categoryId :{
       
        type: Number
    },
   
})

module.exports = mongoose.model('NearWePosts',dataSchema)

