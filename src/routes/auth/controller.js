const controller = require("../controller");
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken");
const config = require("config");

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

})();