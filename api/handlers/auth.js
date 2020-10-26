const db = require("../models") //index.js file in models

const jwt = require("jsonwebtoken");


//get all users 
exports.allUsers = async function(req, res, next){
    try{
        db.User.find({}, function (err, users) {
            res.send(users);
        });
    } catch(err){
        if(err.code){
            err.message = "Could not get all users"
        }
        return next({
            status: 400,
            message: err.message
        })
    }
}

exports.signIn = async function(req, res, next){
    // finding a user
    let user = db.User.findOne({
        email: req.body.email
    })
    let {id, username, profileImageUrl} = user
    let isMatch = await user.comparePassword(req.body.password)
    // checking if their password matches what was sent to the sever 
    // if it all matches
    // log them in

}

exports.signUp = async function(req, res, next){
    // create a user
        // create a token called signing a token
            // process.env.SECRET_KEY
    try {
        let user = await db.User.create(req.body)
        let { id, username, profileImageUrl } = user
        let token = jwt.sign({
            id, // with es6, if the keys are the same name as the values, then you just need to write id
            username,
            profileImageUrl
        },
            process.env.SECRET_KEY
        );
        return res.status(200).json({
            id,
            username,
            profileImageUrl,
            token
        }) 

    } catch (err) {
        if(err.code === 11000){
            err.message = "Sorry, that username and/or email is taken"
        }
        return next({
            status: 400,
            message: err.message
        })
        // see what kind of error
        // if it is a certain error
        // response with a username/email already taken
        // otherwise just send back a generic 400

    }
}