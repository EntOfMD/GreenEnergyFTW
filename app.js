const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');
const bodyParser = require('body-parser');
const createError = require('http-errors');
const mongoose = require('mongoose');

const logger = require('morgan');

const apiRouter = require('./routes/api');
const htmlRouter = require('./routes/html');

const app = express();
var MONGODB_URI =
    process.env.MONGODB_URI || 'mongodb://localhost/GreenEnergyFTW';
// database
mongoose.connect(MONGODB_URI, { useNewUrlParser: true }, err => {
    if (err) {
        throw err;
    } else {
        console.log(`Successfully connected to the database.`);
    }
});

app.engine(
    'handlebars',
    exphbs({
        defaultLayout: 'main'
    })
);
app.set('view engine', 'handlebars');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', htmlRouter);
app.use('/api', apiRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error', {
        siteTitle: `
                GreenEner.. ERROR! `
    });
});

module.exports = app;
