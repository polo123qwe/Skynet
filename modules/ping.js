//ping

module.exports = {
	
	this: require('./template.js'),
	
	"ping": function(){
		return "pong!";
	},
	
	"aid": function(){
		return "`ping!` returns pong!";
	},
	"power": 0,
};