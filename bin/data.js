var Commands = require('./Commands.js');
var Func = require('./Func.js');

var cmds = new Commands();
var func;

module.exports = data;

function data(){

}

data.prototype = {
	constructor: data,

	//COMMANDS
	cmdStartup: function(allRoles){
		
		
		var warnRole, mutedRole, memberRole;
		for (var i = 0; i < allRoles.length; i++){
			if(allRoles[i].name == "Warning"){
				warnRole = allRoles[i];
				break;
			}
			if(allRoles[i].name == "Muted"){
				mutedRole = allRoles[i];
				break;
			}
			if(allRoles[i].name == "Member"){
				memberRole = allRoles[i];
				break;
			}
		}
		
		func = new Func(warnRole, mutedRole, memberRole);
		
		//ADD A COMMAND HERE
		cmds.add("help!", func.help);
		cmds.add("ping!", func.ping);
		cmds.add("getMyID!", func.getMyID);
		cmds.add("getChannelID!", func.getChannelID);
		cmds.add("warn!", func.warn);
		cmds.add("report!", func.report);
		cmds.add("urban!", func.urban);
		cmds.add("mal!", func.mal);
		cmds.add("time!", func.time);
		cmds.add("editEvent!", func.editEvent);
		cmds.add("showEvent!", func.showEvent);
		cmds.add("bestRating!", func.bestRating);
		cmds.add("lennyface!", func.lennyface);
		cmds.add("giveMembership!", func.giveMembership);
		cmds.add("proveActive!", func.proveActive);
		// cmds.add("enroll!", func.enroll);
		cmds.add("vote!", func.vote);
		cmds.add("startVote!", func.startVote);
		cmds.add("endVote!", func.endVote);
		cmds.add("getVoteOptions!", func.getVoteOptions);
		cmds.add("wiki!", func.wiki);
		cmds.add("fortune!", func.fortune);
		
		return cmds;
	},
}

