// NODE MODULES
const browserSync = require('browser-sync');


// Compiling SASS to CSS, adding right prefixes to CSS methods - depending on configuration, creating source map, finally injects CSS styles into browser
exports.task = () => {
    $.util.log($.util.colors.green('SASS TO CSS TASK RUNNING...'));

    return gulp.src(`${gulpConfig.directories.work}/sass/*.s+(a|c)ss`)
        .pipe($.plumber()) // https://github.com/floatdrop/gulp-plumber#monkey-gulp-plumber
        .pipe($.sourcemaps.init()) // https://github.com/floridoo/gulp-sourcemaps#init-options
        .pipe($.sass.sync({ // https://github.com/sass/node-sass#options
            outputStyle: 'nested' // compact - compressed - expanded - nested
        }))
        .pipe($.autoprefixer({ // https://github.com/postcss/autoprefixer#options
            browsers: ['last 5 version'],
            stats: ['> 1%']
        }))
        .pipe($.sourcemaps.write('./maps/'))
        .pipe(gulp.dest(`${gulpConfig.directories.work}/css/`))
        .pipe(browserSync.stream({
            match: '**/*.css'
        })); // https://www.browsersync.io/docs/gulp
};
