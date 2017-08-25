// USEFUL FUNCTIONS
const createServer = require('./useful-functions/create-server');


// Runs locally server which listening on the production directory after finish building the web application
exports.dependencies = ['build'];
exports.task = () => {
    $.util.log($.util.colors.red('BUILD SERVER TASK RUNNING...'));

    return createServer(`${gulpConfig.directories.dist}/`);
};
