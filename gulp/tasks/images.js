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

    const condition = getOption('--option').value === 'advanced' && !!gulpConfig.apiKeys.tinify;

    if (!condition) {
        alertHandler({
            type: 'info',
            message: `Default options passed to images task. To change that:
1. Set up your TINIFY API KEY in ${gulpConfig.configFile} file.
2. Add command arguments to this task ---> gulp [TASK NAME = images / build / build:server] --option [advanced].`
        });
    }

    return gulp.src(`${gulpConfig.directories.dist}/images/**/*.{jpg,png,svg,gif}`, { /* eslint-disable */
            base: gulpConfig.directories.dist
        }) /* eslint-enable */
        .pipe($.plumber())
        .pipe($.tinify(gulpConfig.apiKeys.tinify)) // https://github.com/joshbroton/gulp-tinify#gulp-tinify
        .pipe($.imagemin([imageminGifsicle(), imageminJpegtran(), imageminOptipng(), imageminSvgo()])) // https://github.com/sindresorhus/gulp-imagemin#api
        .pipe(gulp.dest(`${gulpConfig.directories.dist}/`));
};
