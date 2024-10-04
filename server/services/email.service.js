const nodemailer = require('nodemailer');
const Mailgrn = require('mailgen');
const Mailgen = require('mailgen');
require('dotenv').config();

let transporter = nodemailer.createTransport({
    service:"Gmail",
    secure:true,
    auth:{
        user: process.env.EMAIL,
        pass:process.env.EMAIL_PASSWORD
    }
});

const registerEmail = async(useremail,user) =>{
    try {
        const emailToken = user.generateRegisterToken();

        let mailGenerator= new Mailgen({
            theme:"default",
            product:{
                name:"Waves Guitars",
                link:`${process.env.EMAIL_MAIL_URL}`
            }
        })

        const email = {
            body:{
                name:useremail,
                intro:'Wecome to waves, excited to have you onboard!',
                action:{
                    instructions: 'To validate your account, please click here',
                    button:{
                        color: '#22BC66', // Optional action button color
                        text: 'Confirm your account',
                        link: `${process.env.EMAIL_MAIL_URL}verification?T=${emailToken}`
                    },
                    outro:'Need help, or help, Please reach out to us'

                }
            }
        }

        let emailBody = mailGenerator.generate(email)
        let message = {
            from: process.env.EMAIL,
            to: useremail,
            subject: "Welcome to waves",
            html:emailBody
        }

        await transporter.sendMail(message)
        return true


    } catch (error) {
        throw error
    }
}



module.exports = {registerEmail}