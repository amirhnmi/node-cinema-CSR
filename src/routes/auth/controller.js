const controller = require("../controller");
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken");
const config = require("config");
const nodemailer = require('nodemailer');
const crypto = require('crypto');
const { mapReduce } = require("../../models/user");

module.exports = new (class extends controller{
    
    async register(req,res){
        let user = await this.User.findOne({email: req.body.email});
        if(user){
            return this.response({
                res, code:400, message: "the user already registered" 
            })
        }

        const {email, username, phone_number, password} = req.body;
        user = new this.User({
            email: email, 
            username: username, 
            phone_number: phone_number, 
            password: password
        });

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt)

        await user.save()

        this.response({
            res, message: "the user successfully registerd",
            data: {
                id: user._id,
                email: user.email,
                username: user.username,
                phone_number : user.phone_number
            }
        })

    }

    async login(req,res){
        let user = await this.User.findOne({email: req.body.email});
        if(!user){
            return this.response({
                res, code:400, message: "invalid email or password",
            })
        }

        const isValid= await bcrypt.compare(req.body.password, user.password);
        if(!isValid){
            return this.response({
                res, code:400, message: "invalid email or password"
            })
        }

        const token = jwt.sign({_id: user.id}, config.get("jwt_key"));
        this.response({
            res, message: "the user successfully logged in", data:{token}
        })   
    }

    async forgetPassword(req,res){
            const { email } = req.body;

        try {
            const user = await this.User.findOne({ email });

            if (!user) {
            return res.status(404).send('User not found');
            }

            const token = crypto.randomBytes(20).toString('hex');
            user.resetPasswordToken = token;
            user.resetPasswordExpires = Date.now() + 3600000; // 1 hour

            await user.save();

            const transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: "mr.arhnmi@gmail.com",
                pass: "ncxywemnbtswysad",
            },
            });

            const mailOptions = {
            to: email,
            subject: 'Password Reset Request',
            text: `Hi there,

            You recently requested to reset your password for our application. Click on the link below to reset it:

            http://localhost:3000/auth/login/password_reset/${token}

            If you did not request a password reset, please ignore this email.

            Thanks,
            The Application Team
                `,
                };

            await transporter.sendMail(mailOptions);

            res.status(200).send('Password reset email sent.');
        } catch (error) {
            console.error(error);
            res.status(500).send('Server error');
        }

    }

    async passwordReset(req,res){
        const { token, password } = req.body;

        try {
            const user = await this.User.findOne({ resetPasswordToken: token, resetPasswordExpires: { $gt: Date.now() } });

            if (!user) {
            return res.status(400).send('Password reset token is invalid or has expired');
            }

            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(password, salt)
            user.resetPasswordToken = undefined;
            user.resetPasswordExpires = undefined;
            
            await user.save();

            res.status(200).send('Password reset successful.');
        } catch (error) {
            console.error(error);
            res.status(500).send('Server error');
        }
        
    }

        
})();