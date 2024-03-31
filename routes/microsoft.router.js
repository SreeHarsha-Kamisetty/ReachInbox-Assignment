const express = require("express")


const MicrosoftRouter = express.Router()


const { PublicClientApplication, ConfidentialClientApplication } = require('@azure/msal-node');
const  axios  = require("axios");
require("dotenv").config()
const app = express();

// MSAL configuration
const config = {
  auth: {
    clientId: process.env.AZURE_CLIENT_ID, // Replace with your Azure AD application's client ID
    authority: 'https://login.microsoftonline.com/c44d887d-a123-4046-a209-47f50ee2d45d', // Replace with your Azure AD tenant ID
    clientSecret: process.env.AZURE_CLIENT_SECRET, // Replace with your Azure AD application's client secret (value not id)
  },
};

const pca = new ConfidentialClientApplication(config);

// Route to start the MS authentication flow
MicrosoftRouter.get('/auth', async (req, res) => {
    const authCodeUrlParameters = {
        scopes: ['openid', 'profile', 'offline_access', 'Mail.Read', 'Mail.ReadWrite', 'Mail.Send'],
        redirectUri: 'http://localhost:8080/microsoft/auth/callback',
      };
      

  try {
    // Get the authorization URL to redirect the user
    const authCodeUrl = await pca.getAuthCodeUrl(authCodeUrlParameters);
    res.redirect(authCodeUrl);
  } catch (error) {
    console.error('Error generating auth code URL:', error);
    res.status(500).send('Error generating auth code URL');
  }
});

// Route to handle the callback after MS authentication
MicrosoftRouter.get('/auth/callback', async (req, res) => {
  const tokenRequest = {
    code: req.query.code,
    scopes:['openid', 'profile', 'offline_access', 'Mail.Read', 'Mail.ReadWrite', 'Mail.Send','user.read'], // Specify the same scopes as used during authorization
    redirectUri: 'http://localhost:8080/microsoft/auth/callback', // The same redirect URI used in the authorization URL
  };

  try {
    // Exchange the authorization code for an access token
    const response = await pca.acquireTokenByCode(tokenRequest);
    const accessToken = response.accessToken;
    console.log(accessToken)
    // Use the access token to make requests to MS Graph API or other protected resources
    // For example:
    const userProfile = await axios('https://graph.microsoft.com/v1.0/me', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const userData = await userProfile.json();
    console.log('User data:', userData);

    res.send('Authentication successful');
  } catch (error) {
    // console.error('Error acquiring access token:', error);
    res.status(500).send(error);
  }
});

module.exports={
    MicrosoftRouter
}