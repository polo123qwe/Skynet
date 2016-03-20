module.exports = {
    roll: {
    	//here goes the name of the function
    	run: function(message, splitted, mybot){

    		var num = splitted[1];
    		if(num == null || parseInt(num) == NaN || num < 1){
    			num = 10;
    		}
    		return message.author.name+", you have rolled "+Math.floor((Math.random() * num) + 1);
     	},
    	//What to return on help
    	help: "roll! num - retruns a number between 1 and num",
    	//Power needed to execute the command
    	power: 0,
    	permissions: [],
    },

    urban: {
    	//here goes the name of the function
    	run: function(message, splitted, mybot){
    		var result = splitted.slice();

    		if (splitted[1] == null){
    			return "Not enough arguments.";
    		} else {
    			result = result.splice(1, result.length);
    			result = result.toString().split(",").join("+");
    			return "http://www.urbandictionary.com/define.php?term="+result;
    		}
    	},
    	//What to return on help
    	help: "urban! word - Searches Urban Dictionary for a definition",

    	//Power needed to execute the command
    	power: 0,

    	permissions: [],
    },

}
