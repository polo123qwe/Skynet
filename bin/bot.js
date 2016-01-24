var Discord = require('discord.js');
var Commands = require('./Commands.js');
var Ranks = require('./Ranks.js');
var Members = require('./Member.js');
var data = require('./data.js');

var data = new data();
var mybot = new Discord.Client();
var cmds = data.cmdStartup();
var ranks = data.rankStartup();
var members = new Members();

var defaultCommands = data.getDefaultCommands();

mybot.on("ready", function(){
	members.addMember("131905565466034176", ["Admin"]);
	members.addMember("112947635555463168", ["Admin"]);
});

mybot.on("message", function(message){

	var splitted = message.content.split(" ");
	var command = splitted[0];
	var func = cmds.get(command);
	
	if(func != null){
		var rankArray = members.getRank(message.author.id);
		console.log("Recieved cmd by ["+message.author.username+"], ["+message.content+"]")

		if(rankArray != null){
			for(var i = 0; i < rankArray.length; i++){
				if(ranks.canDo(rankArray[i], command)){
					mybot.sendMessage(message.channel, func(message, splitted));
					break;
				}
				console.log("CMD ["+message.content+"] denied.")
			}
		}
	}	
});

// We need another system for this
// mybot.on("serverNewMember", function(server, user){
// 	members.addMember(user.id, defaultCommands);
// });

mybot.login("bernausergi@gmail.com", "123qwe");
