var gulp = require('gulp');
var browserify = require('browserify');
var babelify = require('babelify');
var source = require('vinyl-source-stream');
var envify = require('loose-envify/custom');
var uglifyify = require('uglifyify');

gulp.task('dev', function () {
  browserify('./src/app.jsx', { debug: true })
    .transform(babelify)
    .bundle()
    .on('error', function (err) { console.log("Error : " + err.message); })
    .pipe(source('bundle.js'))
    .pipe(gulp.dest('./dist/'))
});

gulp.task('build', function () {
  browserify('./src/app.jsx', { debug: false })
  .transform(babelify)
  .transform(envify({
    _: 'purge',
    NODE_ENV: 'production'
  }), { global: true })
  .transform(uglifyify, { global: true, sourcemap: false })
  .bundle()
  .on('error', function (err) { console.log("Error : " + err.message); })
  .pipe(source('bundle.js'))
  .pipe(gulp.dest('./dist/browser/'))
});

gulp.task('watch', function () {
  gulp.watch('./src/*.jsx', ['dev']);
});

gulp.task('default', ['watch']);
