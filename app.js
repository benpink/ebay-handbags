var bodyParser    = require('body-parser'),
    config        = require('./config'),
    cookieParser  = require('cookie-parser'),
    express       = require('express'),
    favicon       = require('serve-favicon'),
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
app.use(favicon(path.join(__dirname, 'public/images', 'favicon.ico')));
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

app.locals.config = [];
app.locals.config.category_title = 'Designers';
app.locals.config.categories = [
  '3.1 Phillip Lim',
  'Akris',
  'Alexander McQueen',
  'Alexander Wang',
  'Alice + Olivia',
  'Balenciaga',
  'Bottega Veneta',
  'Brunello Cucinelli',
  'Burberry',
  'Celine',
  'Chanel',
  'Chloe',
  'Christian Louboutin',
  'Diane von Furstenberg',
  'Dolce & Gabbana',
  'Edie Parker',
  'Elizabeth and James',
  'Eric Javits',
  'Fendi',
  'Ferragamo',
  'Frye',
  'Givenchy',
  'Goyard',
  'Gucci',
  'Henry Beguelin',
  'Jason Wu',
  'Jimmy Choo',
  'Judith Leiber Couture',
  'kate spade new york',
  'Kooba',
  'Lanvin',
  'Les Petits Joueurs',
  'Liberty London',
  'Loewe',
  'Longchamp',
  'Manolo Blahnik',
  'MARC by Marc Jacobs',
  'Marni',
  'MCM',
  'Michael Kors Collection',
  'MICHAEL Michael Kors',
  'Moschino',
  'Nancy Gonzalez',
  'Nina Ricci',
  'Phillip Lim',
  'Prada',
  'Proenza Schouler',
  'Rafe',
  'Rag & Bone',
  'Ralph Lauren',
  'Rebecca Minkoff',
  'Roger Vivier',
  'Saint Laurent',
  'Salvatore Ferragamo',
  'See by Chloe',
  'Smythson',
  'Sophie Hulme',
  'Stella McCartney',
  'THE ROW',
  'TOM FORD',
  'Tomas Maier',
  'Tory Burch',
  'Valentino',
  'VBH',
  'Versace',
  'Vince'
];

module.exports = app;
