var Follows = [];

var last_id = 0;

exports.Get = function() {
	return Follows;
}

exports.Insert = function(follow) {
	var id = last_id++;
	follow.id = id;

	Follows.push(follow);

	return follow;
};
