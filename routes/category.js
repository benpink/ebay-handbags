var config      = require('../config');
var express     = require('express');
var request     = require('request');
var router      = express.Router();

/* GET category page. */
router.get('/:category', function(req, res, next) {
  var url = 'http://svcs.ebay.com/services/search/FindingService/v1?' +
              'SECURITY-APPNAME=' + config.ebayApiKey +
              '&OPERATION-NAME=findItemsByKeywords' +
              '&SERVICE-VERSION=1.0.0&RESPONSE-DATA-FORMAT=JSON' +
              '&REST-PAYLOAD' +
              '&keywords=' + req.params.category + '%20handbag' +
              '&paginationInput.entriesPerPage=' + config.itemsPerPage;

  request(url, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      var resp = JSON.parse(body);
      res.render('category', { response: resp });
    }
  })
});

module.exports = router;
