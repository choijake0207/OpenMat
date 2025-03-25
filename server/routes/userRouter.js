const express = require("express")
const router = express.Router()
const {User} = require("../models")
const bcrypt = require("bcrypt")
const {sign} = require("jsonwebtoken")
const multerUpload = require("../utils/multerUpload")
const tokenCheck = require("../utils/tokenCheck")
require("dotenv").config()



// User Register
router.post("/register", multerUpload("pfp").single("pfp"), async (req, res) => {
   try {
    const {email, password, firstName, lastName, belt, affiliation, bio} = req.body
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
            firstName: newUser.firstName,
            lastName: newUser.lastName,
            affiliation: newUser.affiliation,
            belt: newUser.belt,
            pfp: newUser.pfp
        }
    })
   } catch (error) {
        console.error(error)
        res.status(500).json({error: "There was an issue creating your account"}, error)
   }
})


// User Login
router.post("/login", async(req, res) => {
    try {
        const {email, password} = req.body
        const exists = await User.findOne({
            where: {
                email: email
            },
            attributes: ["role", "firstName", "id", "password"]
        })
        if (!exists) {
            return res.status(404).json({error: "Email Not Found"})
        }
        const match = await bcrypt.compare(password, exists.password)
        if (!match) {
            return res.status(401).json({error: "Incorrect email and password combination"})
        }
        const accessToken = sign({
            id: exists.id,
            firstName: exists.firstName,
        }, process.env.JWT_SECRET)
        res.json({
            message: "Logged In Succesfully",
            user: {
                role: exists.role,
                id: exists.id,
                firstName: exists.firstName,
                lastName: exists.lastName,
                affiliation: exists.affiliation,
                belt: exists.belt,
                pfp: exists.pfp
            },
            accessToken: accessToken
        })
    } catch (error) {
        console.error(error)
        res.status(500).json({error: "There was an error logging in"}, error)
    }
})


// Auth Persist
router.get("/authorize", tokenCheck, async(req, res) => {
    try {
        const user = await User.findOne({
            where: {
                id: req.user.id
            },
            attributes: ["role", "id", "firstName", "lastName", "affiliation", "belt", "pfp"]
        })
        if (!user) {
            return res.status(404).json({error: "Account Does Not Exist"})
        }
        res.json(user)
    } catch (error) {
        console.error(error)
        res.status(500).json({error: "Error Authetnicating User"}, error)
    }
})


// User Profile 
router.get("/profile/:id", async(req, res) => {
    try {
        const {id} = req.params
        const user = await User.findOne({
            where: {
                id: id
            },
            attributes: ["id", "email", "firstName", "lastName", "belt", "affiliation", "role", "bio", "pfp"]
        })
        if (!user) {
            return res.status(404).json({error: "User Does Not Exist"})
        }
        res.json(user)
    } catch (error) {
        console.error(error) 
        res.status(500).json({error: "Error Fetching User Profile"}, error)
    }
})




module.exports = router