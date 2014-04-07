var server = require ("./server");
var router = require("./router");

var yelp = require("yelp").createClient({
  consumer_key: "TlvcrLxI31z8tazhN-E6yA", 
  consumer_secret: "4B0fKzUqczD4ad8vCaAU3prsvmw",
  token: "BgYo185ghZw7BzEg1GQ4v51Wjv7OvTKm",
  token_secret: "4fWit1dThh5s7Eep0G9NypPAtL0"
});

// See http://www.yelp.com/developers/documentation/v2/search_api
yelp.search({term: "food", location: "Chinatown, New York"}, function(error, data) {
  console.log(error);
  console.log(data);
});

// See http://www.yelp.com/developers/documentation/v2/business
yelp.business("yelp-san-francisco", function(error, data) {
  console.log(error);
  console.log(data);
});

server.start(router.route);
