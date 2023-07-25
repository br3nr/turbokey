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

app.get("/", (request, response) => {
  return response.sendFile("index.html", { root: "." });
});

app.listen(port, () =>
  console.log(`App listening at http://localhost:${port}`)
);

client.login(token);
