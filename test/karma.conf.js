// Karma configuration
module.exports = function (config) {
    config.set({
        // base path that will be used to resolve all patterns (eg. files, exclude)
        basePath: '../',


        // frameworks to use
        // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
        frameworks: [
            'mocha',
            'chai',
            'sinon-chai'
        ],


        // list of files / patterns to load in the browser
        files: [
            // Bower Components
            // bower:js
            'bower_components/jquery/dist/jquery.js',
            'bower_components/owl.carousel/dist/owl.carousel.js',
            // endbower

            {
                pattern: `${gulpConfig.directories.work}/js/**/!(main).js`,
                watched: false
            },
            {
                pattern: `${gulpConfig.directories.test}/spec/helpers.js`,
                watched: false
            },
            {
                pattern: `${gulpConfig.directories.test}/spec/**/*.js`,
                watched: false
            },
        ],


        // list of files to exclude
        exclude: [],


        // preprocess matching files before serving them to the browser
        // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
        rollupPreprocessor: {
            plugins: [
                require('rollup-plugin-istanbul')({
                    exclude: [
                        '{node_modules,bower_components,tests}/**/*.js'
                    ]
                }),
                require('rollup-plugin-commonjs')(),
                require('rollup-plugin-node-resolve')({
                    browser: true
                }),
                require('rollup-plugin-babel')(require('../gulp/babel.config.js'))
            ],
            format: 'iife',
            name: 'testBundle'
        },
        preprocessors: {
            [`${gulpConfig.directories.work}/js/**/*.js`]: ['rollup'],
            [`${gulpConfig.directories.test}/spec/helpers.js`]: ['rollup'],
            [`${gulpConfig.directories.test}/spec/**/*.js`]: ['rollup']
        },


        // test results reporter to use
        // possible values: 'dots', 'progress'
        // available reporters: https://npmjs.org/browse/keyword/karma-reporter
        mochaReporter: {
            output: 'autowatch',
            showDiff: true,
            ignoreSkipped: true,
            maxLogLines: 10
        },
        coverageReporter: {
            type: 'text-summary'
        },
        htmlReporter: {
            outputDir: 'test-reports',
            focusOnFailures: true,
            namedFiles: true,
            pageTitle: 'Test-Report__Frontend',
            reportName: `test-report_${require('moment')().format('DD-MM-YYYY')}`
        },
        reporters: [
            'mocha',
            'coverage',
            'html'
        ],


        // web server port
        port: 9876,


        // enable / disable colors in the output (reporters and logs)
        colors: true,


        // level of logging
        // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
        logLevel: config.LOG_INFO,


        // enable / disable watching file and executing tests whenever any file changes
        autoWatch: true,


        // start these browsers
        // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
        browsers: [
            'PhantomJS'
        ],


        // Continuous Integration mode
        // if true, Karma captures browsers, runs the tests and exits
        singleRun: false,


        // Concurrency level
        // how many browser should be started simultaneous
        concurrency: Infinity
    });
};
