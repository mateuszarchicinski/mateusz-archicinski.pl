// JSDOC CONFIG
const jsdocConfig = {
    source: {
        include: [
            './src/js'
        ],
        exclude: [
            './node_modules'
        ]
    },
    opts: {
        destination: './docs'
    }
};


module.exports = jsdocConfig;
