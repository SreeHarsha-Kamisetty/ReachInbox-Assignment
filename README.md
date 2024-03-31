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
- POST /gmail/createLabel/:userId
    - To create custom labels for user
    - Request body contains the Label details
```json
{
    "name": "More Information",
    "messageListVisibility": "show",
    "labelListVisibility": "labelShow",
    "color":{
        "textColor": "#3c78d8",
        "backgroundColor": "#000000"
    }
}
```
- GET /gmail/list/:userId
  - To get list of emails of a user
  - Example:
```json
GET /gmail/list/kamisetty.sreeharsha99@gmail.com

Response:
{
    "messages": [
        {
            "id": "18e94c1ee9a46c66",
            "threadId": "18e94c129920d4ff"
        },
        {
            "id": "18e94c1579b51186",
            "threadId": "18e94c129920d4ff"
        },
        {
            "id": "18e945faa9cb1c9d",
            "threadId": "18e945faa9cb1c9d"
        },
        {
            "id": "18e944aab143c67e",
            "threadId": "18e944aab143c67e"
        },
        {
            "id": "18e94483145281bf",
            "threadId": "18e92a796487249a"
        }
  ]
}
```

