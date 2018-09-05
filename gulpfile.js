'use strict';
 
var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var concat = require('gulp-concat');
var babel = require('gulp-babel');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');
var uglifyCSS = require('gulp-uglifycss');
var livereload = require('gulp-livereload');

gulp.task('styles:dev', function () {
  return gulp.src('src/css/sass/**/*.scss', {base: './'})
    .pipe(sass())
    .pipe(concat('style.css'))
    .pipe(gulp.dest('./src'))
    .pipe(livereload());
});

gulp.task('styles:prod', function () {
  return gulp.src('src/css/sass/**/*.scss', {base: './'})
    .pipe(sass())
    .pipe(autoprefixer({
      browsers: ['last 2 versions']
    }))
    .pipe(concat('style.css'))
    .pipe(uglifyCSS())
    .pipe(gulp.dest('./src'));
});

gulp.task('js:prod', function () {
  return gulp.src('src/js/**/*.js', {base: './'})
    .pipe(sourcemaps.init())
    .pipe(babel({
      presets: ['@babel/env']
    }))
    .pipe(concat('app.js'))
    .pipe(uglify())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('./dist'));
});

gulp.task('watch', function () {
  livereload.listen();
  gulp.watch('./src/css/sass/**/*.scss', ['styles:dev']);
});

gulp.task('default', ['watch']);

gulp.task('build', ['styles:prod']);
