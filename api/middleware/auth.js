require("dotenv").load();

const jwt = require("jsonwebtoken");

// make sure user is logged in
exports.loginRequired = function(req,res,next){
    const token = req.headers.authorization.split(" ")[1]; // Bearer <token>
}

// make sure we get the correct user - Authorization

