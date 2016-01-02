var config      = require('../config');
var express     = require('express');
var request     = require('request');
var router      = express.Router();

/* GET category page. */
router.get('/:category/:page?', function(req, res, next) {
  var category  = req.params.category;
  var page = req.params.page;
  var condition = req.query.c;
  var includeAuction = req.query.a;
  var filterIndex = 0;
  var qs = Object.keys(req.query).reduce(function(a,k){a.push(k+'='+encodeURIComponent(req.query[k]));return a},[]).join('&');
  var url = 'http://svcs.ebay.com/services/search/FindingService/v1?' +
              'SECURITY-APPNAME=' + config.ebayApiKey +
              '&OPERATION-NAME=findItemsByKeywords' +
              '&SERVICE-VERSION=1.0.0&RESPONSE-DATA-FORMAT=JSON' +
              '&outputSelector=PictureURLLarge' +
              '&keywords=' + category + '%20handbag' +
              '&paginationInput.entriesPerPage=' + config.itemsPerPage;

  // Filters
  if (condition && condition.indexOf('New') != -1) {
    url +=  '&itemFilter[' + filterIndex + '].name=Condition' +
            '&itemFilter[' + filterIndex + '].value=New';
    filterIndex++;
  }
  if (condition && condition.indexOf('Used') != -1) {
    url +=  '&itemFilter[' + filterIndex + '].name=Condition' +
            '&itemFilter[' + filterIndex + '].value=Used';
    filterIndex++;
  }

  // Pagination
  if (page) {
    url +=  '&paginationInput.pageNumber=' + page;
  }

  request(url, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      res.render('category', {
        response        : JSON.parse(body),
        category        : category,
        condition       : condition,
        qs              : qs,
        page            : page
      });
    }
  })
});

module.exports = router;
