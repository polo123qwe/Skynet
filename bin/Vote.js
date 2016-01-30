//vote related
var votes = new Map();
var output = "";
var voted = [];


module.exports = Vote;

function Vote(options){
	
	output = "";
	voted = [];	
	
	for(var i = 0; i < options.length; i++){
		votes.set(options[i], 0);
	}
	
	options = options.toString().split(",").join(" ");
	

	return options;
	
}

Vote.prototype = {
	constructor: Vote,
	
	addVote: function(vote, id){
				// if options exists
		var count = votes.get(vote);
		if(count == undefined){
			return "Failed to vote.\n"+getOptions();
		} else {
			// and if note voted before
			if(contains(id)){
				return "User <@"+id+"> already voted.";
			} else {
				voted.push(id);
			}

			votes.set(vote, count+1);
			return "Your vote `"+vote+"` was added successfully.";
		}
	},
	
	endVote: function(){
		
		var output = "";
		votes.forEach(printVotes)
		
		return "Vote ended, results:\n```\n"+output+"\n```";
		
		////printVotes
		function printVotes(val, key, map){
			output += "> "+key+": "+val+"\n";
		}
	},
	
	getOptions: function(){
		return getOptions();
	}

}

function contains(id) {
	for (var i = 0; i < voted.length; i++) {
		if (voted[i] == id) {
			return true;
		}
	}
	return false;
}
function getOptions(){
	var iterator = votes.keys();
	var result = "Votes available:\n```";

	var col = iterator.next();	
	while(!col.done){
		result += "> " + col.value + "\n";
		col = iterator.next();
	}
	return result+"```";
}