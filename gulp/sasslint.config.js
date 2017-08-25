// SASSLINT CONFIG
const sasslintConfig = {
    options: {
        formatter: 'stylish', // checkstyle / stylish
        'merge-default-rules': false
    },
    rules: {
        'no-color-keywords': 2,
        'no-color-literals': 2,
        'no-ids': 2,
        'no-important': 2,
        'no-invalid-hex': 2,
        'hex-notation': 2
    }
};


module.exports = sasslintConfig;
