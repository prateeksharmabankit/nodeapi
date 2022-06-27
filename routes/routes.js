const { json } = require('express');
const express = require('express');
const { getDate } = require('javascript-time-ago/gradation');
const Model = require('../models/model');
const UserModel = require('../models/user');
var moment = require('moment');
var haversine = require("haversine-distance");
const LikesModel = require('../models/likes');
const router = express.Router();
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
        postViews:req.body.postViews,
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
    "subCategories":1,"dateTimeStamp":1,"users.name":1,"isLiked":1} }
    ]).exec(function(err, students) {
         
            students.forEach( result => {
            result.ago=moment(new Date(), "YYYY-MM-DD HH:mm:ss").fromNow();
            result.distance=  GetDistance (result.latitude,result.longitude,req.params.latitude,req.params.longitude);
           
        });
            students.sortAttr("distance")
            res.status(200).send(students)
        });

















        /*
        
        try {
        const options = {
            projection: { _id: 0, title: 1, userId: 1 },
          };

        const data = await Model.find(options);
        const user =await  UserModel.findOne();
      
         
        
        data.forEach(element => {
             
           
           
              console.log(user.userId);
            
            
           });
       
        res.status(200).json(data)
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    } */
   

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
      "subCategories":1,"dateTimeStamp":1,"users.name":1,"isLiked":1} }
      ]).exec(function(err, students) {
           
              students.forEach( result => {
              result.ago=moment(new Date(), "YYYY-MM-DD HH:mm:ss").fromNow();
              result.distance=  GetDistance (result.latitude,result.longitude,req.params.latitude,req.params.longitude);
             
          });
              students.sortAttrViews("postViews")
              res.status(200).send(students)
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
      "subCategories":1,"dateTimeStamp":1,"users.name":1,"isLiked":1} }
      ]).exec(function(err, students) {
           
              students.forEach( result => {
              result.ago=moment(new Date(), "YYYY-MM-DD HH:mm:ss").fromNow();
              result.distance=  GetDistance (result.latitude,result.longitude,req.params.latitude,req.params.longitude);
             
          });
              students.sortAttrViews("postViews")
              res.status(200).send(students)
          });
  
  
  
  
  
  
  
  
  
  
  
  
  
     
  
  })

//Get by ID Method
router.get('/getOne/:id', async (req, res) => {
    try {
        console.log(req.params.id)
        const data = await Model.findOne(postId=req.params.id);
        res.status(200).json(data)
    }
    catch (error) {
        res.status(500).json({ message: error.message })
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
            res.status(200).json({ message:"1"})
        

})

//Delete by ID Method
router.delete('/delete/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const data = await Model.findByIdAndDelete(id)
        res.send(`Document with ${data.name} has been deleted..`)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})
//User Routes
router.post('/user/post', async (req, res) => {
    const data = new UserModel({
        emailAddress: req.body.emailAddress,
        userId:GetRandomId(10000,1000000),
        name: req.body.name,
        token:req.body.token,
       
    })

    const user = await UserModel.find({
        emailAddress: data.emailAddress,
     
      });
      if(user.length==0)
      {
        const dataToSave = await data.save();
         res.status(200).json(dataToSave)
      }
      else{        
        res.status(200).json(user)
      }
       
})


//likes Poutes

router.post('/likes/post', async (req, res) => {
   
    const source = await LikesModel.findOne({
        postId:  req.body.postId,
        userId:req.body.userId
     
      });
    
 if (source==null) {
    var user = new LikesModel(req.body)
     await user.save();
    res.status(200).json("1")
 }
 else{
       const id = source._id;
        const data = await LikesModel.findByIdAndDelete(id)      
    res.status(200).json("0")

 }
   
});

module.exports = router;