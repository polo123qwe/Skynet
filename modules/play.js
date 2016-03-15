//template

module.exports = {
	//here goes the name of the function
	run: function(message, splitted, mybot){
        var arg = splitted.splice(1, splitted.length).join().replace(",", " ");
        if(arg.length == 0) arg = null;
		mybot.setStatus("online",arg, function(err){
            if(!err){
                mybot.sendMessage(message.channel, "Status changed successfully")
            }
        })
	},
	//What to return on help
	help: "`play! game` Changes the bot current game",
	//Power needed to execute the command
	power: 4,

	permissions: [],
};
