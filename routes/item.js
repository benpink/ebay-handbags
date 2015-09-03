var config    = require('../config');
var express   = require('express');
var request   = require('request');
var router    = express.Router();

/* GET item page. */
router.get('/:category/:itemId', function(req, res, next) {
  var url = 'http://open.api.ebay.com/shopping?callname=GetSingleItem' +
              '&appid='+ config.ebayApiKey +
              '&siteid=0&version=515' +
              '&responseencoding=JSON' +
              '&ItemID=' + req.params.itemId

  request(url, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      var resp = JSON.parse(body);
      res.render('item', { response: resp, category: req.params.category });
    }
  })
});

module.exports = router;
