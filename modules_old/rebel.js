var functions = require('../bin/functions.js');
//rebel

module.exports = {
	//here goes the name of the function
	run: function(message, splitted, mybot){

		var result = functions.addUserToRole(splitted[1], "Rebel", message.channel.server, mybot);
		if(result == 0)
			return splitted[1]+", you are now a rebel thanks to "+message.author.mention()+".";
		else return result;
	},
	//What to return on help
	help: "`rebel! @user` Allows user access to rebel channels",
	//Power needed to execute the command
	power: 4,

	permissions: ["manageRoles"],
};
