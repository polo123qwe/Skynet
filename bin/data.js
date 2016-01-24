var Commands = require('./Commands.js');
var Ranks = require('./Ranks.js');

var cmds = new Commands();
var ranks = new Ranks();

module.exports = data;

function data(){

}

data.prototype = {
	constructor: data,
	
	//RANKS
	rankStartup: function(){
		var def = this.getDefaultCommands()

		ranks.addRank("Default", def);
		def.push("bestCommand!");

		ranks.addRank("TestSubject", def);
		def.push("assignRank!");

		ranks.addRank("Admin", def);
		return ranks;
	},

	//COMMANDS
	cmdStartup: function(){
		console.log('Initializing <Skynet>');
		//ADD A COMMAND HERE

		cmds.add("help!", this.help);
		cmds.add("ping!", this.ping);
		cmds.add("getMyID!", this.getMyID);
		cmds.add("bestCommand!", this.bestCommand);
		cmds.add("assignRank!", this.assignRank);

		console.log('Ready to operate.');

		return cmds;
	},
	
	getDefaultCommands: function(){
		return ["help!", "!", "ping!", "id!"];
	},

//FUNCTIONS OF THE COMMANDS//
//ADD THE FUNCTION OF THE COMMAND HERE
	//ping
	ping: function(){
		return "pong";
	},
	//help
	help: function(){
		
		var iterator = cmds.getKeys();
		var result = "Commands Available:\n";
		
		var col = iterator.next();	
		while(!col.done){
			result = result + "> " + col.value + "\n";
			col = iterator.next();
		}
		
		return result;
	},
	//id
	getMyID: function(message){
		return message.author.mention()+", your ID is: "+message.author.id;
	},
	//bestCommand
	bestCommand: function(){
		return "THIS IS THE BEST COMMAND EVER";
	},
	//assignRank
	/*assignRank: function(message, argument){ //DO NOT USE THIS YET PENDING IMPLEMENTATION
		if(argument[1]
		return argument.toString();
	}*/
}