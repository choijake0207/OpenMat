const express = require("express")
const http = require("http")
const cors = require("cors")
const {Server} = require("socket.io")
const db = require("./models")

const app = express()
app.use(cors())
app.use(express.json())

// app and socket shared server
const server = http.createServer(app)
const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173/",
        methods: ["GET, POST"]
    }
})


// router mounts
const userRouter = require("./routes/userRouter")
app.use("/user", userRouter)
const listingRouter = require("./routes/listingRouter")
app.use("/listing", listingRouter)




// socket set up goes here

db.sequelize.sync().then(() => {
    server.listen(3005, () => {
        console.log("server listening to port 3005")
    })    
})



