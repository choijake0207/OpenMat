const express = require("express")
const router = express.Router()
const {User} = require("../models")
const bcrypt = require("bcrypt")

router.post("/register", async (req, res) => {
   const {userData} = req.body
   console.log(userData)
   try {
    // check if user exists
    const exists = await User.findOne({where: {
        email: userData.email
    }})
    if (exists) {
        return res.status(400).json({error: "An account with that email already exists"})
    }
    console.log("no existing")
    const hashedPassword = await bcrypt.hash(userData.password, 10)
    console.log("hashed")
    const newUser = await User.create({
        email: userData.email,
        firstName: userData.firstName,
        lastName: userData.lastName,
        password: hashedPassword,
        belt: userData.belt ?? undefined,
        affiliation: userData.affiliation ?? undefined,
        bio: userData.bio || null,
        location: userData.location,
        pfp: userData.pfp || null,
    })
    console.log("created")
    res.json({
        message: "Account Successfully Created",
        user: newUser
    })
   } catch (error) {
        console.error(error)
        res.status(500).json({error: "There was an issue creating your account"})
   }
})

module.exports = router