//rebel

module.exports = {
	//here goes the name of the function
	"rebel": function(message, splitted, mybot){
		
		var result = functions.addUserToRole(splitted[1], "Rebel", message.channel.server, mybot);
		if(result == 0)
			return splitted[1]+", you are now a rebel thanks to "+message.author.mention()+".";
		else return result;
	},
	//What to return on help
	"aid": function(){
		return "This command has no help";
	},
	//Power needed to execute the command
	"power": 4,
};