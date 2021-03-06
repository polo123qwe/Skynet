var http = require('http');
//Some shared functions

module.exports = {
	addUserToRole: function(user, role, server, mybot){

		// Null check
		if(user == null) {
			return "Not enough parameters.";
		}

		if(server == null) {
			return "Cannot execute that in here";
		}

		var memberID = user.replace(/<|@|>/ig,"");

		//Gets the member role from the server
		var memberRole = server.roles;

		memberRole = memberRole.get("name", role);

		//Check if the server has a member role
		if(memberRole == null){
				return "There is no "+role+" role in this server";
		}

		var alreadyMember;
		if(user.roles != null)
			alreadyMember = mybot.memberHasRole(memberID, memberRole);

		//Check if the user is already a member
		if(alreadyMember){
				return "<@"+memberID+"> is already a "+role+".";
		}

		mybot.addMemberToRole(memberID, memberRole);

		//Returns 0 if success
		return 0;
	},

	// Converts UNIX timestamps into real time.
	unixToTime: function(UNIX_timestamp){
	  var a = new Date(UNIX_timestamp);
	  var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
	  var year = a.getUTCFullYear();
	  var month = months[a.getUTCMonth()];
	  var date = a.getUTCDate();
	  var hour = a.getUTCHours();
	  var min = a.getUTCMinutes() < 10 ? '0' + a.getUTCMinutes() : a.getUTCMinutes();
	  var sec = a.getUTCSeconds() < 10 ? '0' + a.getUTCSeconds() : a.getUTCSeconds();
	  var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec ;
	  return time;
  	},

	// Get the users in a message
	getUsersFromMessage(message, mybot){
		message.content.split(" ")

	},

  	// Get Coordinates from a City
	geocode: function(address, callback) {

		var url = "http://maps.googleapis.com/maps/api/geocode/json?address=" + encodeURIComponent(address) + "&sensor=false";

		http.get(url, function(res) {
			if( res.statusCode != 200 ) {
				callback("HTTP status = " + res.statusCode, null);
			} else {
				var output = '';
				res.setEncoding('utf8');
				res.on('data', function (chunk) {
					output += chunk;
				});

				res.on('end', function() {
					var response = JSON.parse(output);
					if( response.status == "OK" ) {
						var location = response.results[0];
						callback(null, location);
					} else if( response.status == "ZERO_RESULTS" ) {
						callback(null, null);
					} else {
						callback("Status = " + response.status, null);
					}
				});
			}
		}).on('error', function(e) {
			callback(e.message, null);
		});

	},
}
