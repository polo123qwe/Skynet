//color

module.exports = {
	
	//BROKEN PLS FIX
	
	//here goes the name of the function
	"color": function(message, splitted, mybot){	

		var memberID = splitted[1].replace(/<|@|>/ig,"");					// Grab the user from the message
		var hexColor = splitted[2];											// Grab the color in Hex from the message
		var rolesCache = message.channel.server.roles;						// Store the server roles in a cache
		var userRoleList = message.channel.server.rolesOfUser(memberID)		// Store the roles of the user in a variable
		var colorRole;
		
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

		// Check for errors in the color selected
		if(hexColor == null) return "`Error:` You didn't type a color code.";
		if(hexColor.length != 6) return "`Error:` Lenght of color code is either too short or too long.";

		// Checking to see if the user already has a color role. If this is the case, remove that
		for(i = 0; i < userRoleList.length; ++i) {
			if(userRoleList[i].name.substring(0, 8) == "Color(0x"){
				mybot.removeMemberFromRole(memberID, userRoleList[i]);
			}
		}

		// Checking to see if the color role already exists
		for(i = 0; i < rolesCache.length; ++i) {
			if(rolesCache[i].name == "Color(0x"+hexColor+")") {
				colorRole = rolesCache[i];
				mybot.addMemberToRole(memberID, colorRole);
				return "Color changed successfully!";
			}
		}
		
		// If previous check doesn't match, then create the color role.
		mybot.createRole(message.channel.server, permissions, function(){
			// Assigns Role
			for(var i = 0; i < rolesCache.length; ++i) {
				if(rolesCache[i].name == "Color(0x"+hexColor+")") {
					colorRole = rolesCache[i];
				}
			}

			mybot.addMemberToRole(memberID, colorRole);
			
		});

		return "Color changed successfully!";
	},
	//What to return on help
	"aid": function(){
		return "`color! @user hex` Change user color to the hex specified";
	},
	//Power needed to execute the command
	"power": 4,
};