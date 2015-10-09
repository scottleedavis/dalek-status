var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var shared_cache = require('./lib/cache');
var sapi = require('./lib/sapi');
var local_stream = require('./lib/local_stream');
var routes = require('./routes/index');
var dalek_state = require('./routes/state');
var update_stream = require('./routes/update-stream');

if( process.env.LOCAL_ONLY ) {
    local_stream.setCache(shared_cache);
} else {
    sapi.use(shared_cache);
}

routes.setCache(shared_cache);
dalek_state.setCache(shared_cache);
update_stream.setCache(shared_cache);


if( process.env.LOCAL_ONLY ) {
    local_stream.setStream(update_stream);
    local_stream.run();
} else {
    sapi.setStream(update_stream);
    sapi.init();
}

//express boilerplate
//--------------------------------------------------------//
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// app.use('/', routes);

app.use('/state', dalek_state);
app.get('/stream', update_stream.stream);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});


// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
