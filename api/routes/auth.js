const express = require("express");

const router = express.Router()

const { signUp } = require("../handlers/auth")

router.post("/signup", signUp)

module.exports = router;