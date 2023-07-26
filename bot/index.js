const { Client, Collection, Events, GatewayIntentBits } = require("discord.js");
const { token, port } = require("./config.json");
const { setupBot } = require("./utils/botSetup");
const {
  registerCommands,
  handleInteraction,
} = require("./utils/commandHandler");
const express = require("express");

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

setupBot(client);
registerCommands(client);

const app = express();

app.get("/", async (req, res) => {
  const client_id = "1124947743190814740"; 
  const client_secret = "";
  const redirect_uri = "http://localhost:8000/";
  const code = req.query.code;
  fetch("https://discord.com/api/oauth2/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: `client_id=${client_id}&client_secret=${client_secret}&grant_type=authorization_code&code=${code}&redirect_uri=${redirect_uri}`,
  })
    .then((response) => response.json())
    .then((data) => {
      const accessToken = data.access_token;

      // Fetch the user data from the Discord API using the access token
      fetch("https://discord.com/api/users/@me", {
        headers: {
          authorization: `Bearer ${accessToken}`,
        },
      })
        .then((result) => result.json())
        .then((response) => {
          const { username } = response;
          res.send(`Hello ${username}`);
        })
        .catch((error) => {
          console.error(error);
        });
    })
    .catch((error) => {
      console.error(error);
    });


});

app.listen(port, () =>
  console.log(`App listening at http://localhost:${port}`)
);

client.login(token);
