const mongoose = require("mongoose")

const bcrypt = require("bcrypt")

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true // unique email on db
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    profileImageUrl: {
        type: String
    },
    messages: [{ // message under a user is an array of objects
        type: mongoose.Schema.Types.ObjectId,
        ref: "Message"
    }]
})

userSchema.pre("save", async function(next){
    try {
        if(!this.isModified("password")){
            return next()
        }
        let hashedPassword= await bcrypt.hash(this.password, 10); // Salt or work factor? Salting taking additional info and putting it into the hash so the hashes are different for the same password. Because Hackers can build a table that can solve what hash corresponds to a password.
        this.password = hashedPassword;
        return next()
    } catch (err) {
        return next(err);
    }
});

userSchema.methods.comparePassword = async function(candidatePassword, next){
    try{
        let isMatch = await bcrypt.compare(candidatePassword, this.password)
        return isMatch;
    } catch{
        return next(err);
    }
}



const User = mongoose.model("User", userSchema)


module.exports = User;