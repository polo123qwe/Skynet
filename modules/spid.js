//template

module.exports = {
	//here goes the name of the function
	run: function(message, splitted, mybot){
		var spid = "Apples";
		var coding = splitted[1];
		// spid = 10;
		// spid = spid - 2;
		var number = 0;
		while(number < 6){
			console.log("Yuzy is best mom");
			number = number + 2;
		}
		if(spid == coding){
			return "RIP Spid";
		} else {
			return "GG Spid RIP";
		}	
		return spid;
	},
	//What to return on help
	help: "Spid is doing stuff",
	//Power needed to execute the command
	power: 0,

	permissions: [],
};
