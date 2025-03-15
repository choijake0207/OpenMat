const {verify} = require("jsonwebtoken")
require("dotenv").config()

const tokenCheck = (req, res, next) => {
    const authorization = req.header("Authorization")
    if (!authorization || !authorization.startsWith("Bearer ")) {
        return res.status(401).json({error: "User Not Authenticated"})
    }
    const token = authorization.split(" ")[1]

    try {
        const validToken = verify(token, process.env.JWT_SECRET)
        if (validToken) {
            req.user = validToken
            return next()
        } else {
            return res.status(401).json({error: "Invalid Token"})
        }
    } catch (error) {
        return res.status(401).json({error: "Error Authenticating User"})
    }
}

module.exports = tokenCheck