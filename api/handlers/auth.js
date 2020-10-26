const db = require("../models") //index.js file in models

const jwt = require("jsonwebtoken");

exports.signIn = function(){

}

exports.signUp = async function(req, res, next){
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
        return response.status(200).json({
            id,
            username,
            profileImageUrl,
            token
        }) 
        // create a user
        // create a token called signing a token
            // process.env.SECRET_KEY

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