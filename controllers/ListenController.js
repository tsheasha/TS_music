var listenModel = require('../models/Listen');


// Enpoint to handlw listen event
// POST /listen
exports.listen = function(request, response) {
    var user = request.body.user;
    var song = request.body.song;

    var listen = {
        user : user,
        song : song
    };

    //Create new listen item.
    listenModel.Create(listen)
        .then(
            function success(data) { 
                response.statusCode = 201; 
                response.json("Success"); 
                },
            function failure(data) { 
                response.statusCode = 500; 
                response.send("Failure"); 
            }
        );
}

