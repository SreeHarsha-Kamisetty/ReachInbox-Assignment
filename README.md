# Project Overview
  The aim of this project is to setup google and microsoft oauth to gain access to user emails. Assigning labels after reading the email context and dividing them into three categories "Interested", "Not interested" and "More information" using openAI. After assigning labels to emails, send automated emails to the user according the label
with the help of openai.

## Technologies used:
- Nodejs
- Expressjs
- openai API

## npm packages used:
- express
- cors
- dotenv
- googleapis
- ioredis
- axios
- bullmq
- openai
- @azure/msal-node

## API Endpoints:

### Google

- GET /google/auth
  - To start google oauth process and authenticate users
- GET /gmail/userInfo/:userId
  - To get details of authenticated user
  - Example:
```json
GET /gmail/userInfo/kamisetty.sreeharsha99@gmail.com
Response:
{
    "emailAddress": "kamisetty.sreeharsha99@gmail.com",
    "messagesTotal": 58,
    "threadsTotal": 40,
    "historyId": "7202"
}
```
