var followModel = require('../models/Follow');


// Enpoint to handlw follow event
// POST /follow
exports.follow = function(request, response) {
    var follower = request.body.follower;
    var followee = request.body.followee;

    var follow = {
        follower : follower,
        followee : followee
    };

    //Create new follow item.
    followModel.Create(follow)
        .then(

            function success(data) { 
                response.statusCode = 201; 
                response.send("Success"); 
                },

            function failure(data) { 
                response.statusCode = 500; 
                response.send("Failure"); 
                }
        );
}
