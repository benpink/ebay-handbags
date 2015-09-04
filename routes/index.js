var express = require('express');
var router = express.Router();
var request = require('request');

router.use('/designer', require('./category'));
router.use('/designer', require('./item'));

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

module.exports = router;
