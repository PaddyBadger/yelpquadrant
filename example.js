var request = require('request');
var cheerio = require('cheerio');
console.log('sjkfjlsd1');
var url =  'http://www.yelp.com/biz/lali-restaurant-new-york';
console.log('2');
var our_text = ' ';
var old_news_count = [];

request(url, function(error, response, html){

  if (!error && response.statusCode == 200){
    var $ = cheerio.load(html);
    $('p.review_comment').each(function(i, element){
      var a = $(this);
	      //console.log(a.text());
		our_text = (a.text());
		old_news_count = our_text.match(/packed|location|classic|line|institution|list|tourist/g);
	console.log("old news count is:");
	console.log(old_news_count);
	    console.log(old_news_count.length);
    });
  }
});
console.log(our_text)
// var old_news = ['packed', 'location', 'classic', 'line', 'institution', 'list', 'tourist', 'to do'];
// var undiscovered = ['authentic', 'hidden', 'hole in the wall', 'hole-in-the-wall', 'homemade', 'secret', 'gem', 'undiscovered', 'intimate', 'unique', 'different'];
// var introverted = ['home', 'polite', 'welcoming', 'homemade', 'gourmet', 'date', 'ambience', 'intimate', 'quiet'];
// var extroverted = ['fucking', 'people watching', 'dj', 'DJ', 'upbeat', 'happy hour', 'drunk', 'party', 'loud', 'crowd'];


//request(url);






