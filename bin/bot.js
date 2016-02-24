var print = console.log
var Discord = require('discord.js');
// var data = require('./data.js');
var Imp = require('./imp.js');

var readline = require('readline');

// var data = new data();
var mybot = new Discord.Client();
var botID = "133331859387056128";
var server;
var commands = new Imp();

login();

// console.log(commands.f());
// On Ready
mybot.on("ready", function(){
	// server = mybot.servers.get("id", "132490115137142784");
	console.log('<Skynet> ready to operate!');
});

// On Message
mybot.on("message", function(message){
	var splitted = message.content.split(" ");
	var command = splitted[0];
	var func;
	var result;
	
	if(command.substr(-1, 1) == "!"){
		result = commands.get(command, message, splitted, mybot);
		if(result == null) return 0;
		if(message.channel.server != null){
			console.log("Recieved command ["+message.content+"] by ["+message.author.username+" at "
						+message.channel.server.name+" in #"+message.channel.name+"]");
			mybot.sendMessage(message.channel, result);
		} else {
			console.log("Recieved PM ["+message.content+"] by ["+message.author.username+"]");
			mybot.sendMessage(message.channel, result);
		}
		
	}
});

// On New Member
mybot.on("serverNewMember", function(server, user){
	mybot.sendMessage(server.defaultChannel, "Welcome to "+server.name+", "+user.mention()+".");
});

function login(){
	console.log('Initializing <Skynet>');
	var rl = readline.createInterface(process.stdin, process.stdout);
	rl.setPrompt('Enter password: ');
	rl.prompt();
	rl.on('line', function(line) {
		mybot.login("bernausergi@gmail.com", line, function(error){
			if(error == null) return;
			else rl.prompt();
		});
	});
}



