const openAI = require("openai")
require("dotenv").config()

const openai = new openAI({
    apiKey:process.env.OPENAI_APIKEY
})


const readMailAndAssignLabel = async(data)=>{
    try {
        console.log(data.snippet)
        
        const chatCompletion = await openai.chat.completions.create({
            messages:[{role:'assistant',content:`I will pass in an email reply based on the content decide the label for the content as "Interested","Not Interested" and "More Information". If the reply is positive label it as interested if it is negative label it as not interested if user needs more information label it as more information, This is the reply ${data.snippet}`,
        }],
        model: 'gpt-3.5-turbo'
        })
        let content = await chatCompletion.choices[0].message.content
        console.log(content);
    } catch (error) {
        console.log(error)
    }
}

const readMailAndReply = async(data) =>{
    try {
        console.log(data.snippet)
        const chatCompletion = await openai.chat.completions.create({
            messages:[{role:'assistant',content:`I will pass in an email reply based on the content decide the label for the content as "Interested","Not Interested" and "More Information". If the reply is positive label it as interested if it is negative label it as not interested if user needs more information label it as more information, This is the reply ${data.snippet}. Now according to the label send a reply. if user is interested or need more information send a mail asking if they are available to schedule a demo call. If user is not interested ask them if they need more information or any other reasons that they are not interested in the product.`,
        }],
        model: 'gpt-3.5-turbo'
        })
        let content = await chatCompletion.choices[0].message.content
        console.log(content);
    } catch (error) {
        console.log(error)
    }
}
module.exports={
    readMailAndAssignLabel,readMailAndReply
}