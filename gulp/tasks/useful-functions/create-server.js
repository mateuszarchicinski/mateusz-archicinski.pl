// NODE MODULES
const browserSync = require('browser-sync');
const express = require('express');


// USEFUL FUNCTIONS
const alertHandler = require('./alert-handler');


// To create the BROWSER SYNC server with EXPRESS as a middleware which redirects requests to main page
function createServer(baseDir) {
    const serverConfig = gulpConfig.browserSync;

    // ExpressAPP Init ---> https://expressjs.com/en/4x/api.html
    const app = express();

    // Enables all Cross-Origin Resource Sharing (CORS) requests, more info about CORS ---> https://developer.mozilla.org/en-US/docs/Web/HTTP/Access_control_CORS
    app.use((req, res, next) => {
        res.header('Access-Control-Allow-Origin', '*');

        next();
    });

    // Serves static files from the directory, which is defined in a variable baseDir
    app.use('/', express.static(`${__dirname}/../../../${baseDir}`));
    // Sets up static file directories
    serverConfig.staticDirectories.forEach((item) => {
        app.use(`/${item}`, express.static(`${__dirname}/../../../${item}`));
    });

    // Handles all possible routes to send the appropriate HTML file
    app.get(['/', '/:lang', '/:lang/*', '*'], (req, res, next) => {
        const langValue = req.params.lang || serverConfig.defaultLanguage;

        if (!/^\/($|[A-Za-z]{2}\/{0,1}$)/.test(req.url)) {
            return res.redirect(301, '/');
        }

        return res.status(200).type('html').sendFile(`index-${langValue}.html`, {
            root: `${__dirname}/../../../${baseDir}`
        }, (err) => {
            if (err) {
                next(err);
            }
        });
    });

    // Endpoints
    app.post('/endpoints/contact-form', (req, res, next) => {
        let statusCode = 200,
            message = 'Message was sent!';

        if (Math.floor(Math.random() * 10) % 2) {
            statusCode = 400;
            message = 'Bad request!';
        }

        res.status(statusCode).json({
            statusCode: statusCode,
            message: message
        });
    });

    // Handles HTTP errors
    app.use((err, req, res, next) => {
        const statusCode = err.statusCode || 500;

        alertHandler({
            type: 'error',
            message: err
        });

        return res.status(statusCode).type('json').send({
            message: err.message,
            statusCode: statusCode
        });
    });

    // Init BROWSER SYNC ---> https://www.browsersync.io/docs
    browserSync.init({
        proxy: `${serverConfig.target}:${serverConfig.port}`,
        port: serverConfig.port,
        middleware: [app],
        logPrefix: serverConfig.logPrefix,
        logConnections: serverConfig.logConnections
    }, (err, bs) => {
        // Socket.IO Functionality
        bs.io.sockets.on('connection', (socket) => {});
    });
};


module.exports = createServer;
