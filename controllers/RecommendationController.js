var recommender = require('../utils/recommender');

// Enpoints
// GET /recommendations?user=USER_ID
// Returns reommendations of songs for a user
exports.recommend = function(request, response) {

    recommender.recommendation(request.query.user)
        .then(
            function success(data) { 
                response.statusCode = 200; response.json({"list":data}); 
            },
            function failure(data) { 
                response.statusCode = 500; response.send("failure"); 
            }
        )
}
