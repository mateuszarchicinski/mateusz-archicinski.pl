// NODE MODULES
const ftp = require('vinyl-ftp');


// USEFUL FUNCTIONS
const alertHandler = require('./useful-functions/alert-handler');
const getOption = require('./useful-functions/get-option');


// Uploads a files from the production directory to the FTP server, more info about module VINYL FTP ---> https://github.com/morris/vinyl-ftp#vinyl-ftp
exports.task = () => {
    $.util.log($.util.colors.yellow('UPLOAD TASK RUNNING...'));

    const ftpConfig = gulpConfig.ftpConfig; // https://github.com/morris/vinyl-ftp#api

    if (!ftpConfig.host || !ftpConfig.user || !ftpConfig.password || !ftpConfig.destination || !getOption('--upload')) {
        return alertHandler({
            type: 'error',
            message: `Task can not be complited.
Rememeber to set up your FTP CONFIG in ${gulpConfig.configFile} file.
Then add command argument to this task ---> gulp [TASK NAME = upload / build / build:server] --upload.`
        });
    }

    const conn = ftp.create(ftpConfig);

    return gulp.src(`${gulpConfig.directories.dist}/**/*`)
        .pipe($.plumber())
        .pipe(conn.dest(ftpConfig.destination));
};
