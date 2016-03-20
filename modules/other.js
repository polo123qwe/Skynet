module.exports = {
    mal: {
    	run: function(message, splitted, mybot){
    		if(splitted[1] != null){
    			return "http://www.myanimelist.net/profile/"+splitted[1];
    		}else{
    			return "Not enough arguments.";
    		}
    	},
    	//What to return on help
    	help: "mal! user - Retrieves the URL of specified user at MAL",
    	//Power needed to execute the command
    	power: 0,
    	permissions: [],
    },


}
