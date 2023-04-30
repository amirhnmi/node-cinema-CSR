const controller = require("../controller");
const jwt = require("jsonwebtoken")

module.exports = new (class extends controller{

    async usertoken(req,res){

        const {_id, username, email, phone_number} = req.user
        this.response({
            res, message: "ok", data:{
                id: _id,
                username: username,
                email: email,
                phone_number: phone_number

            }
        })

    }


})();