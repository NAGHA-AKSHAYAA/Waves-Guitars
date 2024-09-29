const { OK } = require('http-status');
const {authService} = require('../services')

const authController = {
    async register(req,res,next){
    try{
        const {email, password} = req.body;
        const user = await authService.creatUser(email, password)
        const token = await authService.genAuthToken(user)

        res.cookie('x-access-token',token).status(200).send({user,token})
    }
    catch(err) {
        console.log(err);
        next(err)
    }
    },
    async signin(req,res,next){
        try{
          const {email,password} = req.body
          const user = await authService.signInWithEmailAndPassword(email,password) 
          const token = await authService.genAuthToken(user)
          res.cookie('x-access-token',token).status(200).send({user,token})

        }catch(err){
            next(err)
        }
    },
    
    async isauth(req,res,next){
        try{
            console.log("inside function");
            res.json(req.user)
        }catch(err){

        }
    },
    async dog(req,res,next){
        try{
            console.log("inside function");
            res.json({"hello":"yes"})
        }catch(err){

        }
    }
}

module.exports = authController