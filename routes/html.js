const router = require('express').Router();
const mongoose = require('mongoose');
const Article = require('../models').Article;

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('cover', {
        siteTitle: 'GreenEnergyFTW - Your news for all things Green Energy'
    });
});

router.get('/app', (req, res) => {
    Article.find({}, (err, doc) => {
        if (err) throw err;
        res.render('index', {
            siteTitle: 'GreenEnergyFTW - Your news for all things Green Energy',
            doc
        });
    });
});

module.exports = router;
