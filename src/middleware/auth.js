const User = require("../models/user");
const jwt = require("jsonwebtoken");
const config = require("config");

async function isLoggedIn(req,res,next){
    const token = req.body.token;
    if(!token) res.status(401).send("token is not defind");

    try {
        const decodedToken = jwt.verify(token, config.get("jwt_key"));
        let user = await User.findById(decodedToken._id);
        req.user = user;
        next();
    } catch (ex) {
        res.status(400).send("invalid token")
    }

}
async function isAdmin(req,res,next){
    if(!req.user.isadmin) {
        return res.status(403).send("you are not admin")
    }
    next()
}

const isAuthenticate = (req, res, next) => {
    if (req.session && req.session.user) {
      // User is authenticated, so continue to the next middleware function
      res.redirect('/auth/login');
    } else {
      // User is not authenticated, so redirect to the login page
      next();
    }
  };


module.exports = {
    isLoggedIn,
    isAdmin,
    isAuthenticate
}