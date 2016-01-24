var Discord = require('discord.js');
var Commands = require('./Commands.js');
var Ranks = require('./Ranks.js');
var Members = require('./Member.js');
var data = require('./data.js');

var data = new data();

var mybot = new Discord.Client();

var cmds = data.cStartup();

var ranks = data.rStartup();

var membs = new Members();

var defaultCommands = data.getDefaultCommands();

mybot.on("ready", function(){
	membs.addMember("131905565466034176", ["Admin"]);
	membs.addMember("112947635555463168", ["Admin"]);
	
});

mybot.on("message", function(message){

	var splitted = message.content.split(" ");
	
	var command = splitted[0];
	
	var func = cmds.get(command);
	
	if(func != null){
		var r = membs.getRank(message.author.id);
		if(r != null){
			for(var i = 0; i < r.length; i++){
				if(ranks.canDo(r[i], command)){
					mybot.sendMessage(message.channel, func(message, splitted));
					break;
				}
			}
		}
	}	
});

mybot.on("serverNewMember", function(server, user){
	membs.addMember(user.id, defaultCommands);
});

mybot.login("bernausergi@gmail.com", "123qwe");

