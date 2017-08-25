// To get a parameter after command option
function getOption(option) {
    if (!option) {
        return false;
    }

    const index = process.argv.indexOf(option);

    return index !== -1 ? {
        value: process.argv[index + 1]
    } : false;
};


module.exports = getOption;
