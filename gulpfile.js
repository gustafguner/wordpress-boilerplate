'use strict';
 
var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var concat = require('gulp-concat');
var babel = require('gulp-babel');
var uglify = require('gulp-uglify');
var uglifyCSS = require('gulp-uglifycss');

gulp.task('styles:dev', function () {
  return gulp.src('src/css/sass/**/*.scss', { base: './' })
    .pipe(sass())
    .pipe(concat('style.css'))
    .pipe(gulp.dest('.'));
});

gulp.task('styles:prod', function () {
  return gulp.src('src/css/sass/**/*.scss', { base: './' })
    .pipe(sass())
    .pipe(autoprefixer({
      browsers: ['last 2 versions'],
      cascade: false
    }))
    .pipe(concat('style.css'))
    .pipe(uglifyCSS())
    .pipe(gulp.dest('.'));
});

gulp.task('sass:watch', function () {
  gulp.watch('./src/css/sass/**/*.scss', ['styles:dev']);
});

gulp.task('default', ['styles:dev', 'sass:watch']);

gulp.task('build', ['styles:prod']);