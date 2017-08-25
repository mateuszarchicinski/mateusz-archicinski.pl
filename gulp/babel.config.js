// BABEL CONFIG
const babelConfig = {
    presets: [
        ['latest', {
            es2015: {
                modules: false
            }
        }]
    ],
    plugins: [
        'external-helpers'
    ]
};


module.exports = babelConfig;
