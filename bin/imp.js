var Permissions = require('./permissions.js');

var perm = new Permissions();

var version = 2.01;
module.exports = Imp;

function Imp(){
	try{
		this.commands = require('../modules/');

	} catch(err){
		console.log(err);
	}

}

Imp.prototype = {
	constructor: Imp,

	exec: function(command, message, splitted, mybot){
		command = command.substr(0,command.length-1);
		//Check for the function
		var currentServer = message.channel.server;
		var currentCommand = this.commands[command];
		if(currentCommand == null) return null;
		try{
			var power = perm.checkUserPermissions(message.author, message.channel);
			if(currentCommand.power > power) {
				mybot.sendMessage(message.channel, "You don't have permission to do that");
				return 0;
			}

			if(currentServer != null){
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
			var returned = currentCommand.run(message, splitted, mybot);
			//if help was called
			if(returned == "a42"){
				var help = "**Skynet** v"+version+"."+
							"\nCommands Available:\n\n";
				for (var cmd in this.commands){
					if(cmd != "template" && cmd != "help")
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
		console.log("Recieved command ["+message.cleanContent+"] by ["+message.author.username+" at "
					+server.name+" in #"+message.channel.name+"]");
	} else {
		console.log("Recieved PM ["+message.content+"] by ["+message.author.username+"]");
	}
}
