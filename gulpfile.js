var gulp        = require('gulp'),
    sass        = require('gulp-sass'),
    bower       = require('gulp-bower'),
    sourcemaps  = require('gulp-sourcemaps'),
    concat      = require('gulp-concat'),
    uglify      = require('gulp-uglify'),
    runSequence = require('run-sequence'),
    del         = require('del');

var config = {
    publicPath  : './public',
    assetsPath  : './assets',
    sassPath    : './assets/sass',
    cssPath     : './public/css',
    jsPath      : './public/js',
    bowerDir    : './bower_components'
}

gulp.task('clean', function () {
  return del(config.publicPath);
});

// Runs 'bower install'
// Used when setting up an environment for the first time
gulp.task('bower', function() {
  return bower()
    .pipe(gulp.dest(config.bowerDir));
});

// CSS compilation
gulp.task('css', function() {
  return gulp.src(config.sassPath + '/**/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(sourcemaps.write('./maps'))
    .pipe(gulp.dest(config.cssPath));
});

// JS concat and minify
gulp.task('js', function(callback) {
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

// gulp watch
gulp.task('watch', function() {
  gulp.watch(config.sassPath + '/**/*.scss', ['css']);
  gulp.watch(config.assetsPath + '/**/*.js', ['js']);
});

// gulp default
// downloads and builds js/css
gulp.task('default', function(callback) {
  runSequence('clean', 'bower', ['css', 'js']);
});
