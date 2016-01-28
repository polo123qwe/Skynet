var Commands = require('./Commands.js');
var cmds = new Commands();
var warnRole, mutedRole;
var eventMessage = ""

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
		cmds.add("warn!", this.warn);
		cmds.add("report!", this.report);
		cmds.add("urban!", this.urban);
		cmds.add("malProfile!", this.malProfile)
		cmds.add("time!", this.time);
		cmds.add("editEvent!", this.editEvent)
		cmds.add("printEvent!", this.printEvent)
		cmds.add("bestRating!", this.bestRating)

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

	//warn //usage: warn! @name reason
	warn: function(message, splitted, client){
		var roles = message.channel.server.rolesOfUser(message.author);

		for(var i = 0; i < roles.length; i++){
			if(roles[i].name == "Operator" || "Moderator"){
				if(splitted[1] == null || splitted[2] == null){
					return null;
				}

				var warnedID = splitted[1];
				warnedID = warnedID.replace(/<|@|>/ig,"");

				var reason = splitted.slice();
				reason = reason.splice(2, reason.length);
				reason = reason.toString().split(",").join(" ");

				client.addMemberToRole(warnedID, warnRole)
				client.sendMessage("139913811451838464", message.author.mention()+" warned <@"
				+warnedID+"> in ["+message.channel.server.name+", "+message.channel.name+"]");
				return "<@"+warnedID+">. You were warned for:`"+reason+"`. This warn will be resolved after 3 days. Should you be warned again within that time period, you will get banned. If this warning is, in your opinion, not deserved, then PM one of the OPs and we'll discuss what to do about your warn."			
			}
		}
		return null;
	},

	//report //usage: report! @user reason
	report: function(message, splitted, client){
		//error handling
		if(splitted[1] == null || splitted[2] == null){
			return null;
		}

		//ID
		var reporterID = message.author.id;
		var reportedID = splitted[1].replace(/<|@|>/ig,"");

		//reason
		var reason = splitted.slice();
		reason = reason.splice(2, reason.length);
		reason = reason.toString().split(",").join(" ");

		client.sendMessage("139913811451838464", "<@"+reporterID
		+"> reported <@"+reportedID+"> on: `"+reason
		+"` ["+message.channel.server.name+", "+message.channel.name+"]");
		return "Your report has been taken into account!"
	},
	
	//urban //usage: urban! something
	urban: function(message, splitted){
		
		var result = splitted.slice();
		
		if (result == null) return null;
		
		result = result.splice(1, result.length);
		result = result.toString().split(",").join("+");
		
		return "http://www.urbandictionary.com/define.php?term="+result;
	},
	
	//mapProfile //usage: malProfile! name
	malProfile: function(message, splitted){
		if(splitted[1] != undefined){
			return "http://www.myanimelist.net/profile/"+splitted[1]
		}else{
			return
		}
	},

	//time //usage: time! timezone
	time: function(message, splitted){
	
		var date = new Date(Date.now());
		
		var time = splitted[1];
		var utc;
		
		if(time != null){
			utc = time.substring(0,4).toUpperCase();

			if(utc != "GMT+" && utc != "GMT-" && utc != "GMT") return null;
			var offset = parseInt(time.substring(4,6));
			
			if(utc.charAt(3) == "+")
				date = new Date(date.getTime()+(offset*3600000));
			else date = new Date(date.getTime()-(offset*3600000));
			
		} else time = "GMT";
		
		var h = date.getUTCHours();
		h = (h < 10 ? "0" : "") + h;
		var m  = date.getUTCMinutes();
		m = (m < 10 ? "0" : "") + m;
		var s  = date.getUTCSeconds();
		s = (s < 10 ? "0" : "") + s;
		var Y = date.getUTCFullYear();
		var M = date.getUTCMonth() + 1;
		M = (M < 10 ? "0" : "") + M;
		var D  = date.getUTCDate();
		D = (D < 10 ? "0" : "") + D;
		
		return "**"+time.toUpperCase()+"** Standard Time: `"+D+"/"+M+"/"+Y+" "+h+":"+m+":"+s+"`";
	},

	editEvent: function(message, splitted){
		var roles = message.channel.server.rolesOfUser(message.author);

		for(var i = 0; i < roles.length; i++){
			if(roles[i].name == "Operator"){
				if(splitted[1] == null){
					return null;
				}else{
					for(var i = 1; i < splitted.length; i++){
						eventMessage = eventMessage + splitted[i] + " "
					}
				}
				return "The current event has been edited to: `"+eventMessage+"`"
			}else{
				return null
			}
		}
	},

	printEvent: function(){
		if(eventMessage != ""){
			return "The current event is: `"+eventMessage+"`"
		}else{
			return "There is currently no event going on."
		}
	},

	bestRating: function(){
		return "__***5/7***__"
	},
}