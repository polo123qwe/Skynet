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
		cmds.add("help!", [this.help, helping("help")]);
		cmds.add("ping!", [func.ping, helping("ping")]);
		cmds.add("getMyID!", [func.getMyID, helping("getMyID")]);
		cmds.add("getChannelID!", [func.getChannelID, helping("getChannelID")]);
		cmds.add("warn!", [func.warn, helping("warn")]);
		cmds.add("mute!", [func.mute, helping("mute")])
		cmds.add("report!", [func.report, helping("report")]);
		cmds.add("urban!", [func.urban, helping("urban")]);
		cmds.add("mal!", [func.mal, helping("mal")]);
		cmds.add("time!", [func.time, helping("time")]);
		cmds.add("editEvent!", [func.editEvent, helping("editEvent")]);
		cmds.add("showEvent!", [func.showEvent, helping("showEvent")]);
		cmds.add("lennyface!", [func.lennyface, helping("lennyface")]);
		cmds.add("giveMembership!", [func.giveMembership, helping("giveMembership")]);
		cmds.add("proveActive!", [func.proveActive, helping("proveActive")]);
		cmds.add("vote!", [func.vote, helping("vote")]);
		cmds.add("startVote!", [func.startVote, helping("startVote")]);
		cmds.add("endVote!", [func.endVote, helping("endVote")]);
		cmds.add("wiki!", [func.wiki, helping("wiki")]);
		cmds.add("fortune!", [func.fortune, helping("fortune")]);
		cmds.add("caveJohnson!", [func.caveJohnson, helping("caveJohnson")]);
		cmds.add("rebel!", [func.rebel, helping("rebel")]);
		cmds.add("color!", [func.color, helping("color")]);
		cmds.add("define!", [func.define, helping("define")]);
		cmds.add("conform!", [func.conform, helping("conform")]);
		cmds.add("kill!", [func.kill, helping("kill")]);
		
		return cmds;
	},
		//help //usage: help!
	help: function(){
		// var result = ""+
		// "__**Skynet**__ was developed by: *polo123qwe*, *Soso*, and *Amery*."+
		// "\n`https://github.com/polo123qwe/Skynet`"+
		// "\n"+
		// "\n***Dank Stuff***"+
		// "\n    `urban! <term>` Returns the definition for the selected term from Urban Dictionary*."+
		// "\n    `mal! <username>` Returns the *MyAnimeList* profile of `<username>`."+
		// "\n    `bestRating!` Returns the best possible rating of any rating scale ever."+
		// "\n    `lennyface!` ( ͡° ͜ʖ ͡°)"+
		// "\n    `fortune! <question>` Skynet will respond to your question with his Ultimate Wisdom."+
		// "\n"+
		// "\n***Other***"+
		// "\n    `getMyID!` Returns your Discord ID."+
		// "\n    `getChannelID!` Returns the current channel's ID."+
		// "\n    `ping!` pong!"+
		// "\n    `help!` Shows this menu."+
		// "\n    `time! GMT<timezone>` Shows current time for `GMT<timezone>`."+
		// "\n    `getMembership!` Grants membership to the user requesting it."+
		// "\n    `enroll! GMT<timezone>` Enrolls `<user>` for future elections."+
		// "\n"+
		// "\n***Management Related***"+
		// "\n    `report! <@user> <reason>` Reports `<@user>` for `<reason>`."+
		// "\n    `vote! <option>` Votes for option `<option>`."+
		// "\n    `getVoteOptions!` Returns options for the current vote."+
		// "\n    `giveMembership! <@user>` Gives <@user> membership."+
		// "\n    `proveActive! <@member>` Proves <@member> active."

		var output = "";
		cmds.fEach(printVotes);
		return "__**Skynet**__ was developed by: *polo123qwe*, *Soso*, and *Amery*."+
			"\n`https://github.com/polo123qwe/Skynet`.\nCommandsAvailable:\n\n"+output+"\n";
		
		////printCommands
		function printVotes(val, key, map){
			output += "> "+val[1]+"\n";
		}
	},
}

function helping(command){
	
	switch(command){
		case "help": return "`help!` Show help commands.";
		break;
		case "ping": return "`ping!`.";
		break;
		case "getMyID": return "`getMyID!` Returns your Discord ID.";
		break;		
		case "getChannelID": return "`getChannelID!` Returns the current Channel ID.";
		break;
		case "warn": return "`warn! <@user> <reason>` Warns <@user> for <reason>. Only OP/MD.";
		break;
		case "mute": return "`mute! <@user> <reason>` Mutes <@user> for <reason>. Only OP/MD.";
		break;
		case "report": return "`report! <@user> <reason>` Reports `<@user>` for `<reason>`.";
		break;
		case "urban": return "`urban! <term>` Returns the definition for the selected term from Urban Dictionary.";
		break;
		case "mal": return "`mal! <username>` Returns the *MyAnimeList* profile of `<username>`.";
		break;
		case "time": return "`time! GMT<timezone>` Shows current time for `GMT<timezone>`.";
		break;
		case "editEvent": return "`editEvent!` Edit the current event. Only OP/MD.";
		break;
		case "showEvent": return "`showEvent!` Show the current event.";
		break;
		case "lennyface": return "`lennyface!` ( ͡° ͜ʖ ͡°)";
		break;
		case "giveMembership": return "`giveMembership! <@user>` Grants membership to the user. Only OP/MD.";
		break;
		case "proveActive": return "`proveActive! <@member>` Proves `<@member>` active. Only OP/MD";
		break;
		case "vote": return "`vote! <name> <option>` Votes for option `<option>`.";
		break;
		case "startVote": return "`startVote! <name> <option1> <option2> <option3> ...` Start a vote. Only OP/MD.";
		break;
		case "endVote": return "`endVote! <name>` Ends a vote. Only OP/MD.";
		break;
		case "wiki": return "`wiki! <term>` Returns the wikipedia page of said word.";
		break;
		case "fortune": return "`fortune! <question>` Skynet will respond to your question with his Ultimate Wisdom.";
		break;
		case "color": return "`color! <@user> <hexcode>` Gives `<@user>` the color of `<hexcode>`.";
		break;
		case "rebel": return "`rebel! <@user>` No.";
		break;
		case "caveJohnson": return "`caveJohnson!` LEMOOONS11!!";
		break;
		case "define": return "`define! <word>` Gives definition of <word>."
	}
	
}

