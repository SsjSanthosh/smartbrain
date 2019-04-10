const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const bcrypt = require("bcrypt-nodejs")
const cors = require("cors")
const knex = require("knex")
const register = require("./controllers/Register.js")
const signin = require("./controllers/Signin")
const profile = require('./controllers/Profile')
const image = require('./controllers/Image')
app.use(bodyParser.json())
app.use(cors())

const db=knex({
    client: 'pg',
    connection: {
      host : '127.0.0.1',
      user : 'postgres',
      password : 'super2409',
      database : 'smartypants'
    }
  });





app.get('/',(req,res)=>{
    
    res.json(database.users)
})
// SIGN IN ROUTE

app.post('/signin',(req,res)=>{signin.handleSignin(req,res,db,bcrypt)})
   
// REGISTER ROUTE
app.post('/register',(req,res)=>
    {
        register.handleRegister(req,res,db,bcrypt)
    });

// PROFILE ROUTE

app.get("/profile/:id",(req,res)=>{profile.handleProfile(req,res,db)})

// POST IMAGE

app.put('/image',(req,res)=>{
    image.handleImage(req,res,db)
})





app.listen(3000,()=>{
    console.log("running")
})