var express = require('express'),
    path = require('path'),
    favicon = require('serve-favicon'),
    logger = require('morgan'),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser');

var shared_cache = require('./lib/cache'),
    local_stream = require('./lib/local_stream'),
    routes = require('./routes/index'),
    dalek_state = require('./routes/state'),
    update_stream = require('./routes/update-stream');

local_stream.setCache(shared_cache);
routes.setCache(shared_cache);
dalek_state.setCache(shared_cache);
update_stream.setCache(shared_cache);

if( process.env.CLIENT_APP  || false ){ //sapi source
    var sapi_stream = require('./lib/sapi');
    sapi_stream.use(shared_cache);
    sapi_stream.setStream(update_stream);
    sapi_stream.init();
} else { //embedded source
    local_stream.setStream(update_stream, process.env.LOCAL_ONLY || false);
    local_stream.run();    
}


//express boilerplate
//--------------------------------------------------------//
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

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
