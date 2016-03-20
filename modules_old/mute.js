var functions = require('../bin/functions.js');
//warn

module.exports = {
	//here goes the name of the function
	run: function(message, splitted, mybot){
		var result = functions.addUserToRole(splitted[1], "Muted", message.channel.server, mybot);
		if(result == 0){
			var arg = splitted.splice(2, splitted.length).join().replace(",", " ");
			ret = splitted[1]+", you have been muted.";
			if(arg){
				return ret+" "+arg+".";
			} else return ret+".";
		} else return result;
	},
	//What to return on help
	help: "`mute! @user reason` mutes a user",

	//Power needed to execute the command
	power: 4,

	permissions: [],
};
