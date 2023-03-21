const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const databaseconnetion=require('./config/dbconnection')
const cors=require("cors")

const  authRoute= require('./routes/authRoute');
const adminRoute = require('./routes/AdminRoute')


const app = express();
 app.use(
  cors({
    origin:["http://localhost:3005"],
    methods:["GET","POST"],
    credentials:true
  })
 )

databaseconnetion.dbConnect()
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', authRoute);
app.use('/admin',adminRoute)



module.exports = app;
