require("dotenv").config() // loading all env variables
const express       = require("express")
const app           = express()
const bodyParser    = require("body-parser")
const cors          = require("cors")
const errorHandler  = require("./handlers/error")


const PORT = 8081;

app.use(cors())
app.use(bodyParser.json()) //Because we are building an API

// all routes here

app.use(function(req,res,next){
    let err = new Error("Not Found")
    err.status = 404;
    next(err);
})

app.use(errorHandler);

app.listen(PORT, function(){
    console.log(`Server is starting on http://localhost:${PORT}`)
})


