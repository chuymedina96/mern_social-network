require("dotenv").config() // loading all env variables
const express       = require("express")
const app           = express()
const bodyParser    = require("body-parser")
const cors          = require("cors") // for requests outside of domain
const errorHandler  = require("./handlers/error")

// Routes (/signin), (/api/users/:id/messages)
const authRoutes    = require("./routes/auth")
const messagesRoutes= require("./routes/messages")

const { loginRequired, ensureCorrectUser } = require("./middleware/auth")
const { json } = require("body-parser")

const db = require("./models")



const PORT = 8081;

app.use(cors())
app.use(bodyParser.json()) //Because we are building an API

// all routes here
app.use("/api/auth", authRoutes);

app.use("/api/users/:id/messages", loginRequired, ensureCorrectUser, messagesRoutes);

app.use("/api/messages", loginRequired, async function(req,res,next){
    try{
        let messages = await db.Message.find()
            .sort({ createdAt: "desc" })
            .populate("user", {
                username: true,
                profileImageUrl: true
            })
        return res.status(200).json(messages);
    } catch(err){
        return next(err)
    }
})


app.use(function(req,res,next){
    let err = new Error("Not Found")
    err.status = 404;
    next(err);
})

app.use(errorHandler);

app.listen(PORT, function(){
    console.log(`Server is starting on http://localhost:${PORT}`)
})


