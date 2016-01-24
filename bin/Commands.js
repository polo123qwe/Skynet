var commands = new Map();
//THIS MAP CONTAINS A STRING AS KEY AND A FUNCTION AS VALUE
module.exports = Commands;

function Commands() {
	//console.log("Commands built");
}

Commands.prototype = {
	constructor: Commands,
	
	//Add a command to the set of commands <String str, function()>
	add: function(str, argument){
		
		if(!commands.has(str)){
			commands.set(str, argument);
			return true;
		} else return false;
	},
	
	//Find a command in the array <String str>
	get: function(str){
		var c = commands.get(str);
		if(c != null)
			return c;
		else return null;
	},
	
	getKeys: function(){
		return commands.keys();
	}
}

