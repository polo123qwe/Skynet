//roll

module.exports = {
	//here goes the name of the function
	"roll": function(message, splitted, mybot){	

		var num = splitted[1];
		if(num == null || parseInt(num) == NaN || num < 1){
			num = 10;
		}
		return message.author.name+", you have rolled "+Math.floor((Math.random() * num) + 1); 
 	},
	//What to return on help
	"aid": function(){
		return "`roll! num` retruns a number between 1 and num";
	},
	//Power needed to execute the command
	"power": 0,
};