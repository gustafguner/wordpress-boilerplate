'use strict';
 
var gulp = require('gulp'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    concat = require('gulp-concat'),
    babel = require('gulp-babel'),
    uglify = require('gulp-uglify'),
    sourcemaps = require('gulp-sourcemaps'),
    uglifyCSS = require('gulp-uglifycss'),
    livereload = require('gulp-livereload'),
    useref = require('gulp-useref'),
    clean = require('gulp-clean');

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

gulp.task('js:dev', function() {
  return gulp.src('src/js/**/*.js', {base: './'})
    .pipe(concat('app.js'))
    .pipe(gulp.dest('./'))
    .pipe(livereload());
});

gulp.task('js:prod', function () {
  return gulp.src('src/js/**/*.js', {base: './'})
    .pipe(sourcemaps.init())
    .pipe(babel({
      presets: ['@babel/env']
    }))
    .pipe(concat('scripts.bundle.js'))
    .pipe(uglify())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('./dist'));
});

gulp.task('clean', function() {
  return gulp.src('dist', {base: './'})
    .pipe(clean());
});

gulp.task('copy', function() {
	return gulp.src([
    'src/**/*.php',
    'src/img/**/*.{jpg,png,svg,gif,webp,ico}',
    'src/fonts/*.{woff,woff2,ttf,otf,eot,svg}'
		], {
			base: './src'
		})
		.pipe(gulp.dest('dist'));
});

gulp.task('jquery', function () {
  return gulp.src('node_modules/jquery/dist/jquery.js', {base: './src'})
    .pipe(sourcemaps.init())
    .pipe(concat('jquery.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('src/js/lib'));
});


gulp.task('watch', function () {
  livereload.listen();
  gulp.watch('./src/css/sass/**/*.scss', ['styles:dev']).on('change', function( file ) {
		livereload.changed(file.path);
	});
  gulp.watch('./src/js/**/*.js', ['js:dev']).on('change', function( file ) {
		livereload.changed(file.path);
	});
});

gulp.task('default', ['jquery', 'watch']);

gulp.task('build', ['clean', 'jquery', 'copy', 'styles:prod', 'js:prod']);
