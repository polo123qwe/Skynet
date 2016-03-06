var functions = require('../bin/functions.js');
var Bluebird = require('bluebird');
var Forecast = require('forecast.io-bluebird');
//Weather
//retrieves the weather of a given location
module.exports = {
	//here goes the name of the function
	run: function(message, splitted, mybot){

		if(splitted[1] == null) return "Type a city";
		argument = splitted.splice(1, splitted.length).join().replace(",", " ");
		functions.geocode(argument, function(err, locat){
			if(err != null) {
				console.log('Error: ' + err);
			} else if( !locat ) {
				mybot.sendMessage(message.channel, 'No result.');
			} else {
				var result = getForecast(locat.lat, locat.lng, argument, mybot, message.channel);
			}
		});
		return "none";

	},
	//What to return on help
	help: "`weather! city` returns the weather of that city",
	//Power needed to execute the command
	power: 0,

	permissions: [],
};

function getForecast(latitude, longitude, argument, mybot, channel){
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
		var currentWeather = "The weather at "+argument+" is: "+"\n -> Summary: "+out.summary
							+".\n -> Temperature: "+out.temperature+"ºC."
							+"\n -> Apparent Temperature: "+out.apparentTemperature+"ºC."+"\n -> Humidity: "
							+out.humidity+".\n";
		mybot.sendMessage(channel, currentWeather);
	})
	.catch(function(error) {
	    console.error(error);
	});
}
