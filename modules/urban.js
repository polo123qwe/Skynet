//urban

module.exports = {
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
	help: "`urban! word` Searches Urban Dictionary for a definition",
	
	//Power needed to execute the command
	power: 0,

	permissions: [],
};
