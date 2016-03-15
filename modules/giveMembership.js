var functions = require('../bin/functions.js');
//giveMembership
//Gives membership to a user
module.exports = {
	//here goes the name of the function
	run: function(message, splitted, mybot){

		var result = functions.addUserToRole(splitted[1], "Member", message.channel.server, mybot);
		if(result == 0)
			return splitted[1]+", you've been given membership for **"+message.channel.server+"** by "+message.author.mention()+".";
		else return result;
	},
	//What to return on help
	help: "`giveMembership!` @user Grants membership to the user",
	//Power needed to execute the command
	power: 4,

	permissions: ["manageRoles"],
};
