//template

module.exports = {
	//here goes the name of the function
	run: function(message, splitted, mybot){
		mybot.sendMessage(message.author, "pong!");
		return;
	},
	//What to return on help
	help: "`ping2!` pings to PM",
	//Power needed to execute the command
	power: 0,

	permissions: [],
};
