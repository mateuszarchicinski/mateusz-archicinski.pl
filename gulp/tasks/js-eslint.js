// Validates JavaScript (JS) Code, atm default configuration for more info check ---> http://eslint.org/
exports.task = () => {
    $.util.log($.util.colors.cyan('JS ESLINT TASK RUNNING...'));

    return gulp.src([ /* eslint-disable */
            'gulp/**/*.js',
            `${gulpConfig.directories.work}/js/**/*.js`,
            `!${gulpConfig.directories.work}/js/main.js`,
            `${gulpConfig.directories.test}/**/*.js`
        ]) /* eslint-enable */
        .pipe($.plumber())
        .pipe($.eslint(require('../eslint.config.js'))) // http://eslint.org/docs/user-guide/configuring
        .pipe($.eslint.format());
};
