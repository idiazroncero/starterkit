'use strict';

// Todos los paquetes necesarios
var gulp = require('gulp'),
	jshint = require('gulp-jshint'),
	sass   = require('gulp-sass'),
	gutil = require('gulp-util'),
	sourcemaps = require('gulp-sourcemaps');

// define the default task and add the watch task to it
gulp.task('default', ['watch']);

// Comrpueba que JS está bien
gulp.task('jshint', function() {
  return gulp.src('js/**/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'));
});

// Construye el CSS
gulp.task('compile-css', function() {
  return gulp.src('sass/**/*.scss')
	.pipe(sourcemaps.init())
	.on('end', function(){ gutil.log('Sourcemap started')})
    	.pipe(sass({
    		outputStyle: 'nested',
    		includePaths: [
    			'./node_modules/compass-mixins/lib', // Compass
          './node_modules/normalize.css'
    		],
    	})
    	.on('error', sass.logError))
    .pipe(sourcemaps.write())
    .on('end', function(){ gutil.log('Sourcemap finished')})
    .pipe(gulp.dest('css'));
});

// Observa las tareas
gulp.task('watch', function() {
  gulp.watch('js/**/*.js', ['jshint']);
  gulp.watch('sass/**/*.scss', ['compile-css']);
});