var Permissions = require('./permissions.js');

var perm = new Permissions();

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

	get: function(command, message, splitted, mybot){
		command = command.substr(0,command.length-1);
		//Check for the function
		var currentServer = message.channel.server;
		var currentCommand = this.commands[command];
		if(currentCommand == null) return null;
		try{

			var power = perm.checkUserPermissions(message.author, message.channel);
			if(currentCommand.power > power) return "You don't have permissions to do that";

			//check if the bot has permissions to execute the command
			var canOperate = false;
			for(var role of currentServer.rolesOfUser(mybot.user)){
				if(role.hasPermission(currentCommand.permissions)) canOperate = true;
			}
			if(!canOperate) return "Skynet doesn't have enough permissions to do that";

			var returned = currentCommand.run(message, splitted, mybot);

			if(returned == null) return currentCommand.help;

			//if help was called
			if(returned == "a42"){
				returned = "__**Skynet**__ was developed by three *gorgeous lads* known as *Sergi*, *Soso*, and *Amery*."+
							"\nCommands Available:\n\n"
				for (var cmd in this.commands){
					if(cmd != "template" && cmd != "help")
					if(this.commands[cmd].power <= power) returned += "> "+this.commands[cmd].help+"\n";
				}
				returned += "\n https://github.com/polo123qwe/Skynet."
				mybot.sendMessage(message.author, returned);
				returned = "none";
			}
			if(returned == "none") returned = null;

			return returned;


		} catch(err){
			//Fail to find function
			console.log("Something went wrong, "+err);
		}
	}
}
