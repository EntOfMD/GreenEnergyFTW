const router = require('express').Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('cover', {
        siteTitle: 'GreenEnergyFTW - Your news for all things Green Energy'
    });
});

router.get('/app', (req, res) => {
    res.render('index', {
        siteTitle: 'GreenEnergyFTW - Your news for all things Green Energy'
    });
});

module.exports = router;
