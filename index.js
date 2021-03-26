#!/usr/bin/env node
global.pathJec = __dirname;

const { cliCommands, run } = require(`${pathJec}/src/modesUse/commandLine`);

class Jec {
    constructor() {
        const cliOptions = cliCommands();

        if (cliOptions.wizard) {
            require('./src/modesUse/wizard');
        } else {
            run(cliOptions);
        }
    }
}

module.exports = new Jec();
