const router=require('express').Router()
const {UserModel,AdminModel}=require('../models/model')
const bcrypt=require('bcrypt')
const jwt = require('jsonwebtoken')


router.post('/',async(req,res)=>{
    console.log(req.body)
    const admin=await AdminModel.findOne({
        email:req.body.email
    })
    if(admin){
        console.log('admintrue');
        const adminStatus = await bcrypt.compare(req.body.password,admin.password)
    
    if(adminStatus){
        const admintoken = jwt.sign(
            {
                email:admin.email
            },
            'secret123456')
            return res.json({status:'ok',admin:admintoken})
    }else{
        return res.json({status:'error',admin:false})
    }
    }else{
        return res.json({status:'error',admin:false})
    }
})
router.get('/dashboard',async(req,res)=>{
    try{
const users = await UserModel.find({})
return res.json({status:'ok',users})
    }catch(err){
        console.log(err);
    }
})

router.post('/addUser',async(req,res)=>{
    console.log(req.body);
    
    try{
const response = await UserModel.create({
    name:req.body.name,
    email:req.body.email,
    password:await bcrypt.hash(req.body.password,10)
})
return res.json({status:'ok'})
    }catch(err){
        res.json({status:'error',error:'Duplicate email'})
    }
})

router.delete('/deleteUser',async(req,res)=>{
    try{
        const userId = req.headers.userid
const response = await UserModel.deleteOne({
   _id:userId
})
return res.json({status:'ok'})
    }catch(err){
return res.json({status:'error'})
    }
})

router.post('/editUser',async(req,res)=>{
    try{
        const userId = req.headers.userid
                const response = await UserModel.updateOne(
                    {_id:userId},
                    {$set:{
                        name:req.body.name,
                        email:req.body.email,
                        quote:req.body.quote
                    }})
return res.json({status:'ok'})
    }catch(err){
        return res.json({status:'error'})
    }
})

module.exports=router