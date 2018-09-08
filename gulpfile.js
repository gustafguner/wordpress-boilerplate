'use strict';

var env = "development";
 
var gulp = require('gulp'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    concat = require('gulp-concat'),
    babel = require('gulp-babel'),
    uglify = require('gulp-uglify'),
    sourcemaps = require('gulp-sourcemaps'),
    uglifyCSS = require('gulp-uglifycss'),
    livereload = require('gulp-livereload'),
    clean = require('gulp-clean'),
    template = require('gulp-template');

gulp.task('styles:dev', function () {
  return gulp.src('src/css/sass/**/*.scss', {base: './'})
    .pipe(sass())
    .pipe(concat('style.css'))
    .pipe(gulp.dest('./src'));
});

gulp.task('styles:prod', function () {
  return gulp.src('src/css/sass/**/*.scss', {base: './'})
    .pipe(sass())
    .pipe(autoprefixer({
      browsers: ['last 2 versions']
    }))
    .pipe(concat('style.css'))
    .pipe(uglifyCSS())
    .pipe(gulp.dest('./dist'));
});

gulp.task('js:prod', function () {
  return gulp.src(['node_modules/jquery/dist/jquery.js', 'src/js/**/*.js'], {base: './'})
    .pipe(sourcemaps.init())
    .pipe(babel({
      presets: ['@babel/env']
    }))
    .pipe(concat('scripts.bundle.js'))
    .pipe(uglify())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('./dist/js'));
});

gulp.task('clean', function() {
  return gulp.src('dist', {base: './'})
    .pipe(clean());
});

gulp.task('copy', function() {
	return gulp.src([
    '!src/dev_templates/*.php', 
    '!src/prod_config/*.php', 
    '!src/config/*.php', 
    'src/**/*.php',
    'src/img/**/*.{jpg,png,svg,gif,webp,ico}',
    'src/fonts/*.{woff,woff2,ttf,otf,eot,svg}'
		], {base: './src'})
		.pipe(gulp.dest('dist'));
});

gulp.task('jquery', function () {
  return gulp.src('node_modules/jquery/dist/jquery.js', {base: './src'})
    .pipe(sourcemaps.init())
    .pipe(concat('jquery.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('src/js/lib'));
});

gulp.task('watch', ['jquery'], function () {
  livereload.listen();

  gulp.watch(
    ['./src/css/sass/**/*.scss', 
    './src/js/**/*.js',
    './src/**/*.php']
  ).on('change', function(file) {
    livereload.changed(file.path);
  });

  gulp.watch('./src/css/sass/**/*.scss', ['styles:dev']);
});

gulp.task('production-env', function () {
  env = "production";
});

gulp.task('development-env', function () {
  env = "development";
});

gulp.task('prod-config', function() {
  gulp.src('./src/prod_config/**/*.php', {base: './src/prod_config'})
    .pipe(gulp.dest('./dist/config'));
});


gulp.task('default', ['development-env'], function() {
  gulp.start(['watch']);
});


gulp.task('build', ['production-env', 'clean'], function () {
  gulp.start(['copy', 'prod-config', 'styles:prod', 'js:prod']);
});

