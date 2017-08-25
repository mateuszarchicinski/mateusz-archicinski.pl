// ESLINT CONFIG
const eslintConfig = {
    env: {
        browser: true,
        node: true,
        'shared-node-browser': true,
        es6: true,
        mocha: true
    },
    extends: 'eslint:recommended',
    globals: [
        'expect',
        'sinon'
    ],
    parserOptions: {
        ecmaVersion: 8,
        ecmaFeatures: {
            impliedStrict: true
        },
        sourceType: 'module'
    },
    rules: {
        indent: [
            2,
            4
        ],
        'linebreak-style': [
            2,
            'windows'
        ],
        quotes: [
            2,
            'single'
        ],
        semi: [
            2,
            'always'
        ],
        'arrow-body-style': [
            2,
            'always'
        ],
        'arrow-parens': [
            2,
            'always'
        ],
        'arrow-spacing': [
            2,
            {
                'before': true,
                'after': true
            }
        ],
        'no-var': 2,
        'prefer-arrow-callback': 2,
        'prefer-const': 2,
    }
};


module.exports = eslintConfig;
