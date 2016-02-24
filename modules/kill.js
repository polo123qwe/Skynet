//kill
//Kills the bot
module.exports = {
	//here goes the name of the function
	"kill": function(message, splitted, mybot){	
		
		mybot.sendMessage(message.channel, "*I'll be back!*", false, function(){
			process.exit(1);
		});
		return null;
	},
	//What to return on help
	"aid": function(){
		return "`kill!` Kills the bot";
	},
	//Power needed to execute the command
	"power": 4,
};