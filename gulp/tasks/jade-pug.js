// NODE MODULES
const del = require('del');


// Changing extensions of files from .jade to .pug, finally removes all .jade files
exports.task = () => {
    $.util.log($.util.colors.green('JADE TO PUG TASK RUNNING...'));

    gulp.src(`${gulpConfig.directories.work}/templates/**/*.jade`, { /* eslint-disable */
            base: gulpConfig.directories.work
        }) /* eslint-enable */
        .pipe($.plumber())
        .pipe($.rename({ // https://github.com/hparra/gulp-rename#usage
            extname: '.pug'
        }))
        .pipe(gulp.dest(`${gulpConfig.directories.work}/`))
        .on('end', () => {
            del(`${gulpConfig.directories.work}/templates/**/*.jade`); // https://github.com/sindresorhus/del#usage
        });
};
