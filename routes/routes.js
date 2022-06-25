const { json } = require('express');
const express = require('express');
const { getDate } = require('javascript-time-ago/gradation');
const Model = require('../models/model');
const UserModel = require('../models/user');
var moment = require('moment');

const router = express.Router();
let ts = Date.now();
function GetRandomId(min, max) {  
    return Math.floor(
      Math.random() * (max - min) + min
    )
  }
//Post Method
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

//Get all Method
router.get('/getAll', async (req, res) => {
    
             

  Model.aggregate([{
            $lookup: {
                from: "users", 
                localField: "userId",
                foreignField: "userId",
                as: "users"
            }
            
           
            
        }
        ,
        {
          $unwind: '$users'
        }
        , { $project: { _id: 0, "users.userId": 1,"postId":1,"title":1,"isAnonymous":1,

    "postViews":1,  "latitude":1,  "longitude":1,"postType":1,"categoryName":1,
    "subCategories":1,"dateTimeStamp":1,"users.name":1
    
    
    } }
    ]).exec(function(err, students) {
         
        students.forEach( result => {
         
            result.ago=moment(new Date(), "YYYY-MM-DD HH:mm:ss").fromNow();
           
          });
        
        
          //  console.log(  students);

            
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

//Get by ID Method
router.get('/getOne/:id', async (req, res) => {
    try {
        const data = await Model.findById(req.params.id);
        res.json(data)
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
})

//Update by ID Method
router.patch('/update/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const updatedData = req.body;
        const options = { new: true };

        const result = await Model.findByIdAndUpdate(
            id, updatedData, options
        )

        res.send(result)
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
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


    
    const query = { emailAddress: data};
    const update = { $set: {data}};
    const options = { upsert: true };
    UserModel.updateOne(query, update, options);















   
        console.log(data);
    //try {
   

    res.status(200).json(data)
//     if(modelIfExist.toString()!=null)
//     {
//         const dataToSave = await data.save();
//         res.status(200).json(dataToSave)
//     }
//         res.status(200).json(modelIfExist)
//     }
//     catch (error) {
//         res.status(400).json({ message: error.message })
//     }
// 
})

module.exports = router;