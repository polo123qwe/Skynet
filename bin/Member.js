var members = new Map();
//THIS MAP CONTAINS A STRING AS KEY AND A STRING ARRAY AS VALUE
module.exports = Members;

function Members() {
	//console.log("Members built");
}

Members.prototype = {
	constructor: Members,
	
	//Add a member to the map <userID userID, String[] rs>
	addMember: function(userID, rs){
		if(rs==null) rs = [];
		if(!members.has(userID)){
			members.set(userID, rs);
			return true;
		} else return false;
	},
	
	assignRank: function(member, rank){
		var m = members.get(member);
		if(m != null){
			m.push(rank);
			return true;
		} else return false;
	},
	
	
	revokeRank: function(member, rank){
		
		var m = members.get(member);
		if(m != null){
			for(var i = 0; i < m.length; i++) {
				if(m[i] == rank) {
					m.splice(i, 1);
					return true;
				}
			}
		}
		return false;
	},
	
	//Find a command in the array <String str>
	getRank: function(str){
		var m = members.get(str)
		if(m != null)
			return m;
		else return null;
	},
}