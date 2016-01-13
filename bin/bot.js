var Discord = require('discord.js');
var Action = require("./Action");
var Commands = require('./Commands.js');

var mybot = new Discord.Client();

var cmds = new Commands();

setup();

function setup(){
	console.log('Setting up');
	cmds.add("help",1);
	cmds.add("ping",0);
	console.log('All set up');
}
mybot.on("message", function(message){
	
	var num = cmds.amount(); //TODO: GO TROUGH ALL THE COMMANDS
	
    if(message.content === "ping")
       mybot.reply(message, "pong");
	
    if(message.content === "test"){
		// var a = cmds.find("test");
		//mybot.reply(message, a);
	}
	
});

mybot.login("bernausergi@gmail.com", "123qwe");