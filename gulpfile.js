var gulp        = require('gulp'),
    sass        = require('gulp-sass'),
    bower       = require('gulp-bower'),
    sourcemaps  = require('gulp-sourcemaps'),
    concat      = require('gulp-concat'),
    uglify      = require('gulp-uglify'),
    runSequence = require('run-sequence'),
    del         = require('del'),
    imagemin    = require('gulp-imagemin');

var config = {
    publicDir  : './public',
    assetsDir  : './assets',
    bowerDir   : './bower_components'
}

// Delete public dir
gulp.task('clean', function () {
  return del(config.publicDir);
});

// Bower install
gulp.task('bower', function() {
  return bower()
    .pipe(gulp.dest(config.bowerDir));
});

// Image optimization
gulp.task('images', function () {
    return gulp.src(config.assetsDir + '/images/*')
      .pipe(imagemin({
          progressive: true,
      }))
      .pipe(gulp.dest(config.publicDir + '/images'));
});

// CSS compilation
gulp.task('css', function() {
  return gulp.src(config.assetsDir + '/sass/**/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(sourcemaps.write('./maps'))
    .pipe(gulp.dest(config.publicDir + '/css'));
});

// JS concat and minify
gulp.task('js', function(callback) {
  return gulp.src([
      config.bowerDir + '/jquery/dist/jquery.js',
      config.assetsDir + '/js/app.js'
    ])
    .pipe(sourcemaps.init())
    .pipe(concat('all.js'))
    .pipe(uglify())
    .pipe(sourcemaps.write('./maps'))
    .pipe(gulp.dest(config.publicDir + '/js'));
});

// Watch tasks
gulp.task('watch', function() {
  gulp.watch(config.assetsDir + '/images/*', ['images']);
  gulp.watch(config.assetsDir + '/**/*.scss', ['css']);
  gulp.watch(config.assetsDir + '/**/*.js', ['js']);
});

// gulp default
// builds js/css/images
gulp.task('default', function(callback) {
  runSequence('clean', 'bower', ['images', 'css', 'js']);
});
