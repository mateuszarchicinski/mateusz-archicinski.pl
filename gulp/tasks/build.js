// NODE MODULES
const runSequence = require('run-sequence');


// Runs a sequence of gulp tasks in the specified order ---> https://github.com/OverZealous/run-sequence#run-sequence
exports.task = (callback) => {
    $.util.log($.util.colors.red('BUILD TASK RUNNING...'));

    runSequence('clean', 'sass:lint', 'sass:css', 'js:eslint', 'js', 'pug:lint', 'pug:html', 'html:hint', 'html', 'html:minify', 'copy', 'images:tinify', 'images', 'upload', callback);
};
