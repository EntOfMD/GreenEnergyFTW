var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {
    title: 'Express',
    siteTitle: 'GreenEnergyFTW - Your news for all things Green Energy'
  });
});

module.exports = router;
