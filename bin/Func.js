
var fa = require('./Crystalball.js');
var Vote = require('./Vote.js');

//roles related
var warnRole, mutedRole, memberRole;

var eventMessage = "";

var votes = new Map();

module.exports = Func;

function Func(wR, mR, mbR){
	warnRole = warnRole;
	mutedRole = mutedRole;
	memberRole = memberRole;
}

Func.prototype = {
	constructor: Func,
	
//FUNCTIONS OF THE COMMANDS//
//ADD THE FUNCTION OF THE COMMAND HERE

	//ping //usage: ping!
	ping: function(){
		return "pong!";
	},

	//help //usage: help!
	help: function(){
		var result = ""+
		"__**Skynet**__ was developed by: *polo123qwe*, *Soso*, and *Amery*."+
		"\n`https://github.com/polo123qwe/Skynet`"+
		"\n"+
		"\n***Dank Stuff***"+
		"\n    `urban! <term>` Gives the term of `<term>` in *Urban Dictionary*."+
		"\n    `mal! <username>` Gives the *MyAnimeList* profile of `<username>`."+
		"\n    `bestRating!` Gives the best possible rating of any rating scale ever."+
		"\n    `lennyface!` ( ͡° ͜ʖ ͡°)"+
		"\n    `fortune! <question>` Gives you the infinite wisdom of Skynet."+
		"\n"+
		"\n***Other***"+
		"\n    `getMyID!` Gives your Discord ID."+
		"\n    `getChannelID` Gives current channel's ID."+
		"\n    `ping!` pong!"+
		"\n    `help!` Shows this menu."+
		"\n    `time! GMT<timezone>` Shows current time for `GMT<timezone>`."+
		"\n    `getMembership!` Gives `<user>` membership."+
		"\n    `enroll! GMT<timezone>` Enrolls `<user>` for future elections."+
		"\n"+
		"\n***Management Related***"+
		"\n    `report! <@user> <reason>` Reports `<@user>` for `<reason>`."+
		"\n    `vote! <option>` Votes for option `<option>`."+
		"\n    `getVoteOptions!` Gives options for the current vote."

		// var iterator = cmds.getKeys();
		// var result = "Commands Available:\n";
		
		// var col = iterator.next();	
		// while(!col.done){
		// 	result = result + "> " + col.value + "\n";
		// 	col = iterator.next();
		// }
		
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
			return "Not enough arguments, type report! person reason";
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
		
		if (splitted [1]) return "Not enough arguments, type urban! word";
		
		result = result.splice(1, result.length);
		result = result.toString().split(",").join("+");
		
		return "http://www.urbandictionary.com/define.php?term="+result;
	},
	
	//mal //usage: mal! name
	mal: function(message, splitted){
		
		if(splitted[1] != null){
			return "http://www.myanimelist.net/profile/"+splitted[1];
		}else{
			return "Not enough arguments, type mal! username";
		}
	},

	//time //usage: time! timezone
	time: function(message, splitted){
	
		var date = new Date(Date.now());
		
		var time = splitted[1];
		var utc;
		
		if(time != null){
			utc = time.substring(0,4).toUpperCase();

			if(utc != "GMT+" && utc != "GMT-" && utc != "GMT ") return null;
			
			var offset = parseInt(time.substring(4,6));
			
			if(offset>12) offset = 12;
			
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
				}else {
					for(var i = 1; i < splitted.length; i++){
						eventMessage += splitted[i] + " ";
					}
				}
				return "The current event has been edited to: `"+eventMessage+"`";
			}else {
				return null;
			}
		}
	},

	showEvent: function(){
		if(eventMessage != ""){
			return "The current event is: `"+eventMessage+"`"
		}else{
			return "There is currently no event going on."
		}
	},
	
	//startVote //startVote! name option1 option2 option3 ...
	startVote: function(message, splitted){
		if(!isAllowed(message.author, "Operator", message.channel.server)){
			if(!isAllowed(message.author, "Moderator", message.channel.server)){
				return "Access Denied."
			}
		}

		if(splitted[3] == null) return "Not enough parameters. Usage: `startVote! name option1 option2 option3 ...`";
		
		var actualVote = new Vote(splitted.splice(2, splitted.length));
		
		votes.set(splitted[1], actualVote);
	
		console.log("Voting started! ["+message.author.username+", "+message.channel.name+", "+actualVote.getOptions()+"]")
		return "Voting started! Options: "+actualVote.getOptions();
	},

	//vote //vote! name option
	vote: function(message, splitted){
		
		if(splitted[1] == null){
			return "Please type the name of the vote.\n"+stringifyVotes();
		} else {
			var actualVote = votes.get(splitted[1]);
			if(actualVote == undefined) return splitted[1]+" is not currently in progress";
			
			if(splitted[2] == null) return "Error, type vote! name option";
			
			var id = message.author.id;
			
			return actualVote.addVote(splitted[2], id);
		}
	},
	
	//endVote //endVote!
	endVote: function(message, splitted){
		
		if(!isAllowed(message.author, "Operator", message.channel.server)){
			if(!isAllowed(message.author, "Moderator", message.channel.server)){
				return "Access denied";
			}
		}
		
		if(splitted[1] == null) return "Type the name of the vote to remove";

		var result = "Vote ended successfully"+endVote();
		
		votes.delete(splitted[1]);
		
		return result;

	},

	//
	lennyface: function(){
		return "( ͡° ͜ʖ ͡°)"
	},
	
	//wiki: Looks up something in the English Wikipedia. -Amery
    wiki: function(message, splitted) {
		
        if (splitted[1] == null) {
            return "Not enough arguments. Correct usage is: `wiki! <search terms separated by spaces>`;"
        }
		
		var result = splitted.splice(1, splitted.length);
		console.log(result);
		result = result.toString().split(",").join("_");
		
        return "http://en.wikipedia.org/wiki/" + result;
    },

	//getMembership //usage getMembership!
	getMembership: function(message, splitted, client){
		// prevents double membership
		var allRoles = message.channel.server.roles
		var userRoles = message.channel.server.rolesOfUser(message.author);
		var memberRole

		// gets member role
		for(var i = 0; i < allRoles.length; i++){
			if(allRoles[i].name == "Member"){
				memberRole = allRoles[i]
			}
		}

		// prevents double membership
		for(var i = 0; i < userRoles.length; i++){
			if(userRoles[i].name == "Member"){
				return message.author.mention()+" is already a member of **Anime Discord**"
			}
		}
		
		client.addMemberToRole(message.author, memberRole)
		return message.author.mention()+", you've been given membership for **Anime Discord**. If you want to participate in future elections, make sure to enter your timezone using enroll!"
	},

	//enroll! //usage: enroll! timezone(GMT) 
	enroll: function(message, splitted, client){
		var roles = message.channel.server.rolesOfUser(message.author);

		if(splitted[1] == null){
			return "Incorrect usage of `enroll!`. `ex.) enroll! GMT+1`"
		}

		if(splitted[1].substring(0, 3).toLowerCase() == "gmt" && parseInt(splitted[1].substring(3)) < 12 && parseInt(splitted[1].substring(3)) > -12){
			// prevent not-members from enrolling
			var isMember = false
			for(var i = 0; i < roles.length; i++){
				if(roles[i].name == "Member"){
					isMember = true
				}
			}

			if(!isMember){
				return message.author.mention()+" is not a member of **Anime Discord** yet.";
			}

			// prevents double enroll
			for(var i = 0; i < roles.length; i++){
				if(roles[i].name.substring(0, 3) == "GMT"){
					return message.author.mention()+" is already a enrolled for future elections of **Anime Discord**"
				}
			}

			// just messy code
			roles = message.channel.server.roles

			for (var i = 0; i < roles.length; i++){
				if(roles[i].name == "GMT"+splitted[1].substring(3)){
					console.log(roles[i].name, splitted[1].substring(3))
					client.addMemberToRole(message.author, roles[i])
					return message.author.mention()+" is now enrolled for future elections of **Anime Discord**"
				}
			}

			return "This timezone does not yet exist. Ask the OPs to add `GMT"+splitted[1].substring(3)+"` as a *Timezone Role*"
		}
	},
	
	// fortune!: Ask a question, get the fortune!
	fortune: function(message, splitted) {
		if (splitted[1] == null) {
			return "You didn't ask the Almighty Skynet a question.";
		} else {
			var random = Math.floor((Math.random() * fa.arr.length));
			return message.author.mention() + ":crystal_ball:**"+fa.arr[random]+"**:crystal_ball:";
		}
	},
}

function isAllowed(user, rank, server){
	var userRoles = server.rolesOfUser(user);
	for(var i = 0; i < userRoles.length; i++){
		if(userRoles[i].name == rank){
			return true;
		}
	}
	return false;
}

function isOnChannel(channel, wantedChannel){
	if(channel.id == wantedChannel){
		return true
	}else{
		return false;
	}
}

function stringifyVotes(){
	
	var iterator = votes.keys();
	var result = "Votes in progress:\n";
	
	var col = iterator.next();	
	while(!col.done){
		result = result + "> " + col.value + "\n";
		col = iterator.next();
	}
	
	return result;
}