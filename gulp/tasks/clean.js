// NODE MODULES
const del = require('del');


// Removes production directory, more info about module DEL ---> https://github.com/sindresorhus/del#del--
exports.task = () => {
    $.util.log($.util.colors.gray('CLEAN TASK RUNNING...'));

    return del(gulpConfig.directories.dist);
};
