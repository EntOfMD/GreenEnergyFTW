const router = require('express').Router();
const { Article, Contact } = require('../models');

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

router
    .route('/letsgrabacoffee')
    .get((req, res) => {
        res.render('contact', {
            siteTitle: `Contact Me, Let's grab a coffee :)`
        });
    })
    .post((req, res) => {
        let body = req.body;
        let firstName = body.firstName,
            lastName = body.lastName,
            email = body.email,
            handle = body.socialHandle,
            link = body.link,
            msg = body.msg;

        if (!firstName && !lastName && !email && !msg) {
            res.render('error', {
                message:
                    'Either First Name, Last Name, Email, and/or Message was missing.'
            });
        } else {
            Contact.create(body).then(result => {
                res.render('contactSuccess', {
                    result,
                    siteTitle: `Contact Me, Let's grab a coffee :)`
                });
            });
        }
    });

module.exports = router;
