<p align="center">
  <a href="https://www.youtube.com/watch?v=_Wlsd9mljiU">
    <img alt="<WE ARE WATCHING YOU>" src="http://i.imgur.com/YQp9oFY.png" style="width: 80% !important">
  </a>
</p>
    
<b>Skynet</b> is a Discord Bot based off discord.js. It's currently being developed by members of the MAL Central Club on MyAnimeList for their Discord Chat.

### Installation

**Requires node 0.12+**

`npm install --save discord.js`

---

### Example: ping-pong
```js
var Discord = require("discord.js");

var mybot = new Discord.Client();

mybot.on("message", function(message){
	if(message.content === "ping")
		mybot.reply(message, "pong");
});

mybot.login("email", "password");
```
---

### Contributing

Feel free to contribute! Just clone the repo and edit the files in the **src folder, not the lib folder.** 

Whenever you come to making a pull request, make sure it's to the *indev* branch and that you have built the lib files by running `grunt --dev`

---

### Links
**[Documentation](http://discordjs.readthedocs.org/en/latest/)**

**[GitHub](https://github.com/discord-js/discord.js)**

**[Wiki](https://github.com/discord-js/discord.js/wiki)**

**[Website](http://discord-js.github.io/)**

**[NPM](http://npmjs.com/package/discord.js)**

---
