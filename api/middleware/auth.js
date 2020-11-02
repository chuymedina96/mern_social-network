require("dotenv").config()

const jwt = require("jsonwebtoken");

// make sure user is logged in
// make sure we get the correct user - Authentication

exports.loginRequired = function(req,res,next){
    try {
        const token = req.headers.authorization.split(" ")[1]; // Bearer <token>
        jwt.verify(token, process.env.SECRET_KEY, function(err, decoded){
            if(decoded){
                return next();
            }
            else{
                return next({
                    status: 400,
                    message: "Please log in first"
                })
            }
        })
    } catch(e){
        return next({
            status: 400,
            message: "Please log in first"
        })
    }

}


// make sure we get the correct user - Authorization

exports.ensureCorrectUser = function(req, res, next){
    try {
        const token = req.headers.authorization.split(" ")[1]; 
        jwt.verify(token, process.env.SECRET_KEY, function(err, decoded){
            if(decoded && decoded.id === req.params.id){
                return next();
            } else{
                return next({
                    status: 400,
                    message: "You are logged in, but not authorized to do this action!"
                })
            }
        });
    } catch(err) {
        return next({
            status: 401,
            message: "Unauthorized"
        })
    }
}

