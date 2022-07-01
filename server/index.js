const express = require('express')
const app =  express()
const cors = require('cors')
const mongoose = require('mongoose')
const User = require('./models/model').UserModel
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt');
const adminRouter=require('./routes/admin')
const userRouter=require('./routes/user')

app.use(cors())
app.use(express.json()) //to parse the body(req) to json
app.use('/api/admin', adminRouter);
app.use('/api/', userRouter);
mongoose.connect('mongodb://localhost:27017/App')

app.listen(1337,()=>{
    console.log('Server started on Port 1337');
})