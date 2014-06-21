var FollowDB = require('../volatileDB/follow');

var q = require('q');

//Handle Creating a new Follow action betwwen two users
exports.Create = function(follow) {
	var deferred = q.defer();

	try {
		var d = FollowDB.Insert(follow);
		deferred.resolve(d);
	} catch (err) {
		deferred.reject(err);
	}

	return deferred.promise;
};

//Get all follow actions
exports.Get = function() {
	try {
		var deferred = q.defer();

		var followees = FollowDB.Get();

		deferred.resolve(followees);
	} catch (err) {
		deferred.reject();
	}

	return deferred.promise;
}

//Get Followees of a certain user given their username
exports.GetFollowees = function(user) {

	var deferred = q.defer();

	var followees = FollowDB.Get()
		.filter(function(followee) {
			return followee.follower == user;
		});

	deferred.resolve(followees);

	return deferred.promise;
}

