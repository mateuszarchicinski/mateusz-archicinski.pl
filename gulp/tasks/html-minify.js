// Minify HTML code, atm custom configuration for more info check ---> https://github.com/jonschlinkert/gulp-htmlmin#gulp-htmlmin---
exports.task = () => {
    $.util.log($.util.colors.green('HTML MINIFY TASK RUNNING...'));

    return gulp.src([ /* eslint-disable */
            `${gulpConfig.directories.dist}/*.html`,
            `${gulpConfig.directories.dist}/views/**/*.html`
        ], { /* eslint-enable */
            base: gulpConfig.directories.dist
        })
        .pipe($.plumber())
        .pipe($.htmlmin({ // https://github.com/kangax/html-minifier#options-quick-reference
            collapseWhitespace: true,
            minifyCSS: true,
            minifyJS: true,
            removeComments: true
        }))
        .pipe(gulp.dest(`${gulpConfig.directories.dist}/`));
};
