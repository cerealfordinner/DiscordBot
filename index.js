const Discord = require("discord.js");
const { Client, Intents } = require("discord.js");
const client = new Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
});
const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));
const mySecret = process.env["TOKEN"];

function getQuote() {
  return fetch("https://zenquotes.io/api/random")
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      return data[0]["q"] + " - " + data[0]["a"];
    });
}

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on("message", (msg) => {
  if (msg.author.bot) return;

  if (msg.content === "$inspire") {
    getQuote().then((quote) => msg.channel.send(quote));
  }
});

client.login();
