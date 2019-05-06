const router = require('express').Router();
const { Article, Contact } = require('../models');
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: process.env.NODEMAILER_SERVICE,
  auth: {
    user: process.env.NODEMAILER_USER,
    pass: process.env.NODEMAILER_PASS
  }
});

var mailOptions = {
  from: process.env.NODEMAILER_FROM,
  to: process.env.NODEMAILER_TO,
  subject: `You got a new contact form filled!`,
  html: ''
};

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
        /*  //email
                mailOptions.html = `<h1>Hey Boss!</h1><br/>
                ${result.firstName} ${
                    result.lastName
                } is trying to get in touch with you.<br/>
                The email is ${result.email}, the social media handle is ${
                    result.handle
                }, the link to the website ${result.link}. The message ${
                    result.firstName
                } left was ${result.msg}. <br/><br/>
                Here is the full details:<br/><br/>
                ${result}`;

                transporter.sendMail(mailOptions, (err, info) => {
                    if (err) throw err;
                    console.log(`Email Succesfully sent. ${info.response}`);
                }); */
        res.render('contactSuccess', {
          result,
          siteTitle: `Thanks ${result.firstName}, I'll be in touch! :)`
        });
      });
    }
  });

module.exports = router;
