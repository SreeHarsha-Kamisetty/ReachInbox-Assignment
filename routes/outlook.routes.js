const { ClientSecretCredential } = require("@azure/identity");
const { Client } = require("@microsoft/microsoft-graph-client");
require("dotenv").config()
const axios = require("axios")
global.fetch = axios;
// Configure credentials and Graph API client
const credentials = new ClientSecretCredential(
   process.env.AZURE_TENANTID,
   process.env.AZURE_CLIENT_ID,
  process.env.AZURE_CLIENT_SECRET
  
  
);
const graphClient = Client.initWithMiddleware({
  authProvider: credentials,
});

async function fetchEmails() {
  try {
    // Make API call to fetch emails
    const result = await graphClient
      .api("/me/messages")
      .select("subject,from,receivedDateTime")
      .top(10) // Number of emails to fetch (optional)
      .orderby("receivedDateTime desc") // Sort by received date (optional)
      .get();

    console.log("Emails:", result.value);
  } catch (error) {
    console.error("Error fetching emails:", error);
  }
}

fetchEmails();
