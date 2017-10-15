// USEFUL FUNCTIONS
const alertHandler = require('./useful-functions/alert-handler');


// Optimizes images by using TinyPNG API, for more info check ---> https://tinypng.com/developers/reference/nodejs
exports.task = () => {
    $.util.log($.util.colors.magenta('IMAGES TINIFY TASK RUNNING...'));

    if (!gulpConfig.apiKeys.tinify) {
        return alertHandler({
            type: 'error',
            message: `Task can not be complited.
Remember to set up your TINIFY API KEY in ${gulpConfig.configFile} file.`
        });
    }

    return gulp.src(`${gulpConfig.directories.dist}/images/**/*.{jpg,png}`, { /* eslint-disable */
            base: gulpConfig.directories.dist
        }) /* eslint-enable */
        .pipe($.plumber())
        .pipe($.tinify(gulpConfig.apiKeys.tinify)) // https://github.com/joshbroton/gulp-tinify#gulp-tinify
        .pipe(gulp.dest(`${gulpConfig.directories.dist}/`));
};
