const express = require('express');
const bodyParser = require('body-parser');
const xss = require('xss-clean')
const mongoSantize = require('express-mongo-sanitize')
const routes = require('./routes')
const cookieParser = require('cookie-parser');
const app = express();
const mongoose = require('mongoose')
const passport = require('passport')
const {jwtStatergy} = require('./middleware/passport')
require('dotenv').config()
const {handleError, convertToApiError} = require('./middleware/apiError')
const mongoUri = `mongodb+srv://admin:admin@cluster0.r4oazxw.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`
mongoose.connect(mongoUri);


//santize
app.use(xss());
app.use(mongoSantize());

//bodyparser
app.use(express.json());
app.use(cookieParser());

//passport
app.use(passport.initialize())
passport.use('jwt', jwtStatergy)

//routes
app.use('/api', routes)


app.use(convertToApiError)

app.use((err,req,res,next)=>{
    handleError(err,res)
})

const port = process.env.PORT || 3000;

app.listen(port,()=>{
    console.log(`Server running at ${port}`);
})