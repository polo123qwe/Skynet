module.exports = Permissions;

function Permissions(){

	this.clientLevels = ["@everyone","Member","User","Trusted","Governors","Moderator","Chancellors","Operator"];

}

Permissions.prototype = {
	constructor: Permissions,

	checkUserPermissions: function(client, channel){

		var power = 0;

		if(channel.server == null) return this.clientLevels.length-1;
		var roles = channel.server.rolesOfUser(client);
		//FIX THIS
		if(roles == null) return 0;
		if(roles.length == 0) return this.clientLevels.length;

		for(var i = 0; i < roles.length; i++){
			var newpower = this.clientLevels.indexOf(roles[i].name);
			if(newpower > power)
				power = newpower;
		}
		// console.log(this.clientLevels[power]);
		return power;
	},
}
