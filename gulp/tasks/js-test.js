// NODE MODULES
const karma = require('karma').Server;


// Runs unit tests in Karma environment which is configurable via karma.conf.js for more info check ---> https://karma-runner.github.io/1.0/index.html
exports.dependencies = ['js:test-dependencies'];
exports.task = () => {
    $.util.log($.util.colors.cyan('JS TEST TASK RUNNING...'));

    return new karma({
        configFile: `${__dirname}/../../${gulpConfig.directories.test}/karma.conf.js` // https://karma-runner.github.io/1.0/config/configuration-file.html
    }).start();
};
