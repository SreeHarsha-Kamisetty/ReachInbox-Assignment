const express = require("express")
const axios = require("axios")
const { redisConnection } = require("../utils/redis.utils")

const GmailRouter = express.Router()

GmailRouter.get("/userInfo/:userId",async(req,res)=>{
    try {
        let {userId} = req.params
        let access_token = await redisConnection.get(userId)

        let response = await axios.get(`https://gmail.googleapis.com/gmail/v1/users/${userId}/profile`,{
            headers:{
                "Content-Type" : "application/json",
                "Authorization" :`Bearer ${access_token}`
            }
        })
       
        res.status(200).json(response.data)
    } catch (error) {
        console.log(error)
        res.status(400).json({Error:"Error while getting user data"})
    }
})





module.exports={
    GmailRouter
}