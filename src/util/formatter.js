const chalk = require('chalk');

const greenify = (message) => {
    return chalk.green(message);
}

const yellowfy = (message) => {
    return chalk.yellow(message);
}

const redify = (message) => {
    return chalk.red(message);
}

module.exports = {
    greenify,
    yellowfy,
    redify
}