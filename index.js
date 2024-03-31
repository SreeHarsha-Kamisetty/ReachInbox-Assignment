const express = require("express")
const cors = require("cors")
const path = require("path");
const { GoogleRouter } = require("./routes/google.routes");
const { GmailRouter } = require("./routes/gmail.routes");
const { MicrosoftRouter } = require("./routes/microsoft.router");



const app = express();
app.use(express.json())
app.use(cors())

// Google oauth
app.use("/google",GoogleRouter)

// Gmail routes
app.use("/gmail",GmailRouter)

// MS Oauth

app.use("/microsoft",MicrosoftRouter)

app.get("/",(req,res)=>{
    res.sendFile(path.join(__dirname,"index.html"))
})



app.listen(8080,()=>{
    console.log(`Server is running at http://localhost:8080`)
} )