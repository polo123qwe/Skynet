var Commands = require('./Commands.js');
var Ranks = require('./Ranks.js');

var cmds = new Commands();
var ranks = new Ranks();

module.exports = data;

function data(){

}

data.prototype = {
	constructor: data,
	
	//RANKS
	rankStartup: function(){
		var def = this.getDefaultCommands()

		ranks.addRank("Default", def);
		def.push("bestCommand!");

		ranks.addRank("TestSubject", def);
		def.push("assignRank!");

		ranks.addRank("Admin", def);
		return ranks;
	},

	//COMMANDS
	cmdStartup: function(){
		console.log('Initializing <Skynet>');
		//ADD A COMMAND HERE

		cmds.add("help!", this.help);
		cmds.add("ping!", this.ping);
		cmds.add("getMyID!", this.getMyID);
		cmds.add("getChannelID!", this.getChannelID);
		cmds.add("adminOnly!", this.adminOnly);
		cmds.add("warn!", this.warn)
		// cmds.add("assignRank!", this.assignRank);

		return cmds;
	},
	
	getDefaultCommands: function(){
		return ["help!", "!", "ping!", "id!"];
	},

//FUNCTIONS OF THE COMMANDS//
//ADD THE FUNCTION OF THE COMMAND HERE
	//ping
	ping: function(){
		return "pong!";
	},

	//help
	help: function(){
		
		var iterator = cmds.getKeys();
		var result = "Commands Available:\n";
		
		var col = iterator.next();	
		while(!col.done){
			result = result + "> " + col.value + "\n";
			col = iterator.next();
		}
		
		return result;
	},

	//id
	getMyID: function(message){
		return message.author.mention()+", your ID is: `"+message.author.id+"`";
	},

	//getChannelID
	getChannelID: function(message){
		var id = message.channel.id;
		return "<#"+id+">'s ID is: `"+id+"`";
	},

	//adminOnlyCommand
	adminOnly: function(message, splitted, roles){
		// loops through roles
		for(var i = 0; i < roles.length; i++){
			if(roles[i].name == "Operator"){
				return "LOL IT WORKS";
			}
		}
	},

	//warn warn! @name reason
	warn: function(message, splitted, roles, client){
		var totalRoles = message.channel.server.roles
		var warningRole = undefined
		// searches the warning role
		for (var i = 0; i < totalRoles.length; i++){
			if(totalRoles[i].name == "Warning"){
				warningRole = totalRoles[i];
				break;
			}
		}

		// assigns the warning role
		for(var i = 0; i < roles.length; i++){
			if(roles[i].name == "Operator" || "Moderator"){
				//gets positions of the warned person's ID
				var startName = message.content.search("<@")
				var endName = message.content.search(">")
				var warnedID = message.content.substring(startName + 2, endName - 1)
				console.log("<@"+message.author.name+"> warned somebody in ["+message.channel.server.name+", "+message.channel.name+"]")

				// make reason
				var reason = ""
				for(var k = 2; k < splitted.length; k++){
					reason = reason + " " + splitted[k]
				}

				client.addMemberToRole(warnedID, warningRole)
				//don't read. It's just some huge ass string.
				client.sendMessage("139913811451838464", message.author.mention()+" warned <@"+warnedID+"> in ["+message.channel.server.name+", "+message.channel.name+"]")
				return "<@"+warnedID+">. You were warned for:`"+reason+"`. This warn will be resolved after 3 days. Should you be warned again within that time period, you will get banned. If this warning is, in your opinion, not deserved, then PM one of the OPs and we'll discuss what to do about your warn."
			}
		}
	}

	//assignRank
	/*assignRank: function(message, argument){ //DO NOT USE THIS YET PENDING IMPLEMENTATION
		if(argument[1]
		return argument.toString();
	}*/
}