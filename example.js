var request = require('request');
var cheerio = require('cheerio');
var url =  'http://www.yelp.com/biz/shake-shack-new-york-9';
var our_text = [];
var old_news_count = [];

request(url, function(error, response, html){

  if (!error && response.statusCode == 200){
    var $ = cheerio.load(html);
    $('p.review_comment').each(function(i, element){
      var a = $(this);
		    our_text.push(a.text());
    });
  }
  var all_text = our_text.join(" ");

  console.log(url);
  old_news_count = all_text.match(/location|classic|line|institution|list|tourist/g);
  console.log("old news count is:");
  console.log(old_news_count.length);

  undiscovered_count = all_text.match(/little|authentic|hidden|hole in the wall|hole-in-the-wall|homemade|secret|gem|undiscovered|intimate|unique|different'/g);
  console.log("undiscovered count is:");
  console.log(undiscovered_count.length);

  introverted_count = all_text.match(/home|polite|welcoming|homemade|gourmet|date|ambience|intimate|quiet/g);
  console.log("introverted count is:");
  console.log(introverted_count.length);

  extroverted_count = all_text.match(/fucking|people watching|dj|DJ|upbeat|happy hour|drunk|party|loud|crowd/g);
  console.log("extroverted count is:");
  console.log(extroverted_count.length);
});

// var old_news = ['packed', 'location', 'classic', 'line', 'institution', 'list', 'tourist', 'to do'];
// var undiscovered = ['authentic', 'hidden', 'hole in the wall', 'hole-in-the-wall', 'homemade', 'secret', 'gem', 'undiscovered', 'intimate', 'unique', 'different'];
// var introverted = ['home', 'polite', 'welcoming', 'homemade', 'gourmet', 'date', 'ambience', 'intimate', 'quiet'];
// var extroverted = ['fucking', 'people watching', 'dj', 'DJ', 'upbeat', 'happy hour', 'drunk', 'party', 'loud', 'crowd'];


// old_news_count = our_text.match(/packed|location|classic|line|institution|list|tourist/g);
//         console.log("old news count is:");
//         console.log(old_news_count);
//         console.log(old_news_count.length);






