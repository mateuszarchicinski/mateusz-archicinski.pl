// NODE MODULES
const htmlhintStylish = require('htmlhint-stylish');


// Validates HyperText Markup Language (HTML) code, atm custom configuration for more info / rules check ---> https://github.com/bezoerb/gulp-htmlhint#api
exports.task = () => {
    $.util.log($.util.colors.cyan('HTML HINT TASK RUNNING...'));

    return gulp.src([ /* eslint-disable */
            `${gulpConfig.directories.work}/*.html`,
            `${gulpConfig.directories.work}/views/**/*.html`
        ]) /* eslint-enable */
        .pipe($.plumber())
        .pipe($.htmlhint(require('../htmlhint.config.js'))) // https://github.com/yaniswang/HTMLHint/wiki/Rules
        .pipe($.htmlhint.reporter(htmlhintStylish)); // https://github.com/bezoerb/gulp-htmlhint#reporters
};
