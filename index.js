var server = require ("./server");
var router = require("./router");
var example = require("./example");
var async = require("async");

function restaurant(){
  this.name = '';
  this.address = '';
  this.extraversion = null;
  this.old_news = null;
  this.price = '';
}


var yelp = require("yelp").createClient({
  consumer_key: "TlvcrLxI31z8tazhN-E6yA", 
  consumer_secret: "4B0fKzUqczD4ad8vCaAU3prsvmw",
  token: "BgYo185ghZw7BzEg1GQ4v51Wjv7OvTKm",
  token_secret: "4fWit1dThh5s7Eep0G9NypPAtL0"
});

if( process.argv.length<=2){
  return null;
}
else{
  var category = process.argv[2];
}

if( process.argv.length > 3) {
  var location = process.argv[3];

  // See http://www.yelp.com/developers/documentation/v2/search_api
  yelp.search({term: category, location: location}, function(error, data) {
    console.log(error);
    var restaurant_urls = get_urls(data);
    console.log(restaurant_urls);
    var i;
    var rating_list = []
    console.log("before each");
    



    async.each(restaurant_urls, function(item, callback){
        example.get_ratings(item, function(rating_dict) {
            rating_list.push(rating_dict);  
            console.log("call back from get rating");

        callback();
    })}, function(err){
      console.log("*********here's the rating list");
      for(var i =0; i< rating_list.length; i++){
        console.log(rating_list[i]);
      }
      rest_of_program(rating_list);
    });
});// end of each

console.log("end of each");

}// end if

var get_urls = function(data){
  var i = 0;
  var urls = []
  number_businesses = data['businesses'].length;
  for(i = 0; i< number_businesses; i++){
    urls.push(data['businesses'][i]['url']);

  }
  return urls;
};



var rest_of_program = function(rating_list){
  var ext_max = 0;
  var ext_min = 0;
  var old_max = 0;
  var old_min = 0;
  var two_axes_list = make_two_axes(rating_list)
  for (var i=0; i< two_axes_list.length; i++){
    console.log(two_axes_list[i]);
    if(two_axes_list[i]['extroverted']> ext_max){
      ext_max = two_axes_list[i]['extroverted']

    }
    if(two_axes_list[i]['extroverted']< ext_min){
      ext_min = two_axes_list[i]['extroverted']
      
    }
    if(two_axes_list[i]['old_news']> old_max){
      old_max = two_axes_list[i]['old_news']
    }
    if(two_axes_list[i]['old_news']< old_min){
      old_min=two_axes_list[i]['old_news']
    }
  }

  console.log("old_min: " + old_min);
    console.log("old_max: " + old_max);
  console.log("ext_min: " + ext_min);
    console.log("ext_max: " + ext_max);

    for(var i=0; i< two_axes_list.length; i++){
      console.log(two_axes_list[i]['url']);
      var norm_ext = ((two_axes_list[i]['extroverted']- ext_min)/((ext_max-ext_min))*20)-10
      console.log("norm_ext: "+ norm_ext);
        var norm_old = ((two_axes_list[i]['old_news']- old_min)/((old_max-old_min))*20)-10
      console.log("norm_old: " + norm_old);


    }




};

var make_two_axes = function(rating_list){
  new_ratings = []
 for (var i=0; i< rating_list.length; i++){
  new_dict = {}
    rating_dict = rating_list[i];
    new_dict['url'] = rating_dict['url'];
    new_dict['extroverted'] = rating_dict['extroverted'] - rating_dict['introverted'];
    new_dict['old_news'] = rating_dict['old_news'] - rating_dict['undiscovered'];
    new_ratings.push(new_dict)
  }
  return new_ratings
};

// // See http://www.yelp.com/developers/documentation/v2/search_api
// yelp.search({term: "food", location: "Chinatown, New York"}, function(error, data) {
//   console.log(error);
//   console.log(data);
// });

// // See http://www.yelp.com/developers/documentation/v2/business
// yelp.business("yelp-san-francisco", function(error, data) {
//   console.log(error);
//   console.log(data);
// });

//server.start(router.route);
