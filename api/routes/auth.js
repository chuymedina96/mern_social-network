const express   = require("express");
const router    = express.Router()

// Importing controller functions or "handlers"
const { signUp, allUsers, signIn } = require("../handlers/auth")

router.post("/signup", signUp)

router.get("/allusers", allUsers)

router.post("/signin", signIn)

module.exports = router;