// USEFUL FUNCTIONS
const createServer = require('./useful-functions/create-server');


// Runs locally server which allows to sync file changes with browser preview and to browse websites using connected devices, more info about module BROWSER SYNC ---> https://www.browsersync.io/docs/gulp
exports.task = () => {
    $.util.log($.util.colors.red('SERVER TASK RUNNING...'));

    return createServer(`${gulpConfig.directories.work}/`);
};
