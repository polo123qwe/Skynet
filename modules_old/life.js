//template

module.exports = {
	//here goes the name of the function
	run: function(message, splitted, mybot){

        if(splitted[1] == null) return "Ask a question";

        i = Math.floor(Math.random()*answers.length);

        return answers[i];
	},
	//What to return on help
	help: "`life! question` Returns the only true answer (by Usagi)",
	//Power needed to execute the command
	power: 0,

	permissions: [],
};

answers = ["Not a fucking chance",
            "Maybe",
            "Yeah right!",
            "Of course",
            "Pffft, No",
            "Error 404",
            "Usagi says yes",
            "I'd rather die than answer that"];
            //By Usagi
