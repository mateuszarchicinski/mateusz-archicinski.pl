// NODE MODULES
const rollup = require('rollup');


// ROLLUP CONFIG
const rollupConfig = require('../rollup.config.js');


// Builds main JavaScript file from many with supports Node.js & ECMAScripts features, for more info check ---> https://rollupjs.org/
exports.task = async function () { // https://rollupjs.org/#gulp
    $.util.log($.util.colors.green('JS TASK RUNNING...'));

    const bundle = await rollup.rollup(rollupConfig.input); // https://rollupjs.org/#big-list-of-options

    return await bundle.write(rollupConfig.output);
};
