var Listens = [];
var last_id = 0;

//Insert rows into Listen model
exports.Insert = function(listen) {
	var id = last_id++;
	listen.id = id;

	Listens.push(listen);
	return listen;
}

exports.Get = function() {
	return Listens;
}

