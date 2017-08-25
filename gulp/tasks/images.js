// NODE MODULES
const imageminGifsicle = require('imagemin-gifsicle');
const imageminJpegtran = require('imagemin-jpegtran');
const imageminOptipng = require('imagemin-optipng');
const imageminSvgo = require('imagemin-svgo');


// USEFUL FUNCTIONS
const alertHandler = require('./useful-functions/alert-handler');
const getOption = require('./useful-functions/get-option');


// Optimizes images by using standard modules avaible via NPM or by TinyPNG API, for more info check ---> https://tinypng.com/developers/reference/nodejs
exports.task = () => {
    $.util.log($.util.colors.magenta('IMAGES TASK RUNNING...'));

    const condition = getOption('--option').value === 'advanced';
    let imgExtname = '{jpg,png}',
        optimizationModule = require('gulp-tinify'), // https://github.com/joshbroton/gulp-tinify#gulp-tinify
        args = gulpConfig.apiKeys.tinify;

    if (!condition) {
        imgExtname = '{jpg,png,svg,gif}';
        optimizationModule = require('gulp-imagemin'); // https://github.com/sindresorhus/gulp-imagemin#api
        args = [imageminGifsicle(), imageminJpegtran(), imageminOptipng(), imageminSvgo()];

        alertHandler({
            type: 'info',
            message: `Default options passed to images task.
To change that, add command arguments to this task ---> gulp [TASK NAME = images / build / build:server] --option [advanced].`
        });
    }

    if (condition && !args) {
        return alertHandler({
            type: 'error',
            message: `Task can not be complited.
Remember to set up your TINIFY API KEY in ${gulpConfig.configFile} file.`
        });
    }

    return gulp.src(`${gulpConfig.directories.dist}/images/**/*.${imgExtname}`, { /* eslint-disable */
            base: gulpConfig.directories.dist
        }) /* eslint-enable */
        .pipe($.plumber())
        .pipe(optimizationModule(args))
        .pipe(gulp.dest(`${gulpConfig.directories.dist}/`));
};
