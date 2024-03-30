const {Queue,Worker} = require("bullmq")
const Redis = require("ioredis")
require("dotenv").config();
const connection = new Redis({
    port:process.env.REDIS_PORT,
    host:process.env.REDIS_HOST,
    password:process.env.REDIS_PASSWORD
},{maxRetriesPerRequest:null})

const sendReplyWorker = new Worker("reply",async(job)=>{
console.log(job.data);
},{connection})

sendReplyWorker.on("completed",(job)=>{
    console.log(job.name+"completed"+"info:"+job.data)
})

sendReplyWorker.on("failed",(job)=>{
    console.log(job.name+"failed");
})

