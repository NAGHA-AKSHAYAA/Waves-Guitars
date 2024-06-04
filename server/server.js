const express = require('express');
const app = express();
const mongoose = require('mongoose');
const xss = require('xss-clean');
const mongoSanitize = require('express-mongo-sanitize');
const routes = require('./routes')

app.use(express.json()); //alternative for bodyparser.

const mongoUri= `mongodb+srv://${process.env.DB_ADMIN}:${process.env.DB_PASS}@cluster0${process.env.DB_HOST}?retryWrites=true&w=majority&appName=Cluster0`



/// santize
app.use(xss());
app.use(mongoSanitize());


//routes
app.use('/api',routes)






const port = process.env.PORT || 3001
app.listen(port, ()=>{
    console.log(`Server Running on port ${port}`);
})