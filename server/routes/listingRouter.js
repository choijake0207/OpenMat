const express = require("express")
const router = express.Router()
const {User} = require("../models")
const bcrypt = require("bcrypt")
const multerUpload = require("../utils/multerUpload")
const tokenCheck = require("../utils/tokenCheck")
require("dotenv").config()


// create listing

    // if first listing => switch user role to pariticipant



module.exports = router