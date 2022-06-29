const { json } = require('express');
const express = require('express');
const { getDate } = require('javascript-time-ago/gradation');
const Model = require('../models/model');
const UserModel = require('../models/user');
var moment = require('moment');
var haversine = require("haversine-distance");
const LikesModel = require('../models/likes');

const SubCategoryModel = require('../models/subcategories');
const router = express.Router();
const { success, error, validation } = require("./responseApi");
let ts = Date.now();
function GetRandomId(min, max) {  
    return Math.floor(
      Math.random() * (max - min) + min
    )
  }
  function GetDistance(lat1,long1,lat2,long2)
  
  {

    var point1 = {lat: lat1,lng: long1}

//Second point in your haversine calculation
var point2 = {lat: lat2, lng:long2 }

var haversine_m = haversine(point1, point2); //Results in meters (default)
var haversine_km = haversine_m /1000; //Results in kilometers

return haversine_km;
  }

  Array.prototype.sortAttr = function(attr,reverse) {
    var sorter = function(a,b) {
      var aa = a[attr];
      var bb = b[attr];
      if(aa+0==aa && bb+0==bb) return aa-bb; // numbers
      else return aa.localeCompare(bb); // strings
    }
    this.sort(function(a,b) {
      var result = sorter(a,b);
      if(reverse) result*= -1;
      return result;
    });
  };
  Array.prototype.sortAttrViews = function(attr,reverse) {
    var sorter = function(a,b) {
      var aa = a[attr];
      var bb = b[attr];
      if(aa+0==aa && bb+0==bb) return aa-bb; // numbers
      else return aa.localeCompare(bb); // strings
    }
    this.sort(function(a,b) {
      var result = sorter(b,a);
      if(reverse) result*= -1;
      return result;
    });
  };

router.post('/post', async (req, res) => {
    const data = new Model({
        categoryId: req.body.categoryId,
        postId:GetRandomId(10000,1000000),
        title: req.body.title,
        isAnonymous:req.body.isAnonymous,
        postViews:0,
        userId:req.body.userId,
        latitude:req.body.latitude,
        longitude:req.body.longitude,
        postType:req.body.postType,
        subCategories:req.body.subCategories,
        categoryName:req.body.categoryName,
        categoryId:req.body.categoryId,
        dateTimeStamp:new Date(),
        imageUrl:req.body.imageUrl,

    })
    delete data.users;

    try {
        const dataToSave = await data.save();
        res.status(200).json(dataToSave)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})


router.get('/Posts/GetAllPosts/:userId/:latitude/:longitude', async (req, res) => {
  Model.aggregate([{
            $lookup: {
                from: "users", 
                localField: "userId",
                foreignField: "userId",
                as: "users"
            },
            
        },
            
        {
          $unwind: '$users'
        }
        , { $project: { _id: 0, "users.userId": 1,"postId":1,"title":1,"isAnonymous":1,

    "postViews":1,  "latitude":1,  "longitude":1,"postType":1,"categoryName":1,
    "subCategories":1,"dateTimeStamp":1,"users.name":1,"isLiked":1,"imageUrl":1} }
    ]).exec(function(err, students) {
         
            students.forEach( result => {
            result.ago=moment(new Date(), "YYYY-MM-DD HH:mm:ss").fromNow();
            result.distance=  GetDistance (result.latitude,result.longitude,req.params.latitude,req.params.longitude);
           
        });
            students.sortAttr("distance")
            res.json(success("OK", { data: students}, res.statusCode))
           
        });

















      
   

})
router.get('/Posts/GetAllTrendingPosts/:userId/:latitude/:longitude', async (req, res) => {
    Model.aggregate([{
              $lookup: {
                  from: "users", 
                  localField: "userId",
                  foreignField: "userId",
                  as: "users"
              },
              
          },
              
          {
            $unwind: '$users'
          }
          , { $project: { _id: 0, "users.userId": 1,"postId":1,"title":1,"isAnonymous":1,
  
      "postViews":1,  "latitude":1,  "longitude":1,"postType":1,"categoryName":1,
      "subCategories":1,"dateTimeStamp":1,"users.name":1,"isLiked":1,"imageUrl":1} }
      ]).exec(function(err, students) {
           
              students.forEach( result => {
              result.ago=moment(new Date(), "YYYY-MM-DD HH:mm:ss").fromNow();
              result.distance=  GetDistance (result.latitude,result.longitude,req.params.latitude,req.params.longitude);
             
          });
              students.sortAttrViews("postViews")
              res.json(success("OK", { data: students}, res.statusCode))
          });
  
  
  
  
  
  
  
  
  
  
  
  
  
     
  
  })


  router.get('/Posts/GetAllWhatisPosts/:userId/:latitude/:longitude', async (req, res) => {
    Model.aggregate([
        
        { $match: { categoryId: "5" }},
        {
        
              $lookup: {
                  from: "users", 
                  localField: "userId",
                  foreignField: "userId",
                  as: "users"
              },
              
          },
              
          {
            $unwind: '$users'
          }
          , { $project: { _id: 0, "users.userId": 1,"postId":1,"title":1,"isAnonymous":1,
  
      "postViews":1,  "latitude":1,  "longitude":1,"postType":1,"categoryName":1,
      "subCategories":1,"dateTimeStamp":1,"users.name":1,"isLiked":1,"imageUrl":1} }
      ]).exec(function(err, students) {
           
              students.forEach( result => {
              result.ago=moment(new Date(), "YYYY-MM-DD HH:mm:ss").fromNow();
              result.distance=  GetDistance (result.latitude,result.longitude,req.params.latitude,req.params.longitude);
             
          });
              students.sortAttrViews("postViews")
              res.json(success("OK", { data: students}, res.statusCode))
          });
  
  
  
  
  
  
  
  
  
  
  
  
  
     
  
  })
  router.get('/getPostLike/:postId/:userId', async (req, res) => {
    try{
    
        const data = await LikesModel.findOne({postId:req.params.postId,userId:req.params.userId});
        console.log(req.params.postId,req.params.userId)
       if(data==null)
       {
        res.json(success("Ok", { data:0}, res.statusCode))
       }
       else
       {
        res.json(success("Ok", { data:1}, res.statusCode))
       }
       
    }
    catch(errors){
        res.json(error("Something went wrong", res.statusCode))
    }
  })


//Update by ID Method
router.get('/Posts/AddPostView/:postId', async (req, res) => {
    
        Model.findOneAndUpdate( {postId: req.params.postId}, 
            {$inc : {'postViews' : 1}}, 
            {new: true}, 
            function(err, response) { 
                 // do something
            });
            res.json(success("View Added ", { data: null}, res.statusCode))
        

})


//User Routes
router.post('/user/post', async (req, res) => {
    const data = new UserModel({
        emailAddress: req.body.emailAddress,
        userId:GetRandomId(10000,1000000),
        name: req.body.name,
        token:req.body.token,
       
    })

    const user = await UserModel.findOne({
        emailAddress: data.emailAddress,
     
      });
      if(user==null ||user.length==0)
      {
        const dataToSave = await data.save();
       
         res.json(success("User Added SuccessFully", { data: dataToSave}, res.statusCode))
      }
      else{        
        res.json(success("User Added SuccessFully", { data: user}, res.statusCode))
      }
       
})


router.get('/User/UpdateToken/:userId/:token', async (req, res) => {
    
    var myquery = { userId: req.params.userId };
    var newvalues = { $set: {token: req.params.token} };
    UserModel.findOneAndUpdate( myquery, 
        newvalues, 
        function(err, response) { 
             // do something
        });
          res.json(success("User Token Updated", { data: "1"}, res.statusCode))
    

})


//likes Routes

router.post('/likes/post', async (req, res) => {
   
    const source = await LikesModel.findOne({
        postId:  req.body.postId,
        userId:req.body.userId
     
      });
    
 if (source==null) {
    var user = new LikesModel(req.body)
    user.subCategoryId=GetRandomId(10000,1000000),
     await user.save();
     res.json(success("Liked Successfully", { data: "1"}, res.statusCode))
 }
 else{
       const id = source._id;
        const data = await LikesModel.findByIdAndDelete(id)      
        res.json(success("Unliked", { data: "0"}, res.statusCode))

 }
   
});

//SubCategories


router.get('/getSubCategories/:categoryId', async (req, res) => {
  try{
  
      const data = await SubCategoryModel.find({categoryId:req.params.categoryId});
     
      res.json(success("Ok", { data: data}, res.statusCode))
  }
  catch(errors){
      res.json(error("Something went wrong", res.statusCode))
  }
})

router.post('/subCategories/post', async (req, res) => {
   
    var user = new SubCategoryModel(req.body)
    await user.save();
    res.json(success("OsubCategories Added", { data: "1"}, res.statusCode))
 

 
   
});
module.exports = router;