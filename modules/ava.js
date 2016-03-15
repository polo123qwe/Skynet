//template

module.exports = {
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
	help: "`ava! @user/user, @user/user` Returns the avatar of the user",
	//Power needed to execute the command
	power: 0,

	permissions: [],
};
