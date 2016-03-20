var functions = require('../bin/functions.js');
var Bluebird = require('bluebird');
var Forecast = require('forecast.io-bluebird');

module.exports = {
    time: {
    	//Name of the function
    	run: function(message, splitted){
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
    	help: "time! GMT+X - returns current time at X timezone",

    	//Power needed to execute the command
    	power: 0,

    	permissions: [],
    },

    weather: {
    	run: function(message, splitted, mybot){

    		if(splitted[1] == null) return "Type a city";
    		argument = splitted.splice(1, splitted.length).join().replace(",", " ");
    		functions.geocode(argument, function(err, locat){
    			if(err != null) {
    				console.log('Error: ' + err);
    			} else if( !locat ) {
    				mybot.sendMessage(message.channel, 'No result.');
    			} else {

    				getForecast(locat.geometry.location.lat, locat.geometry.location.lng, locat.formatted_address, argument, mybot, message.channel);
    			}
    		});
    		return null;

    	},
    	//What to return on help
    	help: "weather! city - returns the weather of that city",
    	//Power needed to execute the command
    	power: 0,
    	permissions: [],
    },

}

function getForecast(latitude, longitude, address, argument, mybot, channel){
	var forecast = new Forecast({
	    key: "c6199bfc28582078316aec25fbf4bfb3",
	    timeout: 2500
	});
	var options = {
    	units: 'si',
	};
	forecast.fetch(latitude, longitude, options)
	.then(function(out) {
		out = out.currently;
		var currentWeather = "The weather at "+address+" is: "+"\n -> Summary: "+out.summary
							+".\n -> Temperature: "+out.temperature+"ºC."
							+"\n -> Apparent Temperature: "+out.apparentTemperature+"ºC."+"\n -> Humidity: "
							+out.humidity+".\n";
		mybot.sendMessage(channel, currentWeather);
	})
	.catch(function(error) {
	    console.error(error);
	});
}
