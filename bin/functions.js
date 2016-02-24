//Some shared functions

module.exports = {
	addUserToRole: function(user, role, server, mybot){
		
		// Null check
		if(user == null) {
			return "Not enough parameters.";
		}

		var memberID = user.replace(/<|@|>/ig,"");

		//Gets the member role from the server
		var memberRole = server.roles;
		memberRole = memberRole.get("name", role);
		
		//Check if the server has a member role
		if(memberRole == null){
				return "There is no member role in this server";
		}
		
		var alreadyMember = mybot.memberHasRole(memberID, memberRole);

		//Check if the user is already a member
		if(alreadyMember){
				return "<@"+memberID+"> is already a "+role+" of "+server.name;
		}
		
		mybot.addMemberToRole(memberID, memberRole);
		
		//Returns 0 if success
		return 0;
	}
}