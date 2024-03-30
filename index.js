const express = require("express")
const cors = require("cors")
const path = require("path")



const app = express();
app.use(express.json())
app.use(cors())


app.get("/",(req,res)=>{
    res.sendFile(path.join(__dirname,"index.html"))
})



app.listen(8080,()=>{
    console.log(`Server is running at http://localhost:8080`)
} )