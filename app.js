var express = require('express');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');

var env = process.env.NODE_ENV || 'development';

console.log("Express App configured for %s environment", env);

var app = express();
app.use(favicon());
app.use(logger('dev'));

if ('development' == env) {
    app.use(express.static(path.join(__dirname, 'client-source')));
} else {
    app.use(express.static(path.join(__dirname, 'client')));
}

app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

module.exports = app;
