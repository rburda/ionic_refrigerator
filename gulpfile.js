var gulp = require('gulp');
var gutil = require('gulp-util');
var bower = require('bower');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var minifyCss = require('gulp-minify-css');
var rename = require('gulp-rename');
var sh = require('shelljs');
var jshint = require('gulp-jshint'); 
var browserify = require('browserify'); 
var vinylSource = require('vinyl-source-stream');

var paths = {
  sass: ['./scss/**/*.scss']
};

gulp.task('default', ['sass', 'lint', 'browserify']);

gulp.task('lint', function() { 
 gulp.src(['./www/js/**/*.js']) 
  .pipe(jshint()) 
  .pipe(jshint.reporter('default')) 
  .pipe(jshint.reporter('fail')); 
});

gulp.task('browserify', function() { 
 return browserify('./www/js/app.js', {debug: true})
  .on('error', function(err){
    gutil.log("after after browserify");
    gutil.log(err);
  }) 
  .bundle() 
  .on('error', function(err){
    gutil.log("after bundle");
    gutil.log(err);
  }) 
  .pipe(vinylSource('bundle.js')) 
  .on('error', function(err){
    gutil.log("after vinylSource");
    gutil.log(err);
  }) 
  .pipe(gulp.dest('./www/dist')); 
});

gulp.task('sass', function(done) {
  gulp.src('./scss/ionic.app.scss')
    .pipe(sass({
      errLogToConsole: true
    }))
    .pipe(gulp.dest('./www/css/'))
    .pipe(minifyCss({
      keepSpecialComments: 0
    }))
    .pipe(rename({ extname: '.min.css' }))
    .pipe(gulp.dest('./www/css/'))
    .on('end', done);
});

gulp.task('watch', function() {
  gulp.watch(paths.sass, ['sass']);
});

gulp.task('install', ['git-check'], function() {
  return bower.commands.install()
    .on('log', function(data) {
      gutil.log('bower', gutil.colors.cyan(data.id), data.message);
    });
});

gulp.task('git-check', function(done) {
  if (!sh.which('git')) {
    console.log(
      '  ' + gutil.colors.red('Git is not installed.'),
      '\n  Git, the version control system, is required to download Ionic.',
      '\n  Download git here:', gutil.colors.cyan('http://git-scm.com/downloads') + '.',
      '\n  Once git is installed, run \'' + gutil.colors.cyan('gulp install') + '\' again.'
    );
    process.exit(1);
  }
  done();
});
