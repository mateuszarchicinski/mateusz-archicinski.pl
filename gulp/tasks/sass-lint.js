// Validates Syntactically Awesome Style Sheets (SASS) Code, atm custom configuration for more info / rules check ---> https://github.com/sasstools/sass-lint#configuring
exports.task = () => {
    $.util.log($.util.colors.cyan('SASS LINT TASK RUNNING...'));

    return gulp.src(`${gulpConfig.directories.work}/sass/**/*.s+(a|c)ss`)
        .pipe($.plumber())
        .pipe($.sassLint(require('../sasslint.config.js')))
        .pipe($.sassLint.format()); // https://github.com/sasstools/sass-lint/blob/master/docs/options/formatter.md
};
