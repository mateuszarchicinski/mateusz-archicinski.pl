// NODE MODULES
const browserSync = require('browser-sync');


// Created to fix problem with browserSync.reload, more info ---> https://github.com/BrowserSync/browser-sync/issues/717#issuecomment-119713757
exports.dependencies = ['html:hint'];
exports.task = browserSync.reload;
