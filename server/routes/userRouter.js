const express = require("express")
const router = express.Router()
const {User} = require("../models")
const bcrypt = require("bcrypt")
const {sign} = require("jsonwebtoken")
require("dotenv").config()

router.post("/register", async (req, res) => {
   const {userData} = req.body
   try {
    // check if user exists
    const exists = await User.findOne({where: {
        email: userData.email
    }})
    if (exists) {
        return res.status(400).json({error: "An account with that email already exists"})
    }
    const hashedPassword = await bcrypt.hash(userData.password, 10)
    const newUser = await User.create({
        email: userData.email,
        firstName: userData.firstName,
        lastName: userData.lastName,
        password: hashedPassword,
        belt: userData.belt,
        affiliation: userData.affiliation ?? undefined,
        bio: userData.bio || null,
        pfp: userData.pfp || null,
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
        res.status(500).json({error: "There was an issue creating your account", error})
   }
})

module.exports = router