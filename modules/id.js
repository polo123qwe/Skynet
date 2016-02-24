//id

module.exports = {
	//Name of the function
	"id": function(message){
		return message.author.name
		+", your ID is: `"+message.author.id+"`";
	},
	//What to return on help
	"aid": function(){
		return "`id!` returns your id";
	},
	//Power needed to execute the command
	"power": 0,
};