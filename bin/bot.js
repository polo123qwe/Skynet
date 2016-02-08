var print = console.log
var Discord = require('discord.js');
var Commands = require('./Commands.js');
var data = require('./data.js');
var readline = require('readline');

var data = new data();
var mybot = new Discord.Client();
var botID = "133331859387056128"
var server
var cmds;

login();

// On Ready
mybot.on("ready", function(){
	server = mybot.servers.get("id", "132490115137142784");
	cmds = data.cmdStartup(server.roles);
	console.log('<Skynet> ready to operate!');
	mybot.sendMessage("132490115137142784", "<@"+botID+"> is ready to operate.")
});

// On Message
mybot.on("message", function(message){
	var splitted = message.content.split(" ");
	var command = splitted[0];
	var func;
	var result;

	if(command.substr(-1, 1) == "!"){
		func = cmds.get(command);
		if(func != null) func = func[0];

		if(func != null){
			console.log("Recieved cmd ["+message.content+"] by ["+message.author.username+", "+message.channel.server.name+", #"+message.channel.name+"]")
			result = func(message, splitted, mybot);
		}

		mybot.sendMessage(message.channel, result);
	}
});

// On New Member
mybot.on("serverNewMember", function(server, user){
	mybot.sendMessage(server.defaultChannel, "Welcome to **Anime Discord** "+user.mention()+".");
})

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