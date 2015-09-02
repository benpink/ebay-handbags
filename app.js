var bodyParser    = require('body-parser'),
    config        = require('./config'),
    cookieParser  = require('cookie-parser'),
    express       = require('express'),
    favicon       = require('serve-favicon'),
    logger        = require('morgan'),
    nunjucks      = require('nunjucks'),
    path          = require('path'),
    routes        = require('./routes'),
    app           = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');

nunjucks.configure('views', {
  watch     : true,
  express   : app
});

// The routes for the project
app.use(routes)

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// 500 errors
// development contains stacktrace
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: app.get('env') === 'development' ? err : {}
  });
});

module.exports = app;
