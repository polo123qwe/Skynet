
	//startVote //startVote! name option1 option2 option3 ...
	startVote: function(message, splitted){
		// if(!isAllowed(message.author, "Operator", message.channel.server)){
			// if(!isAllowed(message.author, "Moderator", message.channel.server)){
				// return "Access Denied.";
			// }
		// }

		// if(splitted[3] == null) return "Not enough parameters. Usage: `startVote! name option1 option2 option3 ...`";
		
		// var actualVote = new Vote(splitted.splice(2, splitted.length));
		actualVote = new Vote(splitted.splice(2, splitted.length));
		
		// votes.set(splitted[1], actualVote);
	
		// console.log("Voting started! ["+message.author.username+", "+message.channel.name+", "+actualVote.getOptions()+"]");
		// return "Voting started! "+actualVote.getOptions();
	},

	//vote //vote! name option
	vote: function(message, splitted){
		
		// if(splitted[1] == null){
			// return "Please type the name of the vote.\n"+stringifyVotes();
		// } else {
			// var actualVote = votes.get(splitted[1]);
			// if(actualVote == undefined) return splitted[1]+" is not currently in progress.\n"+stringifyVotes();
			
			// if(splitted[2] == null) return "Error, type vote! name option"+actualVote.getOptions();
			
			// var id = message.author.id;
			
			// return actualVote.addVote(splitted[2], id);
		// }
	},
	
	//endVote //endVote!
	endVote: function(message, splitted){
		
		// if(!isAllowed(message.author, "Operator", message.channel.server)){
			// if(!isAllowed(message.author, "Moderator", message.channel.server)){
				// return "Access denied";
			// }
		// }
		
		// if(splitted[1] == null) return "Type the name of the vote to remove.\n"+stringifyVotes();

		// var actualVote = votes.get(splitted[1]);
		
		// if(actualVote == undefined) return splitted[1]+" is not currently in progress.\n"+stringifyVotes();
		
		// var result = "Vote ended successfully.\n"+actualVote.endVote();
		
		// votes.delete(splitted[1]);
		
		actualVote = null;
		
		// return result;

	},