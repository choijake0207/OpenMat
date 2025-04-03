const express = require("express")
const router = express.Router()
const {User} = require("../models")
const bcrypt = require("bcrypt")
const multerUpload = require("../utils/multerUpload")
const tokenCheck = require("../utils/tokenCheck")
const {Listing} = require("../models")
require("dotenv").config()


// create listing
router.post("/create", tokenCheck, multerUpload("listingImages").array("images", 10), async (req, res) => {
    try {
        const {title, coordinates, address, type, description, scheduleType, scheduleList} = req.body
        // find user
        const userId = req.user.id
        const user = await User.findOne({where: {
            id: userId
        }})
        if (!user) {
            return res.status(401).json({error: "You Must Be Logged In To Perform This Action"})
        }
        // if first listing => switch user role to pariticipant
        if (user.role === "participant") {
            user.role = "host"
            await user.save()
        }
        // extract images urls
        const imageURLs = req.files.map(file => file.path)
        // parse objects to nums
        const parsedCoords = JSON.parse(coordinates)
        const lat = parseFloat(parsedCoords.lat)
        const lon = parseFloat(parsedCoords.lon)
        const parsedAddress = JSON.parse(address)
        const parsedScheduleList = JSON.parse(scheduleList)
      
        const newListing = await Listing.create({
            title: title,
            // geo point stored lon, lat in sql
            coordinates: {
                type: "Point",
                coordinates: [lon, lat]
            },
            address: parsedAddress,
            type: type,
            images: imageURLs,
            description: description,
            scheduleType: scheduleType,
            scheduleList: parsedScheduleList,
            userId: userId
        })
        res.json({
            message: "Listing Succesfully Published",
            listingId: newListing.id
        })
    } catch (error) {
        console.error(error)
        res.status(500).json({error: "There was an issue publishing your listing"})
    }
})




module.exports = router