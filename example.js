var request = require('request');
var cheerio = require('cheerio');
console.log('sjkfjlsd1');
var url =  'http://www.yelp.com/biz/lali-restaurant-new-york';
console.log('2');


request(url, function(error, response, html){

  if (!error && response.statusCode == 200){
    var $ = cheerio.load(html);
    $('p.review_comment').each(function(i, element){
      var a = $(this);
		console.log(a.text());
    });
  }
});

//request(url);






