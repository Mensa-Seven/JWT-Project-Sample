require('dotenv').config()
require('./config/database').connect()

const express = require('express')
const app = express()
//กำหนดให้ สามารถรับค่ามาเป็น json 
app.use(express.json())

module.exports = app;
