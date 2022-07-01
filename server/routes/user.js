const router=require('express').Router()
const {UserModel}=require('../models/model')
const bcrypt=require('bcrypt')
const jwt = require('jsonwebtoken')

router.post('/register',async(req,res)=>{
    console.log(req.body)
    try{
        const user =await UserModel.create({
            name:req.body.name,
            email:req.body.email,
            password:await bcrypt.hash(req.body.password, 10)
        })
        res.json({status:'Ok'})
    }catch(err){
    res.json({status:'error',error:'Duplicate email'})
    }
       
    })

router.post('/login',async(req,res)=>{
    console.log(req.body)
     const user = await UserModel.findOne({
            email:req.body.email,
        })
        if(user){
            console.log('ok');
            const userStatus= await bcrypt.compare(req.body.password, user.password)
        
       if(userStatus){
           const token = jwt.sign(
          {
            email:user.email,
            name:user.name
           },
           'secret123456')
         
          return res.json({status:'ok',user:token})
       }else{
        return res.json({status:'error',user:false})
       }
        }else{
            return res.json({status:'error',user:false})
        }
       
    })
    router.get('/',async(req,res)=>{
        const token = req.headers['x-access-token']
        try{
        const decoded = jwt.verify(token,'secret123456')
        const email = decoded.email
        console.log(email);
        let user = await UserModel.findOne({email:email})
        console.log(user);
        return res.json({status:'ok',quote:user.quote})
        
     }catch(err){
         console.log(err)
         res.json({status:'error',error :'invalid token'})
     }
    
    })
    router.post('/quote',async(req,res)=>{
        const token = req.headers['x-access-token']
        try{
        const decoded = jwt.verify(token,'secret123456')
        const email = decoded.email
        await UserModel.updateOne(
            {email:email},
            {$set:{quote:req.body.quote}})
        return res.json({status:'ok'})
        
     }catch(err){
         res.json({status:'error',error :'invalid token'})
     }
    
    })

module.exports=router