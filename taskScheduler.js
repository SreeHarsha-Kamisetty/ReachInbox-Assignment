const {Queue,Worker} = require("bullmq")
const Redis = require("ioredis");
const { readLabelAndReply } = require("./utils/openAI.utils");
const { mailUser } = require("./utils/generateRawMessage");
const { default: axios } = require("axios");
require("dotenv").config();


const connection = new Redis({
    port:process.env.REDIS_PORT,
    host:process.env.REDIS_HOST,
    password:process.env.REDIS_PASSWORD
},{maxRetriesPerRequest:null})

const sendReplyWorker = new Worker("reply",async(job)=>{
    try {
        
        let reply = await readLabelAndReply(job.data)

        
        let subject = reply[0].replace("Subject: ","");
        let content = reply[1].replace(": ","");
        let sender = job.data.userId;
        let recipient = "sreeharsha.kamisetty99@gmail.com"

        let rawMessage = mailUser(sender,recipient,subject,content)

        let response = await axios.post(`https://gmail.googleapis.com/gmail/v1/users/${sender}/messages/send`,{raw:rawMessage},{
            headers:{
                "Content-Type" : "application/json",
                "Authorization" :`Bearer ${job.data.access_token}`
            }
        })
        
    } catch (error) {
        console.log(error)
    }


},{connection})

sendReplyWorker.on("completed",(job)=>{
    console.log(job.name+" completed")
})

sendReplyWorker.on("failed",(job)=>{
    console.log(job.name+"failed");
})

