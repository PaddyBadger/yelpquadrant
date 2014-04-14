var express = require('express');
var router = express.Router();
var apiJS = require('../public/javascripts/index');
var home = require(__dirname, 'views/index');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});

router.get('/send', function(req, res) {
  var category = req.query.category;
  var location = req.query.location;
  apiJS.get_info(category, location, function(data) {
     res.json(data);
  });
});

module.exports = router;
