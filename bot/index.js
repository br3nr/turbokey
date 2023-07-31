const { Client, Collection, Events, GatewayIntentBits } = require("discord.js");
const { token, port } = require("./config.json");
const { setupBot } = require("./utils/botSetup");
const {
  registerCommands,
  handleInteraction,
} = require("./utils/commandHandler");
const express = require("express");
const session = require("express-session");
const cookieParser = require("cookie-parser");

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

setupBot(client);
registerCommands(client);

var app = express();
app.set("trust proxy", 1); // trust first proxy
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false, httpOnly: true },
  })
);

app.get("/login", (req, res) => {
  req.session.userId;
  res.send("Logged in successfully");
});

app.get("/checkSession", function (req, res) {
  // print every cookie in the session containing userID
  console.log(req.session.userId);
  res.send("Session checked, username is " + req.session.userId);

});

app.get("/", async (req, res) => {
  const client_id = "1124947743190814740";
  const client_secret = "CLrp3rcoGpHgNgLxglk4CQDmr3EHInfu";
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
          req.session.userId = username;
          res.cookie("username", username);
          res.redirect(`http://localhost:3000/profile`);
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
