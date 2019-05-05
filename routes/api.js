const router = require('express').Router();
const axios = require('axios');
const cheerio = require('cheerio');

const { Article } = require('../models');

router.get('/scrape', function(req, res, next) {
    axios
        .get(
            // `https://news.google.com/topics/CAAqIQgKIhtDQkFTRGdvSUwyMHZNRFptYUhNU0FtVnVLQUFQAQ`
            `https://www.google.com/search?q=renewable%20energy&tbm=nws`
        )
        .then(axres => {
            const $ = cheerio.load(axres.data);
            let result = {};
            let site = {};
            $('div.g').each(function(i, element) {
                result.title = $(this)
                    .find('.r')
                    .text();
                result.link = $(this)
                    .find('.r')
                    .find('a')
                    .attr('href')
                    .replace('/url?q=', '')
                    .split('&')[0];
                result.text = $(this)
                    .find('.st')
                    .text();
                result.img = $(this)
                    .find('img.th')
                    .attr('src');

                /**
                 * result.date stores also the time, site, and other info..
                 */
                result.date = $(this)
                    .find('.f')
                    .text();

                // Site.create()
                Article.create(result)
                    .then(dbArticle => {
                        console.log(dbArticle);
                    })
                    .catch(err => {
                        throw err;
                    });
            });
        });

    setTimeout(() => {
        res.redirect(301, '/app');
    }, 1000);
});

router
    .route('/addCarousel')
    .get((req, res) => {
        Carousel.find({}, (err, doc) => {
            res.json(doc);
        });
    })
    .post((req, res) => {
        let body = req.body;

        if (body.url && body.poster && body.title) {
            let entry = {
                url: req.body.url,
                poster: req.body.poster,
                title: req.body.title
            };

            Carousel.create(body).then(entries => {
                res.redirect(301, '/app');
            });
        } else {
            res.render('error', {
                message: `Make sure to fill out ALL the fields :)`,
                errorCode: '401'
            });
        }
    });

module.exports = router;
