// Validates Pug / Jade Code, atm custom configuration for more info check ---> https://github.com/pugjs/pug-lint#pug-lint
exports.task = () => {
    $.util.log($.util.colors.cyan('PUG LINT TASK RUNNING...'));

    return gulp.src(`${gulpConfig.directories.work}/templates/**/*.pug`)
        .pipe($.plumber())
        .pipe($.pugLint(require('../puglint.config.js'))); // https://github.com/pugjs/pug-lint/blob/master/docs/rules.md
};
