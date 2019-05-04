const router = require('express').Router();
const axios = require('axios');
const cheerio = require('cheerio');
const mongoose = require('mongoose');
const util = require('util');

const Article = require('../models').Article;
const Site = require('../models').Site;

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

    res.redirect(301, '/app');
});

module.exports = router;
