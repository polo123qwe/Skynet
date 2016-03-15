var functions = require('../bin/functions.js');
//joined

module.exports = {
	//here goes the name of the function
	run: function(message, splitted, mybot){
        if(splitted[1] == null) return "error";

        // If another user was mentioned, then we set new variables
        var memberID = splitted[1].replace(/<|@|>/ig,"");					// Get the Member's ID
        var userDetails = message.channel.server.detailsOfUser(memberID);	// Get user details
		var userJoinDate = userDetails.joinedAt;
        // Error Checks
        if(!userJoinDate) return "No user was mentioned.";
		var userJoinDate = userDetails.joinedAt;
        if(memberID == null) return "No user was mentioned.";

        // Return the date, converting it to Standard Time
        return "<@"+memberID+">"+" joined the server on " + functions.unixToTime(userJoinDate) + " GMT.";
	},
	//What to return on help
	help: "`joined! @user` Join date of the user",
	//Power needed to execute the command
	power: 0,

	permissions: [],
};
