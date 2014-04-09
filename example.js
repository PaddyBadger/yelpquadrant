
var request = require('request');
var cheerio = require('cheerio');
var async = require('async');


module.exports = { get_ratings: function(dict, callback){

var url =  dict['url'];
var our_text = [];
var old_news_count = [];
var num_reviews = 0;
var price_range;
var address_components;

request(url, function(error, response, html){

  if (!error && response.statusCode == 200){
    var $ = cheerio.load(html);
     $('span.price-range').each(function(i, element){ 
        var p = $(this);
        price_range = p.text();
    });

    $('p.review_comment').each(function(i, element){
        var a = $(this);
		    our_text.push(a.text());
    });


    $('strong.street-address').each(function(i, element){

        var ad = $(this).find('address');
        address_components = [];
        ad.find('span').each(function(index){
        address_components.push($(this).text());
      });

    });
  }
  var all_text = our_text.join(" ");
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


  dict['price_range'] = price_range;
  dict['address'] = address_components;
  dict['old_news'] = old_count;
  dict['undiscovered'] = undiscovered_count;
  dict['introverted'] = introverted_count;
  dict['extroverted'] = extroverted_count;

  callback(dict);
});
}

}

