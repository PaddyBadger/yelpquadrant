var express = require('express');
var router = express.Router();
var apiJS = require('../public/javascripts/index');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});

router.get('/send', function(req, res) {
  var category = req.param('category');
  var location = req.param('location');
  apiJS.get_info(category, location);

});

module.exports = router;
