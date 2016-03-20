var functions = require('../bin/functions.js');
//warn

module.exports = {
	//here goes the name of the function
	run: function(message, splitted, mybot){
		var result = functions.addUserToRole(splitted[1], "Warned", message.channel.server, mybot);
		if(result == 0){
			var arg = splitted.splice(2, splitted.length).join().replace(",", " ");
			ret = splitted[1]+", you have been warned";
			if(arg){
				return ret+" "+arg+".";
			} else return ret+".";
		} else return result;
	},
	//What to return on help
	help: "`warn! @user reason` warns a user",

	//Power needed to execute the command
	power: 4,

	permissions: [],
};
