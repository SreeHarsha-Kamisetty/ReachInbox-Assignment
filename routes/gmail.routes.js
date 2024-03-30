const express = require("express")
const axios = require("axios")
const { redisConnection } = require("../utils/redis.utils")
const { readMailAndAssignLabel } = require("../utils/openAI.utils")

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

GmailRouter.post("/createLabel/:userId",async(req,res)=>{
    try {
        let {userId} = req.params
        let access_token = await redisConnection.get(userId)
        
        let labelContent = req.body

        let response = await axios.post(`https://gmail.googleapis.com/gmail/v1/users/${userId}/labels`,labelContent,{
            headers:{
                "Content-Type" : "application/json",
                "Authorization" :`Bearer ${access_token}`
            }
        })

        res.status(200).json(response.data)
    } catch (error) {
        console.log(error)
        res.status(400).json({Error:"Error while creating new label"})
    }
})

GmailRouter.get("/list/:userId",async(req,res)=>{
    try {
        let {userId} = req.params
        let access_token = await redisConnection.get(userId)
        
        let response = await axios.get(`https://gmail.googleapis.com/gmail/v1/users/${userId}/messages`,{
            headers:{
                "Content-Type" : "application/json",
                "Authorization" :`Bearer ${access_token}`
            }
        })
       
        res.status(200).json(response.data)
    } catch (error) {
        console.log(error)
        res.status(400).json({Error:"Error while getting email list"})
    }
})

GmailRouter.get("/read/:userId/messages/:id",async(req,res)=>{
    try {
        let {userId,id} = req.params
        
        let access_token = await redisConnection.get(userId)
        
        let response = await axios.get(`https://gmail.googleapis.com/gmail/v1/users/${userId}/messages/${id}`,{
            headers:{
                "Content-Type" : "application/json",
                "Authorization" :`Bearer ${access_token}`
            }
        })
       readMailAndAssignLabel(response.data)
        res.status(200).json(response.data)
    } catch (error) {
        console.log(error)
        res.status(400).json({Error:"Error while reading message"})
    }
})

GmailRouter.get("/labels/:userId",async(req,res)=>{
    try {
        let {userId,id} = req.params
        
        let access_token = await redisConnection.get(userId)
        
        let response = await axios.get(`https://gmail.googleapis.com/gmail/v1/users/${userId}/labels`,{
            headers:{
                "Content-Type" : "application/json",
                "Authorization" :`Bearer ${access_token}`
            }
        })
       
        res.status(200).json(response.data)
    } catch (error) {
        console.log(error)
        res.status(400).json({Error:"Error while getting labels list"})
    }
})

GmailRouter.post("/addLabel/:userId/messages/:id",async(req,res)=>{
    try {
        let {userId,id} = req.params
        
        let access_token = await redisConnection.get(userId)
        
        let response = await axios.post(`https://gmail.googleapis.com/gmail/v1/users/${userId}/messages/${id}/modify`,req.body,{
            headers:{
                "Content-Type" : "application/json",
                "Authorization" :`Bearer ${access_token}`
            }
        })
       
        res.status(200).json(response.data)
    } catch (error) {
        console.log(error)
        res.status(400).json({Error:"Error while adding label to message"})
    }
})


module.exports={
    GmailRouter
}