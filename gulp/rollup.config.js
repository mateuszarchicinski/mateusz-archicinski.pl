const nodeResolve = require('rollup-plugin-node-resolve');
const convertCJS = require('rollup-plugin-commonjs');
const babel = require('rollup-plugin-babel');


// ROLLUP CONFIG - INPUT
exports.input = {
    input: `${gulpConfig.directories.work}/js/main.rollup.js`,
    plugins: [
        nodeResolve(),
        convertCJS(),
        babel(require('./babel.config.js'))
    ]
};


// ROLLUP CONFIG - OUTPUT
exports.output = {
    file: `${gulpConfig.directories.work}/js/main.js`,
    format: 'iife',
    //name: 'mainBundle',
    sourcemap: true
};
