var Discord = require('discord.js');
var Commands = require('./Commands.js');

var mybot = new Discord.Client();

var cmds = new Commands();

setup();

function setup(){
	
	console.log('Setting up');
	//ADD A COMMAND HERE
	cmds.add("help",help);
	cmds.add("ping",ping);
	console.log('All set up');
	
}
mybot.on("message", function(message){

	var splitted = message.content.split(" ");
	
	var command = splitted[0];
	
	var func = cmds.get(command);
	
	if(func != null){
		mybot.sendMessage(message.channel, func(splitted));
	}	
});

mybot.login("bernausergi@gmail.com", "123qwe");

//FUNCTIONS OF THE COMMANDS//
//ADD THE FUNCTION OF THE COMMAND HERE
//ping
function ping(){
	return "pong";
}
//help
function help(){
	
	var iterator = cmds.getKeys();
	var result = "Commands Available:\n";
	
	var col = iterator.next();	
	while(!col.done){
		result = result + "> " + col.value + "\n";
		col = iterator.next();
	}
	
	return result;
}
//





/////////////////////////////