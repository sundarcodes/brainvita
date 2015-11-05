var scss = require("gulp-scss");
var gulp = require("gulp");

gulp.task("scss", function () {
    return gulp.src(
        "./css/src/*.scss"
    ).pipe(scss()).pipe(gulp.dest("./css"));

});

// default gulp task
gulp.task('default', ['scss'], function() {
// watch for CSS changes
gulp.watch('./css/src/*.scss', ['scss']);
});
