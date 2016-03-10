var print = console.log
var Discord = require('discord.js');
var Imp = require('./imp.js');
var readline = require('readline');
var mybot = new Discord.Client();
var commands = new Imp();

login();

// console.log(commands.f());
// On Ready
mybot.on("ready", function(){
	console.log('<Skynet> ready to operate!');
});

// On Message
mybot.on("message", function(message){
	var splitted = message.content.split(" ");
	var command = splitted[0];
	var func;
	var result;

	if(command.substr(-1, 1) == "!"){
		commands.exec(command.toLowerCase(), message, splitted, mybot);
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
