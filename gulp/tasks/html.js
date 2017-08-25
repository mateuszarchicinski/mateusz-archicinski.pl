// Combines CSS or JS files into one and MINIFY - Minification via modules Clean Css & Uglify
exports.task = () => {
    $.util.log($.util.colors.green('HTML TASK RUNNING...'));

    return gulp.src([ /* eslint-disable */
            `${gulpConfig.directories.work}/*.html`,
            `${gulpConfig.directories.work}/views/**/*.html`
        ], { /* eslint-enable */
            base: gulpConfig.directories.work
        })
        .pipe($.plumber())
        .pipe($.useref()) // https://github.com/jonkemp/gulp-useref#usage
        .pipe($.if('*.css', $.cleanCss())) // https://github.com/jakubpawlowicz/clean-css#--------
        .pipe($.if('*.js', $.uglify({
            output: {
                max_line_len: false
            }
        }))) // {preserveComments: 'license'} ~ https://github.com/terinjokes/gulp-uglify#options
        .pipe($.removeCode({
            remove: true
        }))
        .pipe(gulp.dest(`${gulpConfig.directories.dist}/`));
};
