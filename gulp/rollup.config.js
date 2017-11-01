// ROLLUP PLUGINS - ARRAY
const rollupPlugins = [
    require('rollup-plugin-commonjs')(),
    require('rollup-plugin-node-resolve')({
        browser: true
    }),
    require('rollup-plugin-babel')(require('./babel.config.js'))
];


// Replaces some code only on production environment
if (env === 'production') {
    rollupPlugins.push(
        require('rollup-plugin-replace')({
            '___browserSync___.socket': 'io()'
        })
    );
}


// ROLLUP CONFIG - INPUT
exports.input = {
    input: `${gulpConfig.directories.work}/js/main.rollup.js`,
    plugins: rollupPlugins
};


// ROLLUP CONFIG - OUTPUT
exports.output = {
    file: `${gulpConfig.directories.work}/js/main.js`,
    format: 'iife',
    //name: 'mainBundle',
    sourcemap: true
};
