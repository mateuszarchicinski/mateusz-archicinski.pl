// Copies a files from the working directory to the production directory
exports.task = () => {
    $.util.log($.util.colors.grey('COPY TASK RUNNING...'));

    return gulp.src([ /* eslint-disable */
            `${gulpConfig.directories.work}/files/**/*`,
            `${gulpConfig.directories.work}/fonts/**/*`,
            `${gulpConfig.directories.work}/images/**/*`,
            `!${gulpConfig.directories.work}/images/{sprites_sources,sprites_sources/**/*}`,
            `${gulpConfig.directories.work}/*.png`,
            `${gulpConfig.directories.work}/*.xml`,
            `${gulpConfig.directories.work}/*.ico`,
            `${gulpConfig.directories.work}/*.json`
        ], { /* eslint-enable */
            base: gulpConfig.directories.work
        })
        .pipe($.plumber())
        .pipe(gulp.dest(`${gulpConfig.directories.dist}/`));
};
