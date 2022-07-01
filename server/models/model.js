const mongoose = require('mongoose')

const User = new mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true},
    quote:{type:String}
},{ collection:'user-data'}
)
const UserModel = mongoose.model('UserData',User)

const Admin = new mongoose.Schema({
    name:{type:String},
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true},
},{ collection:'adminData'})

const AdminModel = mongoose.model('adminData',Admin)

module.exports = {UserModel,AdminModel}