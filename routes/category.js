var config      = require('../config');
var express     = require('express');
var request     = require('request');
var router      = express.Router();

/* GET category page. */
router.get('/:category', function(req, res, next) {
  var d = new Date();
  d.setHours(d.getHours() + 1);

  var category  = req.params.category,
      url = 'http://svcs.ebay.com/services/search/FindingService/v1?' +
              'SECURITY-APPNAME=' + config.ebayApiKey +
              '&OPERATION-NAME=findItemsByKeywords' +
              '&SERVICE-VERSION=1.0.0&RESPONSE-DATA-FORMAT=JSON' +
              '&itemFilter.name=EndTimeFrom' +
              '&itemFilter.value=' + d.toISOString() +
              '&keywords=' + category + '%20handbag'
              '&paginationInput.entriesPerPage=' + config.itemsPerPage;

  request(url, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      var resp = JSON.parse(body);
      res.render('category', { response: resp, category: category });
    }
  })
});

module.exports = router;
