const { OK } = require('http-status');
const {authService, emailService} = require('../services');
const httpStatus = require('http-status');

const authController = {
    async register(req,res,next){
    try{
        const {email, password} = req.body;
        const user = await authService.creatUser(email, password)
        const token = await authService.genAuthToken(user)

        await emailService.registerEmail(email,user);
        res.cookie('x-access-token',token).status(httpStatus.CREATED).send({user,token})
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
    }
}

module.exports = authController