// USEFUL FUNCTIONS
const alertHandler = require('./useful-functions/alert-handler');
const getOption = require('./useful-functions/get-option');


// Creates so-called spritesheet that consists a files .png and .scss, more info about module SPRITESMITH ---> https://github.com/Ensighten/spritesmith#spritesmith--
exports.task = () => {
    $.util.log($.util.colors.magenta('IMAGES SPRITE TASK RUNNING...'));

    const name = getOption('--name').value,
        spriteCssName = !name ? '_sprite' : name,
        spriteImgName = spriteCssName[0] === '_' ? spriteCssName.substring(1) : spriteCssName;

    if (!name) {
        alertHandler({
            type: 'info',
            message: `Default options passed to images:sprite task.
To change that, add command arguments to this task ---> gulp [TASK NAME = images:sprite] --name [_FILE_NAME].`
        });
    }

    gulp.src(`${gulpConfig.directories.work}/images/sprites_sources/**/*.{jpg,png,gif}`)
        .pipe($.plumber())
        .pipe($.spritesmith({ // https://github.com/twolfson/gulp.spritesmith#documentation
            imgName: `${spriteImgName}.png`,
            cssName: `${spriteCssName}.scss`,
            imgPath: `../images/${spriteImgName}.png`,
            padding: 10
        }))
        .pipe($.if('*.png', gulp.dest(`${gulpConfig.directories.work}/images/`), gulp.dest(`${gulpConfig.directories.work}/sass/components/sprites/`))); // https://github.com/robrich/gulp-if#gulp-if-api
};
