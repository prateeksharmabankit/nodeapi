const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
    name:{
        type: String
    },
    PostId: {
       
        type: Number
    },

 Title :{
       
        type: String
    },
    IsAnonymous: {
       
        type: Number
    },




 UserId :{
        
        type: Number
    },
    PostViews: {
       
        type: Number
    },




 Latitude :{
      
        type: String
    },
    Longitude: {
       
        type: String
    },


 PostType :{
       
        type: Number
    },
    CategoryName : {
       
        type: String
    },



 CategoryId :{
       
        type: Number
    },
   
})

module.exports = mongoose.model('NearWePosts',dataSchema)

