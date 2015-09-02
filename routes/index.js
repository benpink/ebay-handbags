var express = require('express');
var router = express.Router();
var request = require('request');

router.use('/designer', require('./category'))
router.use('/item', require('./item'))

/* GET home page. */
router.get('/', function(req, res, next) {
  var designers = ['celine', 'chanel', 'cloe', 'fendi', 'marc jacobs', 'prada', 'burberry'];

  console.log('hit');

  res.render('index', { designers: designers });
});

module.exports = router;
