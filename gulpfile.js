// NORMAL - TEMPLATE


// GLOBALS & NODE MODULES & GLUP CONFIG & ENVIRONMENT
global.gulp = require('gulp'); // https://gulp.readme.io/docs/getting-started
global.$ = require('gulp-load-plugins')({
    lazy: true
}); // https://github.com/jackfranklin/gulp-load-plugins#options
global.gulpConfig = require('./gulp/config');
global.env = require('./gulp/tasks/useful-functions/get-option')('--env').value || 'development';
const gulpTasksDir = './gulp/tasks/';
const fs = require('fs');


// Reads all Gulp tasks files and creates tasks for them
fs.readdirSync(gulpTasksDir)
    .filter((filename) => {
        return filename.match(/\.js$/i);
    })
    .map((filename) => {
        return {
            name: filename.substr(0, filename.length - 3).replace('-', ':'),
            contents: require(gulpTasksDir + filename)
        };
    })
    .forEach((file) => {
        gulp.task(file.name, file.contents.dependencies, file.contents.task);
    });
