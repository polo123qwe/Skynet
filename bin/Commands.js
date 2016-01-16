var commands = new Map();

module.exports = Commands;

function Commands() {
	//console.log("Commands built");
}

Commands.prototype = {
	constructor: Commands,
	
	//Add a command to the array of commands <String str, function()>
	add: function(str, argument){
		
		if(!commands.has(str)){
			commands.set(str, argument);
			return true;
		} else return false;
	},
	
	//Find a command in the array <String str>
	get: function(str){
		if(commands.has(str))
			return commands.get(str);
		else return null;
	},
	
	getKeys: function(){
		return commands.keys();
	}
}

