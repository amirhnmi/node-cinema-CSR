const controller = require("../controller");

module.exports = new (class extends controller{

    async dashboard(req,res){
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