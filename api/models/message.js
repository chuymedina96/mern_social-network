const mongoose = require("mongoose")

const bcrypt = require("bcrypt")

const User = require("./user")

const messageSchema = new mongoose.Schema({
    message: {
        type: String,
        maxLength: 160,
        required: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId, // just an object id or unique identifier for a user
        ref: "User" // direct reference to the user model
    }
})

messageSchema.pre("remove", async function(next){
    try {
        let user = await User.findById(this.user)
        user.messages.remove(this.id)

        await user.save()
        return next();

    } catch(err){   
        return next(err);
    }

})



const Message = mongoose.model("Message", messageSchema)

module.exports = Message;