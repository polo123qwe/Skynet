/* Func.js
	Functions for the commands. Remember to add them to 'data.js' after you're done here.
	Remember to use the proper category for your command.

	INDEX:
		1. Moderation Commands
		2. Other Restricted Commands
		3. Useful Commands
		4. Web Search Commands
		5. Text Commands
*/

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

	/* 1. MODERATION COMMANDS
			As the name implies, moderation commands are restricted to moderators and operators only.
			Command list: warn, mute, rebel, conform, membership, proveactive
	*/

	//Warn: Gives user the 'Warned' role. If the user was already warned once, it mutes said user.
	warn: function(message, splitted, client) {
		// Check if the user is allowed to use the command.
		if(!(isAllowed(message.author, "Moderator", message.channel.server) || isAllowed(message.author, "Operator", message.channel.server))) {
			return "Access denied. This command is for Operators or Moderators only.";
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
			return "Access denied. This command is for Operators or Moderators only.";
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

	// Rebel: Allows a user to access NSFW content.
	rebel: function(message, splitted, client) {
		// Check if the user is allowed to use the command.
		if(!(isAllowed(message.author, "Moderator", message.channel.server) || isAllowed(message.author, "Operator", message.channel.server))) {
			return "Access denied. This command is for Operators or Moderators only.";
		}

		// Null check
		if(splitted[1] == null) {
			return "Not enough parameters.";
		}

		// Variables
		var memberID = splitted[1].replace(/<|@|>/ig,"");							// Get the ID of the requesting user.
		var allRoles = message.channel.server.roles;								// Get all the roles from the list
		var rebelRole = getRole("Rebel", message);									// Set variable for rebel role
		var requestingUserRoles = message.channel.server.rolesOfUser(memberID);		// Get the requesting user roles

		
		// Checks for user mention
		if(!wasMentioned(memberID, message)) {
			return "No user was mentioned. Remember to @ the user you want to rebel.";
		}

		// Check for double rebelry
		for(i = 0; i < requestingUserRoles.length; ++i){
			if(requestingUserRoles[i].name == "Rebel") {
				return "<@"+memberID+"> is already a rebel.";
			}
		}

		// Gives the selected member the rebel role
		client.addMemberToRole(memberID, rebelRole);

		// Sends a message on the channel to inform the user
		return "<@"+memberID+">, you are now a rebel. If you think this was a mistake, please ask to be conformed.";
	},

	// Conform/Unrebel: Reverts 'rebel' command.
	conform: function(message, splitted, client) {
		// Check if the user is allowed to use the command.
		if(!(isAllowed(message.author, "Moderator", message.channel.server) || isAllowed(message.author, "Operator", message.channel.server))) {
			return "Access denied. This command is for Operators or Moderators only.";
		}

		// Null check
		if(splitted[1] == null) {
			return "Not enough parameters.";
		}

		// Variables
		var memberID = splitted[1].replace(/<|@|>/ig,"");							// Get user ID
		var allRoles = message.channel.server.roles;								// Get all the roles from the list
		var requestingUserRoles = message.channel.server.rolesOfUser(memberID);		// Get the roles from the user
		var rebelRole = getRole("Rebel", message);									// Get the Rebel role
		
		// Checks for user mention
		if(!wasMentioned(memberID, message)){
			return "No user was mentioned. Remember to @ the user you want to conform."
		}
		
		// Checks the requesting user role's for the 'Rebel' role. If it's there, remove it
		for(i = 0; i < requestingUserRoles.length; ++i){
			if(requestingUserRoles[i].name == "Rebel") {
				client.removeMemberFromRole(memberID, rebelRole);
				return "<@"+memberID+"> has successfully been conformed. *Power to authority!*.";
			}
		}

		// If the role wasn't there, return an error
		return "<@"+memberID+"> wasn't a rebel to begin with.";
	},

	// Membership: Grants a user the member role.
	membership: function(message, splitted, client) {
		// Check if the user is allowed to use the command.
		if(!(isAllowed(message.author, "Moderator", message.channel.server) || isAllowed(message.author, "Operator", message.channel.server))) {
			return "Access denied. This command is for Operators or Moderators only.";
		}

		// Null check
		if(splitted[1] == null) {
			return "Not enough parameters.";
		}

		// Variables
		var memberID = splitted[1].replace(/<|@|>/ig,"");							// Get the user's ID
		var allRoles = message.channel.server.roles;								// Get all the roles from the list
		var requestingUserRoles = message.channel.server.rolesOfUser(memberID);		// Get the user's roles
		var memberRole = getRole("Member", message);								// Get the Member role from the list

		// Check for user mention
		if(!wasMentioned(memberID, message)){
			return "No user was mentioned. Remember to @ the user you want to give membership to."
		}

		// Check for double membership
		for(i = 0; i < requestingUserRoles.length; ++i){
			if(requestingUserRoles[i].name == "Member") {
				return "<@"+memberID+"> is already a member of **Anime Discord**";
			}
		}

		// Give the user the member role
		client.addMemberToRole(memberID, memberRole);

		// Sends a message on the channel to inform the user
		return "<@"+memberID+">, you've been given membership for **Anime Discord** by "+message.author.mention()+".";
	},

	// ProveActive: Gives a user the 'Active' role.
	proveActive: function(message, splitted, client) {
		// Check if the user is allowed to use the command.
		if(!(isAllowed(message.author, "Moderator", message.channel.server) || isAllowed(message.author, "Operator", message.channel.server))) {
			return "Access denied. This command is for Operators or Moderators only.";
		}

		// Null check
		if(splitted[1] == null) {
			return "Not enough parameters.";
		}

		// Variables
		var memberID = splitted[1].replace(/<|@|>/ig,"");						// Get the user's ID
		var allRoles = message.channel.server.roles;							// Get all the roles from the list
		var userRoles = message.channel.server.rolesOfUser(message.author);		// Get the user's roles
		var activeRole = getRole("Active", message);							// Get the Active role from the list

		// Check for user mention
		if(!wasMentioned(memberID, message)){
			return "No user was mentioned. Remember to @ the user you want to prove active.";
		}

		// Check for double active role assignment
		for(var i = 0; i < userRoles.length; i++){
			if(userRoles[i].name == "Active"){
				return "<@"+memberID+"> is already proven to be active.";
				break;
			}
		}

		// Give the user the 'Active' role
		client.addMemberToRole(memberID, activeRole);

		// Sends a message on the channel to inform the user
		return "<@"+memberID+"> was proven active by "+message.author.mention()+".";
	},

	/* 2. OHTER RESTRICTED COMMANDS
			Commands that are restricted to the normal user, but have no moderation functionality.
			Command list: color, kill, editEvent
	*/

	// Color: Used to give color roles to members who request it.
	color: function(message, splitted, client) {

		// Checks if the user sending the message has the required permissions to use it.
		if(!(isAllowed(message.author, "Operator", message.channel.server) || isAllowed(message.author, "Moderator", message.channel.server))) {
			return "Access denied. This command is for Operators or Moderators only.";
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

	// Kill: Kills the bot. Used to prevent double hosted clients.
	kill: function(message, client) {
		if(isAllowed(message.author, "Operator", message.channel.server) || isAllowed(message.author, "Moderator", message.channel.server)) {
			process.exit(1);
		} else {
			return "Access denied. This command is for Operators or Moderators only.";
		}
	},

	// editEvent: lets op edit the current event.
	editEvent: function(message, splitted) {
		if(!isAllowed(message.author, "Operator", message.channel.server)) {
			return "Access denied. This command is for Operators or Moderators only.";
		}

		// Check for null
		if(splitted[1] == null){
			return "No event was added after the command.";
		} else {
			for(var i = 1; i < splitted.length; i++){
				eventMessage += splitted[i] + " ";
			}
		}

		return "The current event has been edited to: `"+eventMessage+"`";
	},

	/* 3. USEFUL COMMANDS
			Useful stuff that actually serves a purpose or another for the users.
			Command list: showEvent, joinDate, getMyID, getChannelID, time, report
	*/

	//showEvent: Shows the current event, previously set by an OP, or an error message.
	showEvent: function(){
		if(eventMessage != ""){
			return "The current event is: `"+eventMessage+"`";
		} else {
			return "There is currently no event going on.";
		}
	},

	//joinDate: Shows the user's join date
	joinDate: function(message, splitted, client) {
		// Check for null
		if(splitted[1] == null) {
			// In this case, if there is no mention of user and the command is left blank, return the message author's own join date
			var ownDetails = message.channel.server.detailsOfUser(message.author);
			var ownJoinDate = ownDetails.joinedAt;

			// Return the date, converted to Standard Time
			return message.author.mention() + "joined the server on " + unixToTime(ownJoinDate) + "GMT";
		}

		// If another user was mentioned, then we set new variables
		var memberID = splitted[1].replace(/<|@|>/ig,"");					// Get the Member's ID
		var userDetails = message.channel.server.detailsOfUser(memberID);	// Get user details
		var userJoinDate = userDetails.joinedAt;							// Get the date (object) in UNIX.

		// Error Checks
		if(!wasMentioned(memberID, message)) return "No user was mentioned.";
		if(memberID == null) return "No user was mentioned.";

		// Return the date, converting it to Standard Time
		return "`<@"+memberID+">` joined the server on " + unixToTime(userJoinDate) + "GMT";
	},

	//getMyID: Gets the user's ID
	getMyID: function(message){
		return message.author.mention()+", your ID is: `"+message.author.id+"`";
	},

	//getChannelID: Gets the channel's ID
	getChannelID: function(message){
		var id = message.channel.id;
		return "<#"+id+">'s ID is: `"+id+"`";
	},

	//Time: Gets the time in the selected timezone
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

	//Report: Sends a report for a user to #management.
	report: function(message, splitted, client) {
		// Check for null
		if(splitted[1] == null) {
			return "Not enough arguments. No user was mentioned.";
		} else if(splitted[2] == null) {
			return "Not enough arguments. No reason was specified.";
		}

		//ID
		var reporterID = message.author.id;
		var reportedID = splitted[1].replace(/<|@|>/ig,"");

		// Check for user mention
		if(!wasMentioned(reportedID, message)) {
			return "No user was mentioned. Remember to @ the user you want to report.";
		}

		//reason
		var reason = splitted.slice();
		reason = reason.splice(2, reason.length);
		reason = reason.toString().split(",").join(" ");

		client.sendMessage("139913811451838464", "<@"+reporterID
		+"> reported <@"+reportedID+"> on: `"+reason
		+"` ["+message.channel.server.name+", "+message.channel.name+"]");
		return "Your report has been taken into account!";
	},

	/* 4. WEB SEARCH COMMANDS
			Commands that give a link to something or search for something on the internet.
			Command list: urban, mal, mala, wiki, define
	*/

	// Urban: Gives a link to Urban Dictionary's definition of the user's input.
	urban: function(message, splitted){
		
		var result = splitted.slice();
		
		if (splitted[1] == null){
			return "Not enough arguments.";
		} else {
			result = result.splice(1, result.length);
			result = result.toString().split(",").join("+");
			return "http://www.urbandictionary.com/define.php?term="+result;
		}
	},
	
	// Mal: Returns a MAL Profile
	mal: function(message, splitted){
		if(splitted[1] != null){
			return "http://www.myanimelist.net/profile/"+splitted[1];
		}else{
			return "Not enough arguments.";
		}
	},

	// Mala: Gives a link to MAL Search of the user's input.
	mala: function(message, splitted){
			
		var result = splitted.slice();
		
		if (splitted[1] == null){
			return "Not enough arguments.";
		} else {
			result = result.splice(1, result.length);
			result = result.toString().split(",").join("%20");	
			return "http://myanimelist.net/anime.php?q="+result;
		}
	},

	// Wiki: Looks up something in the English Wikipedia.
    wiki: function(message, splitted) {
        if (splitted[1] == null) {
            return "Not enough arguments.";
        }
		
		var result = splitted.splice(1, splitted.length);
		result = result.toString().split(",").join("_");
		
        return "http://en.wikipedia.org/wiki/" + result;
    },

    // Define: Gives a link to Merriam-Webster's definition of the user's input
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

	/* 5. TEXT COMMANDS
			Commands that return a simple text output. Virtually useless, but whatever, man...
			Command list: ping, lennyface, 
	*/

	// Ping: Tests server lag
	ping: function(){
		return "pong!";
	},

	// Lennyface: Returns a lennyface.........
	lennyface: function(){
		return "( ͡° ͜ʖ ͡°)";
	},

	// Fortune: Ask a question, get the fortune!
	fortune: function(message, splitted) {
		if (splitted[1] == null) {
			return "You didn't ask the **Almighty Skynet** a question.";
		} else {
			var random = Math.floor((Math.random() * fa.arr.length));
			return message.author.mention() + ":crystal_ball:*"+fa.arr[random]+"*:crystal_ball:";
		}
	},
}

/* EXTRA FUNCTIONS
	These functions are helpers that are used in the above commands to do frequent checks and speed up the process.
*/

// isAllowed: Checks if a user has a set role.
function isAllowed(user, rank, server) {
	var userRoles = server.rolesOfUser(user);
	for(var i = 0; i < userRoles.length; i++) {
		if(userRoles[i].name == rank) {
			return true;
		}
	}
	return false;
}

// isOnChannel: Checks if the user is on the set channel
function isOnChannel(channel, wantedChannel) {
	if(channel.id == wantedChannel) {
		return true;
	} else {
		return false;
	}
}

// stringifyVotes: ???
function stringifyVotes() {
	
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


// wasMentioned: Checks if the user was mentioned in Discord
function wasMentioned(userID, message){
	var mentions = message.mentions
	for(var i = 0; i < mentions.length; i++){
		if(userID == mentions[i].id){
			return true
		}
	}
	return false
}

// getRole: Gets a set Role from the list of roles of the server.
function getRole(rolename, message){
	var allRoles = message.channel.server.roles;

	// gets member role
	for(var i = 0; i < allRoles.length; i++){
		if(allRoles[i].name == rolename){
			return allRoles[i];
		}
	}
}

// unixToTime: Converts UNIX timestamps into real time.
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