//vote related

// var votes = new Map();
// var output = "";
// var voted = [];

module.exports = Vote;

function Vote(options){
	
	this.votes = new Map();
	this.voted = [];
	
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
		var count = this.votes.get(vote);
		if(count == undefined){
			return "Failed to vote.\n"+getOptions(this.votes);
		} else {
			// and if note voted before
			if(contains(id, this.voted)){
				return "User <@"+id+"> already voted.";
			} else {
				this.voted.push(id);
			}

			this.votes.set(vote, count+1);
			return "Your vote `"+vote+"` was added successfully.";
		}
	},
	
	endVote: function(){
		
		var output = "";
		this.votes.forEach(printVotes)
		
		return "Results:\n```\n"+output+"\n```";
		
		////printVotes
		function printVotes(val, key, map){
			output += "> "+key+": "+val+"\n";
		}
	},
	
	getOptions: function(){
		return getOptions(this.votes);
	}

}

function contains(id, arr) {
	for (var i = 0; i < arr.length; i++) {
		if (arr[i] == id) {
			return true;
		}
	}
	return false;
}
function getOptions(map){
	var iterator = map.keys();
	var result = "Options available:\n```";

	var col = iterator.next();	
	while(!col.done){
		result += "> " + col.value + "\n";
		col = iterator.next();
	}
	return result+"```";
}