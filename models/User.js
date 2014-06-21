var q = require('q');

var FollowModel = require('../models/Follow');
var ListenModel = require('../models/Listen');

//Get a certain user and their listened Songs and followees
exports.Get = function(username) {

	var deferred = q.defer();

	var followees = FollowModel.GetFollowees(username);
    
	var listens = ListenModel.GetByUser(username);

	q.all([followees, listens]).then(
		function success(data) {
			deferred.resolve({ 
				user: username,
				follows: data[0].map(
                    function(f) { 
                        return f.followee; 
                    }),
				listenedTo: data[1].map(
                    function(l) { 
                        return l.song; 
                    })
			});

		}
	);
	return deferred.promise;
}
