"use strict";

/************************
 * SETUP
 ************************/

var gulp = require('gulp');
var sass = require('gulp-sass');
var cleanCss = require('gulp-clean-css');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');
var livereload = require('gulp-livereload');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var sassdoc = require('sassdoc');
var source = require('vinyl-source-stream');
var babel = require('gulp-babel');

/************************
 * CONFIGURATION
 ************************/

var autoReload = true;

var stylesSrc = [
  // add bower_components CSS here
  './sass/draggable-items.scss'
];


/************************
 * TASKS
 ************************/

gulp.task('styles', function() {
  gulp.src(stylesSrc)
    .pipe(sourcemaps.init())
    .pipe(sass())

    // Catch any SCSS errors and prevent them from crashing gulp
    .on('error', function (error) {
      console.error(error);
      this.emit('end');
    })
    .pipe(autoprefixer({
      browsers: ['last 3 versions', '> 1%', 'ie 8']
    }))
    .pipe(sourcemaps.write())
    .pipe(concat('draggable-items.css'))
    .pipe(gulp.dest('./css/'))
    .pipe(livereload())
    .pipe(cleanCss({
      compatibility: 'ie8'
    }))
    // .pipe(gulp.dest('./css/dist/'))
    .pipe(livereload());
});

gulp.task('watch', function() {
  if (autoReload) {
    livereload.listen();
  }
  gulp.watch('./sass/**/*.scss', ['styles']);
});

gulp.task('default', ['styles']);
