require('dotenv').config()
require('./config/database').connect()
const User = require('./model/user')
const jwt = require("jsonwebtoken")
const express = require('express')
const bcrypt = require('bcryptjs/dist/bcrypt')
const app = express()

//กำหนดให้ สามารถรับค่ามาเป็น json 
app.use(express.json())

app.post('/register', async(req, res) => {

    try{

        const { first_name, last_name, email, password } = req.body
        // check require
        if(!(first_name && last_name && email && password)){
            return res.status(400).send('All input')
        }
        
        //check if user already exist
        const oldUser = await User.findOne({email:email})
        if(oldUser) return res.status(409).send('User alreay exist')

        encrypPassword = await bcrypt.hash(password, 10)
        const user = await User.create({
            first_name,
            last_name,
            email:email,
            password:encrypPassword
        })

        //generate token
        const token = jwt.sign(
            {user_id:user._id, email },
            process.env.TOKEN_KEY,
            {
                expiresIn:"2h"
            }
        )

        // save token
        user.token = token

        res.status(201).json(user)
    }catch(err) {
        console.log(err);
    }
    



})
module.exports = app;
