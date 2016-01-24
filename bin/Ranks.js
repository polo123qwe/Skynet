var ranks = new Map();
//THIS MAP CONTAINS A STRING AS KEY AND A STRING ARRAY AS VALUE
module.exports = Ranks;

function Ranks() {
	//console.log("Ranks built");
}

Ranks.prototype = {
	constructor: Ranks,
	
	//Add a rank to the map <userID userID, String[] rs>
	addRank: function(rank, commands){
		if(commands == null) commands = [];
		if(!ranks.has(rank)){
			ranks.set(rank, commands);
			return true;
		} else return false;
	},
	
	//
	canDo: function(rank, command){
		
		var r = ranks.get(rank);
		if(r != null){
			for(var i = 0; i < r.length; i++) {
				if(r[i] == command) {
					return true;
				}
			}
		}
		return false;
	},
	
	//Add a command to the rank <String rank, String command>
	addPermission: function(rank, command){
		
		var r = ranks.get(rank);
		if(r != null){
			r.push(command);
			return true;
		} else return false;
		
	},
	
	//Remove a command to the rank <String rank, String command>
	removePermission: function(rank, command){
		
		var r = ranks.get(rank);
		if(r != null){
			for(var i = 0; i < r.length; i++) {
				if(r[i] == command) {
					r.splice(i, 1);
					return true;
				}
			}
		}
		return false;
	},
	
	//Find a rank in the array <String str>
	getRank: function(str){
		var r = ranks.get(str);
		if(r != null)
			return r;
		else return null;
	},
}