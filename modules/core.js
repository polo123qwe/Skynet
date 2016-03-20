module.exports = {
    ping: {
    	run: function(){
    		return "pong!";
    	},
        //What to return on help
    	help: "ping! - returns pong!",
        //Power needed to execute the command
    	power: 0,
    	permissions: [],
    },

    kill: {
    	run: function(message, splitted, mybot){

    		mybot.sendMessage(message.channel, "*I'll be back!*", false, function(){
    			process.exit(1);
    		});
    		return null;
    	},
    	//What to return on help
    	help: "kill! - Kills the bot",
    	//Power needed to execute the command
    	power: 4,
    	permissions: [],
    },

    help: {
    	//Name of the function
    	run: function(message){
    		return "a42";
    	},
    	//What to return on help
    	help: "help! - sends a PM with the commands available",
    	//Power needed to execute the command
    	power: 0,
    	permissions: [],
    },

    

}
