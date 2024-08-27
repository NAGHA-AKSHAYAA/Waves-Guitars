const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const app = express();
const mongoose = require('mongoose');
require('dotenv').config();

mongoose.Promise = global.Promise;
mongoose.connect(process.env.DATABASE)

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(cookieParser());

//models
const {User} = require('./models/user'); 

// Users

app.get('/api/users/auth', (req,res)={
    
})
app.post('/api/users/register',(req,res)=>{
    const user = new User(req.body);

    const err =  user.save().then((result)=>{
        res.status(200).json({success:true,data:result});
    }).catch((err)=>{
        res.json({success:false,error:err});
    }) 
})

app.post('/api/users/login', async (req,res)=>{
    //find email
    try{
        const user = await User.findOne({'email':req.body.email})
        if(!user) return res.json({loginSuccess:false,message:'Ath fail, email deosnt exist'});

        user.comparePassword(req.body.password,(err,isMatch)=>{
            if(!isMatch) return res.json({loginSuccess:false, message:"Wrong password"});
    
            user.generateToken((err,user)=>{
                 if(err) return res.status(400).send(err);
                 res.cookie('w_auth',user.token).status(200).json({
                    loginSuccess: true
                 })
            })
        })
    }
    catch{
        res.status(400).json({loginSuccess:false, message: 'Error in login'})
    }
})

const port = process.env.PORT || 3002;

app.listen(port,()=>{
    console.log(`Server running at ${port}`);
})