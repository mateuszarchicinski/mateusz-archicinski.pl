// NODE MODULES
const wiredep = require('wiredep');


// Injects into karma.config.js file test dependencies / JavaScript sources from Bower
exports.task = () => {
    $.util.log($.util.colors.green('JS TEST DEPENDENCIES TASK RUNNING...'));

    return gulp.src(`${gulpConfig.directories.test}/karma.conf.js`, { /* eslint-disable */
            base: gulpConfig.directories.test
        }) /* eslint-enable */
        .pipe($.plumber())
        .pipe(wiredep.stream({ // https://github.com/taptapship/wiredep#configuration
            exclude: ['bootstrap', 'jquery', 'popper'],
            ignorePath: '../',
            fileTypes: {
                js: {
                    block: /(([ \t]*)\/\/\s*bower:js*(\S*))(\n|\r|.)*?(\/\/\s*endbower)/gi,
                    detect: {
                        js: /['\']([^'\']+\.js)['\'],?/gi
                    },
                    replace: {
                        js: '"{{filePath}}",'
                    }
                }
            }
        }))
        .pipe(gulp.dest(`${gulpConfig.directories.test}/`));
};
