//roll

module.exports = {
	//here goes the name of the function
	"roll": function(message, splitted, mybot){	
		
		var num;
		if(splitted[1] == null || typeof splitted[1] != number) num = 10;
		
		return message.author.name+", you have rolled "+Math.floor((Math.random() * num) + 1); 
 	},
	//What to return on help
	"aid": function(){
		return "This command has no help";
	},
	//Power needed to execute the command
	"power": 0,
};