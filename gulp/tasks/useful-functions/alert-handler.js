// To display a console log message in five types: normal, success, info, warning and error
function alertHandler(args) {
    args = args || {};

    const types = {
            normal: 'white',
            success: 'green',
            info: 'blue',
            warning: 'yellow',
            error: 'red'
        },
        type = args.type || 'info',
        title = args.title || type,
        message = args.message || 'Remember to specify necessary property type & message in a configuration object.',
        color = types[type],
        messageTemplate = `
**~~~~~~~~* ${title.toUpperCase()} LOG - OPEN *~~~~~~~~~**
${message}
**~~~~~~~~* ${title.toUpperCase()} LOG - CLOSE *~~~~~~~~**`;

    $.util.log($.util.colors[color](messageTemplate)); // https://github.com/gulpjs/gulp-util#usage
};


module.exports = alertHandler;
