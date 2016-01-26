var gulp = require('gulp');
var sass = require('gulp-sass');
var babel = require('gulp-babel');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');

var mainTasks = ['sass', 'jsx', 'bundle'];

gulp.task('watch', function() {
	gulp.watch('./source/**/*.*', mainTasks);
});

gulp.task('sass', function() {
	gulp.src('./source/style/*.scss')
		.pipe(sass({outputStyle: 'compressed'}))
		.pipe(rename('style.css'))
		.pipe(gulp.dest('./dist/'));
});

gulp.task('jsx', function() {
	gulp.src('./source/components/*.jsx')
		.pipe(babel({presets: ['react']}))
		.pipe(gulp.dest('./.compiled-components'));
});

gulp.task('bundle', ['jsx'], function() {
	gulp.src([
			'./node_modules/react/dist/react.min.js',
			'./node_modules/react-dom/dist/react-dom.min.js',
			'./node_modules/history/umd/History.min.js',
			'./node_modules/react-router/umd/ReactRouter.min.js',
			'./source/logic/util.js',
			'./source/logic/api.js',
			'./.compiled-components/*.js'
		])
		.pipe(uglify())
		.pipe(concat('bundle.js'))
		.pipe(gulp.dest('./dist/'))
});

gulp.task('default', ['watch'].concat(mainTasks));
