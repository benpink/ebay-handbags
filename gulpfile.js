var gulp        = require('gulp'), 
    sass        = require('gulp-sass') ,
    bower       = require('gulp-bower'),
    sourcemaps  = require('gulp-sourcemaps'),
    concat      = require('gulp-concat'),
    uglify      = require('gulp-uglify');

var config = {
    assetsPath  : './assets',
    sassPath    : './assets/sass',
    cssPath     : './public/css',
    jsPath      : './public/js',
    bowerDir    : './bower_components' 
}

// Runs 'bower install'
// Used when setting up a dev env for the first time
gulp.task('bower', function() { 
  return bower()
    .pipe(gulp.dest(config.bowerDir)) 
});

// CSS compilation
gulp.task('css', ['bower'], function() {
  gulp.src(config.sassPath + '/**/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(sourcemaps.write('./maps'))
    .pipe(gulp.dest(config.cssPath))
});

// JS concat and minify
gulp.task('js', ['bower'], function(callback) {
  return gulp.src([
      config.bowerDir + '/jquery/dist/jquery.js',
      config.assetsPath + '/js/app.js'
    ])
    .pipe(sourcemaps.init())
    .pipe(concat('all.js'))
    .pipe(uglify())
    .pipe(sourcemaps.write('./maps'))
    .pipe(gulp.dest(config.jsPath));
});

 gulp.task('watch', function() {
   gulp.watch(config.sassPath + '/**/*.scss', ['css']); 
   gulp.watch(config.assetsPath + '/**/*.js', ['js']); 
});

  gulp.task('default', ['bower', 'css', 'js']);
