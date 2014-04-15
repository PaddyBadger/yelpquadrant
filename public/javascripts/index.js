var example = require("./example");
var async = require("async");
var jsonData;

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


module.exports = { get_info: function(category, location, cbf){

  yelp.search({term: category, location: location}, function(error, data) {
    console.log(error);
    var restaurant_urls = get_urls(data);
    var i;
    var rating_list = []
  

    async.each(restaurant_urls, function(item, callback){
        example.get_ratings(item, function(rating_dict) {
            rating_list.push(rating_dict);  

        callback();
    })}, function(err){
      
      for(var i =0; i< rating_list.length; i++){
      }
      rest_of_program(rating_list);
    });
});// end of each

var get_urls = function(data){
  var i = 0;
  var urls = []
  number_businesses = data['businesses'].length;
  for(i = 0; i< number_businesses; i++){
    var dict = {};
    dict['url'] = data['businesses'][i]['url']; 
    dict['name'] = data['businesses'][i]['name'];
    dict['image_url'] = data['businesses'][i]['image_url'];
    urls.push(dict);
  }
  return urls;
};



  var rest_of_program = function(rating_list){
    var ext_max = 0;
    var ext_min = 0;
    var old_max = 0;
    var old_min = 0;
    rating_list = make_two_axes(rating_list)
    for (var i=0; i< rating_list.length; i++){
      
      if(rating_list[i]['extroverted']> ext_max){
        ext_max = rating_list[i]['extroverted']

      }
      if(rating_list[i]['extroverted']< ext_min){
        ext_min = rating_list[i]['extroverted']
        
      }
      if(rating_list[i]['old_news']> old_max){
        old_max = rating_list[i]['old_news']
      }
      if(rating_list[i]['old_news']< old_min){
        old_min=rating_list[i]['old_news']
      }
    }

      for(var i=0; i< rating_list.length; i++){
       // console.log(rating_list[i]['url']);
        rating_list[i]['extroverted'] = ((rating_list[i]['extroverted']- ext_min)/((ext_max-ext_min))*20)-10
       // console.log("norm_ext: "+ norm_ext);
          rating_list[i]['old_news'] = ((rating_list[i]['old_news']- old_min)/((old_max-old_min))*20)-10
       // console.log("norm_old: " + norm_old);
      }
     // var jsonData = JSON.stringify(rating_list);
      console.log(rating_list);
      cbf(rating_list);
  };


var make_two_axes = function(rating_list){
 for (var i=0; i< rating_list.length; i++){
    rating_dict = rating_list[i];
    
    rating_dict['extroverted'] = rating_dict['extroverted'] - rating_dict['introverted'];
    rating_dict['old_news'] = rating_dict['old_news'] - rating_dict['undiscovered'];
    delete rating_dict['introverted'];
    delete rating_dict['undiscovered'];
  }
  return rating_list;
}}};

