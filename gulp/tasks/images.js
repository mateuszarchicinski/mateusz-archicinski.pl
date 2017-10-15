// NODE MODULES
const imageminGifsicle = require('imagemin-gifsicle');
const imageminJpegtran = require('imagemin-jpegtran');
const imageminOptipng = require('imagemin-optipng');
const imageminSvgo = require('imagemin-svgo');


// Optimizes images by using standard modules avaible via NPM
exports.task = () => {
    $.util.log($.util.colors.magenta('IMAGES TASK RUNNING...'));

    return gulp.src(`${gulpConfig.directories.dist}/images/**/*.{jpg,png,svg,gif}`, { /* eslint-disable */
            base: gulpConfig.directories.dist
        }) /* eslint-enable */
        .pipe($.plumber())
        .pipe($.imagemin([imageminGifsicle(), imageminJpegtran(), imageminOptipng(), imageminSvgo()])) // https://github.com/sindresorhus/gulp-imagemin#api
        .pipe(gulp.dest(`${gulpConfig.directories.dist}/`));
};
