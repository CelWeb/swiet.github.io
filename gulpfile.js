var gulp         = require('gulp');
var browserSync  = require('browser-sync');
var sass         = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var concatCss    = require('gulp-concat-css');
var ftp          = require('gulp-ftp');


// Static Server + watching scss/html files
gulp.task('server', ['sass'], function() {

    browserSync.init({
        server: "src/"
    });

// Следим за изменениями файлов
    gulp.watch("src/sass/*.sass", ['sass']);
    gulp.watch("src/*.html").on('change', browserSync.reload);
});

// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', function() {
    return gulp.src("src/sass/*.sass")
        .pipe(sass())
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(concatCss('main.css'))
        .pipe(gulp.dest("src/css"))
        .pipe(browserSync.stream());
});
gulp.task('ftp', function(){
 return gulp.src('src/**')
 .pipe(ftp({
    host: '144.121.69.84',
    user: 'ykfpyzby',
    pass: 'xNu4aC4b69',
    remotePath:'public_html'
}))
// you need to have some kind of stream after gulp-ftp to make sure it's flushed
        // this can be a gulp plugin, gulp.dest, or any kind of stream
        // here we use a passthrough stream
        .pipe(gutil.noop());
});
gulp.task('default', ['server']);

