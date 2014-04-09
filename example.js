
var request = require('request');
var cheerio = require('cheerio');
var async = require('async');


module.exports = { get_ratings: function(url, callback){


var url =  url;
var our_text = [];
var old_news_count = [];
var num_reviews = 0;

request(url, function(error, response, html){

  if (!error && response.statusCode == 200){
    var $ = cheerio.load(html);
    $('p.review_comment').each(function(i, element){
      num_reviews++;
      var a = $(this);
		    our_text.push(a.text());
    });
  }
  var all_text = our_text.join(" ");

  console.log("in get rating" + url);
  old_news_count = all_text.match(/location|classic|line|institution|list|tourist/g);

  
  if (old_news_count != null){
  old_count = old_news_count.length
  }
  else{
  old_count = 0;
  }

  undiscovered_count = all_text.match(/little|authentic|hidden|hole in the wall|hole-in-the-wall|homemade|secret|gem|undiscovered|intimate|unique|different'/g);



  if (undiscovered_count != null){
  undiscovered_count = undiscovered_count.length
  }
  else{
  undiscovered_count = 0;
  }


  introverted_count = all_text.match(/home|polite|welcoming|homemade|gourmet|date|ambience|intimate|quiet/g);





 if (introverted_count != null){
 introverted_count = introverted_count.length
  }
  else{
  introverted_count = 0;
  }


  extroverted_count = all_text.match(/fucking|people watching|dj|DJ|upbeat|happy hour|drunk|party|loud|crowd/g);

 
 if (extroverted_count != null){
 extroverted_count = extroverted_count.length
  }
  else{
  extroverted_count = 0;
  }

  
  var dict_rating= {url: url, old_news: old_count, undiscovered: undiscovered_count, introverted: introverted_count, extroverted: extroverted_count}
  console.log(dict_rating);
  callback(dict_rating);
});
}

// var old_news = ['packed', 'location', 'classic', 'line', 'institution', 'list', 'tourist', 'to do'];
// var undiscovered = ['authentic', 'hidden', 'hole in the wall', 'hole-in-the-wall', 'homemade', 'secret', 'gem', 'undiscovered', 'intimate', 'unique', 'different'];
// var introverted = ['home', 'polite', 'welcoming', 'homemade', 'gourmet', 'date', 'ambience', 'intimate', 'quiet'];
// var extroverted = ['fucking', 'people watching', 'dj', 'DJ', 'upbeat', 'happy hour', 'drunk', 'party', 'loud', 'crowd'];


// old_news_count = our_text.match(/packed|location|classic|line|institution|list|tourist/g);
//         console.log("old news count is:");
//         console.log(old_news_count);
//         console.log(old_news_count.length);



}

