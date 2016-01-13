//STORE EACH COMMAND
var name,
	size;

module.exports = Action;

function Action(str, size) {
	//console.log("Action built");	
	this.name = str;
	this.size = size;
}