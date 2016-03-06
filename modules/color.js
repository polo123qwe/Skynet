//color

module.exports = {

	//here goes the name of the function
	run: function(message, splitted, mybot){

		var currentServer = message.channel.server

		if(splitted[1] == null) return "No user was mentioned.";

		var user = splitted[1].replace(/<|@|>/ig,"");					// Grab the user from the message
		var hexColor = splitted[2];											// Grab the color in Hex from the message
		var rolesCache = currentServer.roles;						// Store the server roles in a cache
		var userRoleList = currentServer.rolesOfUser(user)		// Store the roles of the user in a variable

		var mentions = message.mentions;
		for(mention of mentions){
			if(user == mention.id){
				user = mention;
				break;
			}
		}
		// Check for errors in the color selected
		if(hexColor == null) return "`Error:` You didn't type a color code.";
		if(hexColor.length != 6) return "`Error:` Lenght of color code is either too short or too long.";

		// Set the permissions for the new role that will be created
		var data = {
			color: parseInt("0x"+hexColor),
			name: "Color(0x"+hexColor+")",
			permissions: [],
		}

		// Checking to see if the user already has a color role. If this is the case, remove that
		for(var role of userRoleList) {
			if(role.name.substring(0, 8) == "Color(0x"){
				mybot.removeMemberFromRole(user, role);
			}
		}

		// Checking to see if the color role already exists
		for (var role of rolesCache){
			if(role.name == "Color(0x"+hexColor+")"){
				console.log("Match");
				mybot.addMemberToRole(user, role, function(err){
					if(err)
						console.log(err)
				});
				return "Color changed successfully!";
			}
		}

		// If previous check doesn't match, then create the color role.
		mybot.createRole(currentServer, data, function(err, role){
			console.log(err);
			var colorRole = role;
			mybot.addMemberToRole(user, colorRole, function(err){
			});

		});
		return "Color changed successfully!";
	},
	//What to return on help
	help: "`color! @user hex` Change user color to the hex specified",
	//Power needed to execute the command
	power: 4,

	permissions: ["manageRoles"],
};
