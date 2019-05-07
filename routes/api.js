const router = require('express').Router();
const axios = require('axios');
const cheerio = require('cheerio');

const { Article, Note, Carousel } = require('../models');

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
            return Note.findOneAndUpdate(
              {},
              { $push: { _note: dbArticle._id } },
              { new: true }
            );
          })
          .catch(error => {
            return res.render('error', { error });
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

router
  .route('/notes')
  //   .get((req, res) => {
  //     Note.find({}, (error, noteRes) => {
  //       if (noteRes.length > 0) {
  //         let articleIdArr = [];
  //         for (let key in noteRes) {
  //           articleIdArr.push(noteRes[key].articleId);
  //         }
  //       } else {
  //         res.render('notesAll', { noteRes });
  //         return res.render('error', {
  //           error,
  //           message: `There aren't any notes!`
  //         });
  //       }
  //     });
  //   })
  .get((req, res) => {
    Note.find({})
      .populate('_articleId')
      .then(noteRes => {
        if (noteRes.length > 0) {
          res.render('notesAll', {
            noteRes
          });
        } else {
          return res.render('notesAdd', {
            noteRes
          });
        }
      });
  })
  /**
   * THIS IS ALL SPEGGHETI CODE TO FUCKING FIND ONE ID AND INSERT IT INTO THE OTHER DB.
   */
  .post((req, res) => {
    let body = req.body;
    let articleId = body.articleId;
    if (body) {
      Article.find({ _id: articleId }, (err, doc) => {
        let articleTitle = doc[0].title;
        Note.create(body)
          .then(noteRes => {
            let noteId = noteRes._id;
            return Note.findOneAndUpdate(
              { _id: noteId },
              { $set: { _articleId: articleId, _articleTitle: articleTitle } },
              { new: true }
            );
          })
          .then(noteRefSave => {
            res.redirect(301, '/api/notes');
          })
          .catch(error => {
            return res.render('error', { error });
          });
      });
    }
  });

router.route('/notes/:id').get((req, res) => {
  let id = req.params.id;
  Article.findOne({ _id: id }, (err, doc) => {
    if (doc) {
      res.render('notesAdd', { doc });
    } else {
      return res.render('error', {
        message: `ID ${id} not found`
      });
    }
  });
});

module.exports = router;
