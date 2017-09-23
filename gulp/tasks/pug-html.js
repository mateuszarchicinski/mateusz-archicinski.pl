// NODE MODULES
const wiredep = require('wiredep').stream;
const fs = require('fs');


// Compiling .pug files to HTML code which is completed by information from data object, finally injects into HTML code tags LINK & SCRIPT with paths to libraries CSS and JS installed via Bower
exports.task = (callback) => {
    $.util.log($.util.colors.green('PUG TASK RUNNING...'));

    return fs.readdirSync('./translations/')
        .filter((filename) => {
            return filename.match(/\.json$/i);
        })
        .map((filename) => {
            return filename.substr(0, filename.length - 5);
        })
        .forEach((language, index, languages) => {
            return gulp.src([ /* eslint-disable */
                    `${gulpConfig.directories.work}/templates/*.pug`,
                    `${gulpConfig.directories.work}/templates/views/**/*.pug`
                ], { /* eslint-enable */
                    base: `${gulpConfig.directories.work}/templates`
                })
                .pipe($.plumber())
                .pipe($.data((file) => { // https://github.com/colynb/gulp-data#gulp-data
                    return {
                        lang: language,
                        langs: languages,
                        config: gulpConfig,
                        data: JSON.parse(fs.readFileSync(`./translations/${language}.json`, 'utf8'))
                    };
                }))
                .pipe($.pug({ // https://pugjs.org/api/getting-started.html
                    pretty: true,
                    compileDebug: true
                }))
                .pipe(wiredep({ // https://github.com/taptapship/wiredep#wiredep--
                    exclude: ['bootstrap', 'popper'],
                    ignorePath: '../'
                }))
                .pipe($.rename({
                    suffix: `-${language}`
                }))
                .pipe(gulp.dest(`${gulpConfig.directories.work}/`))
                .on('end', () => {
                    if (index === languages.length - 1) {
                        callback();
                    }
                });
        });
};
