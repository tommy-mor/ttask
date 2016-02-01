var browserify = require('browserify');
var gulp = require('gulp');
var source = require('vinyl-source-stream');
var connect = require('gulp-connect');
gulp.task('browser', function() {
    console.log("memes");
    return browserify('app.js').bundle().pipe(source('bundle.js'))
        .pipe(gulp.dest('./bundle.js'));
});
gulp.task('webserver', function() {
    connect.server({
        livereload: true
    });
});

gulp.task('watch', function() {
    gulp.watch('app.js', ['browser'])
});

gulp.task('default', ['watch', 'webserver', 'browser'])
