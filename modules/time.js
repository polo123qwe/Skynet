//time
//Returns time in a timezone using GMT standard
module.exports = {
	//Name of the function
	"time": function(message, splitted){
		var date = new Date(Date.now());
		
		var time = splitted[1];
		var utc;
		
		if(time != null){
			utc = time.substring(0,4).toUpperCase();

			if(utc != "GMT+" && utc != "GMT-" && utc != "GMT") return null;
			
			var offset = parseInt(time.substring(4,6));
			
			if(offset>12) {
				offset = 12;
				time = "GMT+12"
			}
			
			if(utc.charAt(3) == "+")
				date = new Date(date.getTime()+(offset*3600000));
			else date = new Date(date.getTime()-(offset*3600000));
			
		} else time = "GMT";
		
		var h = date.getUTCHours();
		h = (h < 10 ? "0" : "") + h;
		var m  = date.getUTCMinutes();
		m = (m < 10 ? "0" : "") + m;
		var s  = date.getUTCSeconds();
		s = (s < 10 ? "0" : "") + s;
		var Y = date.getUTCFullYear();
		var M = date.getUTCMonth() + 1;
		M = (M < 10 ? "0" : "") + M;
		var D  = date.getUTCDate();
		D = (D < 10 ? "0" : "") + D;
		
		return "**"+time.toUpperCase()+"** Standard Time: `"+D+"/"+M+"/"+Y+" "+h+":"+m+":"+s+"`";
	},
	//What to return on help
	"aid": function(){
		return "`time! GMT+X` returns current time at X timezone";
	},
	//Power needed to execute the command
	"power": 0,
};