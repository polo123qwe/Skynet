var Discord = require('discord.js');
var Commands = require('./Commands.js');
var Ranks = require('./Ranks.js');
var Members = require('./Member.js');
var data = require('./data.js');
var prompt = require("prompt")

var data = new data();
var mybot = new Discord.Client();
var cmds = data.cmdStartup();
// var ranks = data.rankStartup();
// var members = new Members();

var defaultCommands = data.getDefaultCommands();
var password = undefined
var listOfRoles = 

// On Ready
mybot.on("ready", function(){
	// members.addMember("131905565466034176", ["Admin"]);
	// members.addMember("112947635555463168", ["Admin"]);
	console.log('<Skynet> ready to operate!');
	// mybot.sendMessage("132490115137142784", "<@"+botID+"> is ready to operate.")
});

// On Message
mybot.on("message", function(message){
	var splitted = message.content.split(" ");
	var command = splitted[0];
	var func = cmds.get(command);

	if(func != null){
		// var rankArray = members.getRank(message.author.id);
		//gets all roles
		var roles = message.channel.server.rolesOfUser(message.author)
		console.log("Recieved cmd ["+message.content+"] by ["+message.author.username+", "+message.channel.server.name+", #"+message.channel.name+"]")

		var result = func(message, splitted, roles, mybot);
		// the or operator handles errors
		mybot.sendMessage(message.channel, result ||
			"CMD ["+message.content+"] by ["+message.author.mention()+", "+message.channel.server.name+", <#"+message.channel.id+">] denied.")

		// if(rankArray != null){
			// for(var i = 0; i < rankArray.length; i++){
			// 	if(ranks.canDo(rankArray[i], command)){
					// mybot.sendMessage(message.channel, func(message, splitted));
			// 		break;
			// 	}
			// 	console.log("CMD ["+message.content+"] denied.")
			// 	mybot.sendMessage(message.channel, "CMD by "+message.author.mention()+", ["+message.content+"] denied.")
			// }
		// }
	}
});

// We need another system for this
// mybot.on("serverNewMember", function(server, user){
// 	members.addMember(user.id, defaultCommands);
// });

// Ugly block of code. Ignore
// prompt.start();

// prompt.get(['password'], function (err, result) {
// 	if (err) { return onErr(err); }
// 	password = result.password;
// });

// // function onErr(err) {
// // 	console.log(err);
// // 	return 1;
// // }

mybot.login("bernausergi@gmail.com", "animeDiscord");