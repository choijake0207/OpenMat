const express = require("express")
const router = express.Router()
const {User} = require("../models")
const bcrypt = require("bcrypt")
const {sign} = require("jsonwebtoken")
const multerUpload = require("../utils/multerUpload")
require("dotenv").config()

router.post("/register", multerUpload("pfp").single("pfp"), async (req, res) => {
   try {
    const {email, password, firstName, lastName, belt, affiliation, bio} = req.body
    // check if user exists
    const exists = await User.findOne({where: {
        email: email
    }})
    if (exists) {
        return res.status(400).json({error: "An account with that email already exists"})
    }
    const pfpURL = req.file ? req.file.path : null
    const hashedPassword = await bcrypt.hash(password, 10)
    const newUser = await User.create({
        email: email,
        firstName: firstName,
        lastName: lastName,
        password: hashedPassword,
        belt: belt,
        affiliation: affiliation ?? undefined,
        bio: bio || null,
        pfp: pfpURL,
        role: "participant"
    })
    const accessToken = sign({
        id: newUser.id, 
        firstName: newUser.firstName
    }, process.env.JWT_SECRET)

    res.json({
        message: "Account Successfully Created",
        accessToken: accessToken,
        user: {
            role: newUser.role,
            id: newUser.id,
            firstName: newUser.firstName
        }
    })
   } catch (error) {
        console.error(error)
        res.status(500).json({error: "There was an issue creating your account"}, error)
   }
})

module.exports = router