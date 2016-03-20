module.exports = {
    id: {
    	//Name of the function
    	run: function(message){
    		return message.author.name
    		+", your ID is: `"+message.author.id+"`";
    	},
    	//What to return on help
    	help: "id! - returns your id",
    	//Power needed to execute the command
    	power: 0,
    	permissions: [],
    },

    joined: {
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
    	help: "joined! @user - Join date of the user",
    	//Power needed to execute the command
    	power: 0,
    	permissions: [],
    },

    ava: {
    	//here goes the name of the function
    	run: function(message, splitted, mybot){
            var urls = "";
    		var local = message.cleanContent.replace("ava! ", "").split(", ");
    		var users = mybot.users
    		console.log(users.get("name", "Void"));
    		for(user of local){
    			user = user.replace("@","");
    			user = users.get("name", user)
    			if(user != null)
    				var url = user.avatarURL
    				if(url != null)
    					urls += user.name+":\n"
    					urls += url+"\n";
    		}
            if(urls.length == 0) return "error";
            return urls;
    	},
    	//What to return on help
    	help: "ava! @user/user, @user/user - Returns the avatar of the user",
    	//Power needed to execute the command
    	power: 0,
    	permissions: [],
    },
}
