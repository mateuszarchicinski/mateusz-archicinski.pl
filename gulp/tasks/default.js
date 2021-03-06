// NODE MODULES
const runSequence = require('run-sequence').use(gulp);


// Runs a sequence of gulp tasks in the specified order ---> https://github.com/OverZealous/run-sequence#run-sequence
exports.task = (callback) => {
    $.util.log($.util.colors.red('DEFAULT TASK RUNNING...'));

    runSequence('sass:lint', 'sass:css', 'js:eslint', 'js', 'pug:lint', 'pug:html', 'html:hint', 'server', 'watch', callback);
};
