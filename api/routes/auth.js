const express = require("express");

const router = express.Router()

const { signUp }    = require("../handlers/auth")
const { allUsers }  = require("../handlers/auth")

router.post("/signup", signUp)

router.get("/allusers", allUsers)

module.exports = router;