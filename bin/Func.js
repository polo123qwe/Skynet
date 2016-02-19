
var fa = require('./Crystalball.js');
var Vote = require('./Vote.js');

//roles related
var warnRole, mutedRole, memberRole;

var eventMessage = "";

var votes = new Map();
// var actualVote;

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


	//caveJohnson! Yup.
	caveJohnson: function() {
		return "All right, I've been thinking. When life gives you lemons, *don't make lemonade.* \nMake life take the lemons back! \n***Get mad!*** \n**I don't want your damn lemons! What am I supposed to do with these?!** \nDemand to see life's manager! \nMake life rue the day it thought it could give Cave Johnson lemons! \nDo you know who I am? \nI'm the man who's gonna burn your house down! \nWith the lemons! \nI'm gonna get my engineers to invent a combustible lemon that **burns your house down!**";
	},

	//ping //usage: ping!
	ping: function(){
		return "pong!";
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

	//Warn: Gives user the 'Warned' role. If the user was already warned once, it mutes said user.
	warn: function(message, splitted, client) {
		// Check if the user is allowed to use the command.
		if(!(isAllowed(message.author, "Moderator", message.channel.server) || isAllowed(message.author, "Operator", message.channel.server))) {
			return "Access denied. This command is for Operators or Moderators only."
		}

		// Check for nulls
		if(splitted[1] == null || splitted[2] == null) {
			return "Not enough parameters or one of the parameters was null."
		}

		// Declarations and Definitions
		var utwID = splitted[1].replace(/<|@|>/ig, "");						// User to warn ID
		var utwRoles = message.channel.server.rolesOfUser(utwID);			// Roles of the user to warn
		var warnRole = getRole("Warning", message); 						// Get the warning role
		var muteRole = getRole("Muted", message);							// Get the muted role
		var reason = splitted.slice();										// Get the reason for the warning
		
		// Rebuild the reason text.
		reason = reason.splice(2, reason.lenght).toString().split(",").join(" ");

		// Check if the user was mentioned
		if(!wasMentioned(utwID, message)) {
				return "No user was mentioned. Remember to @ the user you need to warn.";
		}

		// Check for a previous warning
		for(var i = 0; i < utwRoles.length; ++i) {
			if(rolesOfUser[i].name == "Warning") {
				// User already had a warning, so it proceeds to mute said user
				client.addMemberToRole(utwID, muteRole);

				// Send a message to #log with details
				client.sendMessage("150028926931042305", message.author.mention() + " warned <@" + utwID + ">, but seeing as they were already warned before, said user has been muted. Reason: " + reason);
				
				// Send a message on the channel to inform the user of their mute
				return "<@" + utwID + ">, seeing as you were previously warned once, you've now been muted. Please, read #rules for more info.";
			}
		}

		// If none of the above happens, then warn the user
		client.addMemberToRole(utwID, warnRole);

		// Send message to #log with details
		client.sendMessage("150028926931042305", message.author.mention() + " warned <@" + utwID + ">. Reason: " + reason);

		// Send message on the channel to inform the user of their warn
		return "<@" + utwID + ">, you've been warned. Reason: `" + reason + "` Please, read #rules for more info."
	},

	// Mute: Mutes a user.
	mute: function(message, splitted, client) {
		// Check if the user is allowed to use the command.
		if(!(isAllowed(message.author, "Moderator", message.channel.server) || isAllowed(message.author, "Operator", message.channel.server))) {
			return "Access denied. This command is for Operators or Moderators only."
		}

		// Check for nulls
		if(splitted[1] == null || splitted[2] == null) {
			return "Not enough parameters or one of the parameters was null."
		}

		// Declaration and Definitions
		var utmID = splitted[1].replace(/<|@|>/ig, "");		// User to mute ID	
		var muteRole = getRole("Muted", message);			// Gets the muted role
		var reason = splitted.slice();						// Gets the reason

		// Check if the user was mentioned
		if(!wasMentioned(utmID, message)) {
				return "No user was mentioned. Remember to @ the user you need to mute.";
		}

		// Rebuild the reason text
		reason = reason.splice(2, reason.length).toString().split(",").join(" ");

		// Mutes the user
		client.addMemberToRole(utmID, muteRole);

		// Sends a message to #log with details
		client.sendMessage("150028926931042305", message.author.mention() + " muted <@" + utmID + ">. Reason: " + reason);

		// Sends a message on the channel to inform the user of their mute
		return "<@" + utmID + ">, you have been muted. Reason: `" + reason + "` Please, read #rules for more info.";
	},

	//report //usage: report! @user reason
	report: function(message, splitted, client){
		//error handling
		if(splitted[1] == null || splitted[2] == null){
			return "Not enough arguments. Correct usage is: `report! @person reason`. Remember to use an @ in front of the person's name.";
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
		return "Your report has been taken into account!";
	},
	
	//urban //usage: urban! something
	urban: function(message, splitted){
		
		var result = splitted.slice();
		
		if (splitted[1] == null){
			return "Not enough arguments, type urban! word";
		} else {
			result = result.splice(1, result.length);
			result = result.toString().split(",").join("+");
			return "http://www.urbandictionary.com/define.php?term="+result;
		}
	},
	
	//mal //usage: mal! name
	mal: function(message, splitted){
		
		if(splitted[1] != null){
			return "http://www.myanimelist.net/profile/"+splitted[1];
		}else{
			return "Not enough arguments, type mal! username";
		}
	},

	//mal anime search link // usage: mala! title
	mala: function(message, splitted){
			
		var result = splitted.slice();
		
		if (splitted[1] == null){
			return "Not enough arguments, type mala! title";
		} else {
			result = result.splice(1, result.length);
			result = result.toString().split(",").join("%20");	
			return "http://myanimelist.net/anime.php?q="+result;
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

	// editEvent: lets op edit the current event.
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

	//showEvent: shows the current event, previously set by an OP, or an error message.
	showEvent: function(){
		if(eventMessage != ""){
			return "The current event is: `"+eventMessage+"`";
		} else {
			return "There is currently no event going on.";
		}
	},
	
	//startVote //startVote! name option1 option2 option3 ...
	startVote: function(message, splitted){
		// if(!isAllowed(message.author, "Operator", message.channel.server)){
			// if(!isAllowed(message.author, "Moderator", message.channel.server)){
				// return "Access Denied.";
			// }
		// }

		// if(splitted[3] == null) return "Not enough parameters. Usage: `startVote! name option1 option2 option3 ...`";
		
		// var actualVote = new Vote(splitted.splice(2, splitted.length));
		actualVote = new Vote(splitted.splice(2, splitted.length));
		
		// votes.set(splitted[1], actualVote);
	
		// console.log("Voting started! ["+message.author.username+", "+message.channel.name+", "+actualVote.getOptions()+"]");
		// return "Voting started! "+actualVote.getOptions();
	},

	//vote //vote! name option
	vote: function(message, splitted){
		
		// if(splitted[1] == null){
			// return "Please type the name of the vote.\n"+stringifyVotes();
		// } else {
			// var actualVote = votes.get(splitted[1]);
			// if(actualVote == undefined) return splitted[1]+" is not currently in progress.\n"+stringifyVotes();
			
			// if(splitted[2] == null) return "Error, type vote! name option"+actualVote.getOptions();
			
			// var id = message.author.id;
			
			// return actualVote.addVote(splitted[2], id);
		// }
	},
	
	//endVote //endVote!
	endVote: function(message, splitted){
		
		// if(!isAllowed(message.author, "Operator", message.channel.server)){
			// if(!isAllowed(message.author, "Moderator", message.channel.server)){
				// return "Access denied";
			// }
		// }
		
		// if(splitted[1] == null) return "Type the name of the vote to remove.\n"+stringifyVotes();

		// var actualVote = votes.get(splitted[1]);
		
		// if(actualVote == undefined) return splitted[1]+" is not currently in progress.\n"+stringifyVotes();
		
		// var result = "Vote ended successfully.\n"+actualVote.endVote();
		
		// votes.delete(splitted[1]);
		
		actualVote = null;
		
		// return result;

	},

	//
	lennyface: function(){
		return "( ͡° ͜ʖ ͡°)";
	},
	
	//wiki: Looks up something in the English Wikipedia. -Amery
    wiki: function(message, splitted) {
		
        if (splitted[1] == null) {
            return "Not enough arguments. Correct usage is: `wiki! <search terms separated by spaces>`";
        }
		
		var result = splitted.splice(1, splitted.length);
		result = result.toString().split(",").join("_");
		
        return "http://en.wikipedia.org/wiki/" + result;
    },

	//rebel!
	rebel: function(message, splitted, client) {
		// limits assignment to op or md
		if(isAllowed(message.author, "Operator", message.channel.server) || isAllowed(message.author, "Moderator", message.channel.server)) {

			// sets up roles
			var allRoles = message.channel.server.roles;
			var userRoles = message.channel.server.rolesOfUser(message.author);
			var memberRole;

			// Prevents errors
			if(!splitted[1]){
				return "Not enough parameters. Usage: `rebel! <@user>"
			}

			// ID
			var memberID = splitted[1].replace(/<|@|>/ig,"");
			if(!wasMentioned(memberID, message)){
				return "Invalid user parameter. `<@user>` has to be an existing user."
			}

			// gets member role
			for(var i = 0; i < allRoles.length; i++){
				if(allRoles[i].name == "Rebel"){
					memberRole = allRoles[i];
				}
			}

			var requestingUserRoles = message.channel.server.rolesOfUser(memberID);

			// prevents double membership
			for(i = 0; i < requestingUserRoles.length; ++i){
				if(requestingUserRoles[i].name == "Rebel") {
					return "<@"+memberID+"> is already in Chernobyl";
				}
			}

			client.addMemberToRole(memberID, memberRole);
			return "<@"+memberID+">, you are now allowed to enter Chernobyl, thanks to "+message.author.mention()+". If you think this is a mistake, and want the Rebel role removed, contact an Operator please.";

		} else {
			return "Access denied. `rebel!` is an OP/MD only command.";
		}
	},

	//conform/unrebel
	conform: function(message, splitted, client) {
		// limits assignment to op or md
		if(isAllowed(message.author, "Operator", message.channel.server) || isAllowed(message.author, "Moderator", message.channel.server)) {

			// sets up roles
			var allRoles = message.channel.server.roles;
			var userRoles = message.channel.server.rolesOfUser(message.author);
			var rebelRole;

			// Prevents errors
			if(!splitted[1]){
				return "Not enough parameters. Usage: `conform! <@user>"
			}

			// ID
			var memberID = splitted[1].replace(/<|@|>/ig,"");
			if(!wasMentioned(memberID, message)){
				return "Invalid user parameter. `<@user>` has to be an existing user."
			}

			// gets rebel role
			for(var i = 0; i < allRoles.length; i++){
				if(allRoles[i].name == "Rebel"){
					rebelRole = allRoles[i];
				}
			}

			var requestingUserRoles = message.channel.server.rolesOfUser(memberID);

			// prevents double membership
			for(i = 0; i < requestingUserRoles.length; ++i){
				if(requestingUserRoles[i].name == "Rebel") {
					client.removeMemberFromRole(memberID, rebelRole);
					return "<@"+memberID+"> has successfully been removed from Chernobyl.";
				}
			}

			return "<@"+memberID+"> wasn't in Chernobyl to begin with.";

		} else {
			return "Access denied. `conform!` is an OP/MD only command.";
		}
	},

	//giveMembership //usage giveMembership! @name
	giveMembership: function(message, splitted, client) {
		// limits assignment to op or md
		if(isAllowed(message.author, "Operator", message.channel.server) || isAllowed(message.author, "Moderator", message.channel.server)) {

			// sets up roles
			var allRoles = message.channel.server.roles;
			var userRoles = message.channel.server.rolesOfUser(message.author);
			var memberRole;

			// Prevents errors
			if(!splitted[1]){
				return "Not enough parameters. Usage: `giveMembership! <@user>"
			}

			// ID
			var memberID = splitted[1].replace(/<|@|>/ig,"");
			if(!wasMentioned(memberID, message)){
				return "Invalid user parameter. `<@user>` has to be an existing user."
			}

			// gets member role
			for(var i = 0; i < allRoles.length; i++){
				if(allRoles[i].name == "Member"){
					memberRole = allRoles[i];
				}
			}

			var requestingUserRoles = message.channel.server.rolesOfUser(memberID);

			// prevents double membership
			for(i = 0; i < requestingUserRoles.length; ++i){
				if(requestingUserRoles[i].name == "Member") {
					return "<@"+memberID+"> is already a member of **Anime Discord**";
				}
			}

			client.addMemberToRole(memberID, memberRole);
			return "<@"+memberID+">, you've been given membership for **Anime Discord** by "+message.author.mention()+".";

		} else {
			return "Access denied. `giveMembership!` is an OP/MD only command.";
		}
	},

	proveActive: function(message, splitted, client){
		if(isAllowed(message.author, "Operator", message.channel.server) || isAllowed(message.author, "Moderator", message.channel.server)){
			// Prevents errors
			if(!splitted[1]){
				return "Not enough parameters. Usage: `proveActive! <@user>`"
			}

			// ID
			var memberID = splitted[1].replace(/<|@|>/ig,"");
			if(!wasMentioned(memberID, message)){
				return "Invalid user parameter. `<@user>` has to be an existing user."
			}

			// gets active role
			var allRoles = message.channel.server.roles;
			var userRoles = message.channel.server.rolesOfUser(message.author);
			var activeRole
			for(var i = 0; i < allRoles.length; i++){
				if(allRoles[i].name == "Active"){
					activeRole = allRoles[i];
				}
			}

			// prevents double active..ness
			for(var i = 0; i < userRoles.length; i++){
				if(userRoles[i].name == "Active"){
					return "<@"+memberID+"> is already proven to be active.";
					break;
				}
			}

			client.addMemberToRole(memberID, activeRole)
			return "<@"+memberID+"> was proven active by "+message.author.mention()+".";
		}else{
			return "Access denied. `proveActive!` is an OP/MD only command."
		}
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
					isMember = true;
				}
			}

			if(!isMember){
				return message.author.mention()+" is not a member of **Anime Discord** yet.";
			}

			// prevents double enroll
			for(var i = 0; i < roles.length; i++){
				if(roles[i].name.substring(0, 3) == "GMT"){
					return message.author.mention()+" is already a enrolled for future elections of **Anime Discord**";
				}
			}

			// just messy code
			roles = message.channel.server.roles;

			for (var i = 0; i < roles.length; i++){
				if(roles[i].name == "GMT"+splitted[1].substring(3)){
					console.log(roles[i].name, splitted[1].substring(3))
					client.addMemberToRole(message.author, roles[i])
					return message.author.mention()+" is now enrolled for future elections of **Anime Discord**";
				}
			}

			return "This timezone does not yet exist. Ask the OPs to add `GMT"+splitted[1].substring(3)+"` as a *Timezone Role*";
		}
	},
	
	// fortune!: Ask a question, get the fortune!
	fortune: function(message, splitted) {
		if (splitted[1] == null) {
			return "You didn't ask the Almighty Skynet a question.";
		} else {
			var random = Math.floor((Math.random() * fa.arr.length));
			return message.author.mention() + ":crystal_ball:*"+fa.arr[random]+"*:crystal_ball:";
		}
	},
	
	// color!
	color: function(message, splitted, client) {

		// Checks if the user sending the message has the required permissions to use it.
		if(!(isAllowed(message.author, "Operator", message.channel.server) || isAllowed(message.author, "Moderator", message.channel.server))) {
			return "Access denied. This is an OP/MD command only.";
		}

		var memberID = splitted[1].replace(/<|@|>/ig,"");					// Grab the user from the message
		var hexColor = splitted[2];											// Grab the color in Hex from the message
		var rolesCache = message.channel.server.roles;						// Store the server roles in a cache
		var userRoleList = message.channel.server.rolesOfUser(memberID)		// Store the roles of the user in a variable
		var colorRole;														// Empty var, to be filled later
		
		// Set the permissions for the new role that will be created
		var permissions = {
			
			color: parseInt("0x"+hexColor), 
			name: "Color(0x"+hexColor+")",
			mentionEveryone: false,
			hoist: false,
			attachFiles: false,
			embedLinks: false,
			sendMessages: false,
			readMessages: false,
			sendTTSMessages: false,
			voiceConnect: false,
			voiceSpeak: false,
			voiceUseVAD: false,
			
		}

		// If no user was mentioned, return an error
		if(memberID == null) return "No user was mentioned.";
		
		// Check if the user was mentioned
		if(!wasMentioned(memberID, message)) return "No user was mentioned.";

		// Check for errors in the color selected
		if(hexColor == null) return "`Error:` You didn't type a color code.";
		if(hexColor.length != 6) return "`Error:` Lenght of color code is either too short or too long.";

		// Checking to see if the user already has a color role. If this is the case, remove that
		for(i = 0; i < userRoleList.length; ++i) {
			if(userRoleList[i].name.substring(0, 8) == "Color(0x"){
				client.removeMemberFromRole(memberID, userRoleList[i]);
			}
		}

		// Checking to see if the color role already exists
		for(i = 0; i < rolesCache.length; ++i) {
			if(rolesCache[i].name == "Color(0x"+hexColor+")") {
				colorRole = rolesCache[i];
				client.addMemberToRole(memberID, colorRole);
				return "Color changed successfully!";
			}
		}
		
		// If previous check doesn't match, then create the color role.
		client.createRole(message.channel.server, permissions, function(){
			// Assigns Role
			for(var i = 0; i < rolesCache.length; ++i) {
				if(rolesCache[i].name == "Color(0x"+hexColor+")") {
					colorRole = rolesCache[i];
				}
			}

			client.addMemberToRole(memberID, colorRole);
			
		});

		return "Color changed successfully!";
	},

	//define
	define: function(message, splitted) {

		var result = splitted.slice();

		if(splitted[1] == null) {
			return "Correct usage of this command is: `define! <word/s>`"
		} else {
			result = result.splice(1, result.length);
			result = result.toString().split(",").join("%20");
			return "http://www.merriam-webster.com/dictionary/"+result;
		}
	},

	joinDate: function(message, splitted, client) {
		var memberID = splitted[1].replace(/<|@|>/ig,"");					// Get the Member's ID
		var userDetails = message.channel.server.detailsOfUser(memberID);	// Get user details
		var userJoinDate = userDetails.joinedAt;							// Get the date (object) in UNIX.

		// Error Checks
		if(!wasMentioned(memberID, message)) return "No user was mentioned.";
		if(memberID == null) return "No user was mentioned.";

		// Return the date, converting it to Standard Time
		return "`<@"+memberID+">` joined the server on " + unixToTime(userJoinDate) + "GMT";
	},

	/* kill!
		This function simply kills the bot for when the devs need to use it for testing. */
	kill: function(message, client) {
		if(isAllowed(message.author, "Operator", message.channel.server) || isAllowed(message.author, "Moderator", message.channel.server)) {
			process.exit(1);
		} else {
			return "Access denied. This command is only for Operators or Moderators."
		}
	},

	ban: function(message, splitted, client) {
		// Czech for permission.
		if(!(isAllowed(message.author, "Moderator", message.channel.server) || isAllowed(message.author, "Operator", message.channel.server))) {
			return "This command is for Operators and Moderators only.";
		}

		// Variables
		var userToBeBannedID = splitted[1].replace(/<@>/ig, "");
		var reason = splitted.slice();
		reason = reason.splice(2, reason.length);
		reason = reason.toString().split(",").join(" ");

		// Checks if the user was indeed mentioned.
		if(!wasMentioned(userToBeBannedID, message)){
				return "Invalid user parameter. `<@user>` has to be an existing user.";
		}

		// Bans the member
		client.banMember(userToBeBannedID, message.channel.server, 7);

		// Send message to #management
		client.sendMessage("139913811451838464", message.author.mention() + "**banned** <@"+userToBeBannedID+"> for: `"+reason
		+"` ["+message.channel.server.name+", "+message.channel.name+"]");
	},

	kick: function(message, splitted, client) {
		// Czech for permission.
		if(!(isAllowed(message.author, "Moderator", message.channel.server) || isAllowed(message.author, "Operator", message.channel.server))) {
			return "This command is for Operators and Moderators only.";
		}

		// Variables
		var userToBeKickedID = splitted[1].replace(/<@>/ig, "");
		var reason = splitted.slice();
		reason = reason.splice(2, reason.length);
		reason = reason.toString().split(",").join(" ");

		// Checks if the user was indeed mentioned.
		if(!wasMentioned(userToBeKickedID, message)){
				return "Invalid user parameter. `<@user>` has to be an existing user.";
		}

		// Bans the member
		client.kickMember(userToBeKickedID, message.channel.server);

		// Send message to #management
		client.sendMessage("139913811451838464", message.author.mention() + "**kicked** <@"+userToBeKickedID+"> for: `"+reason
		+"` ["+message.channel.server.name+", "+message.channel.name+"]");
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
		return true;
	} else {
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
	// return "";
}

function wasMentioned(userID, message){
	var mentions = message.mentions
	for(var i = 0; i < mentions.length; i++){
		if(userID == mentions[i].id){
			return true
		}
	}
	return false
}

function getRole(rolename, message){
	var allRoles = message.channel.server.roles;

	// gets member role
	for(var i = 0; i < allRoles.length; i++){
		if(allRoles[i].name == rolename){
			return allRoles[i];
		}
	}
}

function unixToTime(UNIX_timestamp){
  var a = new Date(UNIX_timestamp);
  var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  var year = a.getFullYear();
  var month = months[a.getMonth()];
  var date = a.getDate();
  var hour = a.getHours();
  var min = a.getMinutes() < 10 ? '0' + a.getMinutes() : a.getMinutes(); 
  var sec = a.getSeconds() < 10 ? '0' + a.getSeconds() : a.getSeconds();
  var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec ;
  return time;
}
