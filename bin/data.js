var Commands = require('./Commands.js');

var cmds = new Commands();

var warnRole, mutedRole;

module.exports = data;

function data(){

}

data.prototype = {
	constructor: data,

	//COMMANDS
	cmdStartup: function(allRoles){
		//ADD A COMMAND HERE

		cmds.add("help!", this.help);
		cmds.add("ping!", this.ping);
		cmds.add("getMyID!", this.getMyID);
		cmds.add("getChannelID!", this.getChannelID);
		cmds.add("adminOnly!", this.adminOnly);
		cmds.add("warn!", this.warn)
		// cmds.add("assignRank!", this.assignRank);
		for (var i = 0; i < allRoles.length; i++){
			if(allRoles[i].name == "Warning"){
				warnRole = allRoles[i];
				break;
			}
			if(allRoles[i].name == "Muted"){
				mutedRole = allRoles[i];
				break;
			}
		}
		return cmds;
	},


//FUNCTIONS OF THE COMMANDS//
//ADD THE FUNCTION OF THE COMMAND HERE
	//ping //usage: ping!
	ping: function(){
		return "pong!";
	},

	//help //usage: help!
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

	//id //usage: getMyID!
	getMyID: function(message){
		return message.author.mention()+", your ID is: `"+message.author.id+"`";
	},

	//getChannelID //usage: getChannelID!
	getChannelID: function(message){
		var id = message.channel.id;
		return "<#"+id+">'s ID is: `"+id+"`";
	},

	//adminOnlyCommand //usage: adminOnly!
	adminOnly: function(message, splitted){
		var allRoles = message.channel.server.roles;
		for(var i = 0; i < roles.length; i++){
			if(roles[i].name == "Operator"){
				return "LOL IT WORKS";
			}
		}
		return null;
	},

	//warn //usage: warn! @name reason
	warn: function(message, splitted, client){
		var roles = message.channel.server.rolesOfUser(message.author);

		for(var i = 0; i < roles.length; i++){
			if(roles[i].name == "Operator" || "Moderator"){
				//gets positions of the warned person's ID
				// var warnedID = splitted[1];
				// warnedID = warnedID.replace(/<|@|>/ig,"");

				// make reason
				// var reason = ""
				// for(var k = 2; k < splitted.length; k++){
				// 	reason = reason + " " + splitted[k]
				// }
				// This doesn't work m8
				if(splitted[1] == null || splitted[2] == null) return "Incorrect/not enough parameters, type warn! @name reason"; 
				var warnedID = splitted[1];
                warnedID = warnedID.replace(/|@|/ig,"");
                var reason = splitted.slice();
                reason = reason.splice(2, reason.length);
				reason = reason.toString().split(",").join(" ");

				client.addMemberToRole(warnedID, warnRole)
				//Don't send a message if the function returns something to be sent, 
				//it doesn't make any sense
				client.sendMessage("139913811451838464", message.author.mention()+" warned <@"
				+warnedID+"> in ["+message.channel.server.name+", "+message.channel.name+"]");
				//REMOVE THIS SOMEHOW ^
				return "<@"+warnedID+">. You were warned for:`"+reason+"`. This warn will be resolved after 3 days. Should you be warned again within that time period, you will get banned. If this warning is, in your opinion, not deserved, then PM one of the OPs and we'll discuss what to do about your warn."			
			}
		}
		return null;
	},
}