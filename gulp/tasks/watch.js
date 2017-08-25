// Watching a file changes then runs the appropriate tasks
exports.task = () => {
    $.util.log($.util.colors.blue('WATCH TASK RUNNING...'));

    gulp.watch(`${gulpConfig.directories.work}/sass/**/*.s+(a|c)ss`, [
        'sass:lint',
        'sass:css'
    ]);

    gulp.watch([
        `${gulpConfig.directories.work}/js/**/*.js`,
        `!${gulpConfig.directories.work}/js/main.js`,
        `${gulpConfig.directories.test}/spec/**/*.js`
    ], [
        'watch:js'
    ]);

    gulp.watch([
        'translations/*.json',
        `${gulpConfig.directories.work}/templates/**/*.pug`,
        'bower.json'
    ], [
        'pug:lint',
        'pug:html'
    ]);

    gulp.watch([
        `${gulpConfig.directories.work}/*.html`,
        `${gulpConfig.directories.work}/views/**/*.html`
    ], [
        'watch:html'
    ]);
};
