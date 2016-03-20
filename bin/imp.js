var Permissions = require('./permissions.js');

var perm = new Permissions();

var version = 2.02;
var disabled = [];
module.exports = Imp;

function Imp(){
	try{
		this.modules = require('../modules/');
		this.commands = [];

		//Move all the module commands into the commands dictionary
		//Loop all the modules
		for(var mod in this.modules){
			if (this.modules.hasOwnProperty(mod)) {
				mod = this.modules[mod];
				//Loop all the commands in a module
				for(var command in mod){
					var commandFunction = mod[command];
					//Add each command to the commands array
					this.commands[command] = commandFunction;
				}
			}
		}

	} catch(err){
		//Avoid crash on error
		console.log(err);
	}

}

Imp.prototype = {
	constructor: Imp,

	//Execute a command
	exec: function(command, message, splitted, mybot){
		//Remove the ! from the command
		command = command.substr(0,command.length-1);
		//Save the server of the message in variable for easy access
		var currentServer = message.channel.server;
		//Fetch from the dictionary the function
		var currentCommand = this.commands[command];
		if(currentCommand == null) return null;
		try{
			//Check the power the user has
			var power = perm.checkUserPermissions(message.author, message.channel);


			//Check if the server has any disabled module
			if(currentServer){
				var disabledOnServer = disabled[currentServer.id];
				if(!disabledOnServer){
					//Create the array of modules disabled
					disabled[currentServer.id] = ["template"];
					disabledOnServer = disabled[currentServer.id];
				}
			}
			//Check the required power the user needs to execute the command
			if(power > 0 && currentCommand.power >= power) {
				mybot.sendMessage(message.channel, "You don't have permission to do that");
				return 0;
			}

			if(currentCommand.power != 0){
				if(currentServer){
					//check if the bot has permissions to execute the command
					var canOperate = false;
					for(var role of currentServer.rolesOfUser(mybot.user)){
						if(role.hasPermission(currentCommand.permissions)) canOperate = true;
					}
					if(!canOperate){
						printLog(message, currentServer);
						mybot.sendMessage(message.channel, "Skynet doesn't have enough permission to do that");
						return 0;
					 }
				}
			}
			var returned = currentCommand.run(message, splitted, mybot);
			//if help was called
			if(returned == "a42"){
				var help = "**Skynet** v"+version+"."+
							"\nCommands Available:\n\n";
				for (var cmd in this.commands){
					if(disabledOnServer.indexOf(cmd) == -1)
						if(this.commands[cmd].power <= power)
						 	help += "> "+this.commands[cmd].help+"\n";
				}
				help += "\n https://github.com/polo123qwe/Skynet.";
				// mybot.sendMessage(message.author, help);
				// returned = "Check PMs";
				returned = help;
			}

			printLog(message, currentServer);
			if(returned == "error") returned = "Incorrect usage: "+currentCommand.help;

			mybot.sendMessage(message.channel, returned);

		} catch(err){
			//Fail to find function
			console.log("Something went wrong, "+err);
		}
	}
}

function printLog(message, server){
	if(server){
		console.log(("["+message.cleanContent+"] ").yellow+"by "+
					(message.author.username).green+" at "+
					(server.name+" #"+message.channel.name).red);
	} else {
		console.log("Recieved PM "+("["+message.content+"] ").yellow+"by "+
					(message.author.username).green);
	}
}
