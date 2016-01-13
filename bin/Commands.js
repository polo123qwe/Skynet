//STORE ALL THE COMMANDS
var Action = require("./Action");

var commands = [];

module.exports = Commands;

function Commands() {
	//console.log("Commands built");
}

Commands.prototype = {
	constructor: Commands,
	
	//Add a command to the array of commands
	add: function(str, argument){
		
		if(this.find(str)==null){
			var action = new Action(str, argument);
			commands.push(action);
			return true;
		}
		return false;		
	},
	
	//Find a command in the array
	find: function(str){
	
		for(var i = 0; i < commands.length; i++){
			if(commands[i].name == str) return commands[i];
		}
		return null;
	},
	
	amount: function(){
		return commands.length;
	},
	
}

