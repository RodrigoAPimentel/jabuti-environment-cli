#!/usr/bin/env node
const shell = require('shelljs');
const chalk = require('chalk');

const packagejs = require('./package.json');

class Index {
    constructor() {
        console.log('jjjjjjjjjjjjjj');
        this.init();
    }

    async init() {
        await this.checkEnvironmentVariableExists();
        const Jec = require('./src/jec');
        new Jec();
    }

    async checkEnvironmentVariableExists() {
        return new Promise((resolve) => {
            if (!shell.env.JEC_HOME7) {
                console.log(chalk.yellow(`\n   Creating JEC_HOME7 environment variable .....\n`));

                if (shell.env.NVM_HOME) {
                    return resolve(
                        shell.exec(
                            `setx JEC_HOME7 "${shell.env.NVM_HOME}\\${shell.exec('node --version', {
                                silent: true,
                                async: true,
                            })}\\node_modules\\${packagejs.name}" /M`
                        )
                        // shell.exec(
                        //     `setx JEC_HOME7 "algumacoisa\\v123.456\\node_modules\\asdf\\vnjgfhj\\rhfghfghf\\zsdcsdfsd\\45645645\\2342\\sdfsfs" /M`
                        // )
                    );
                }
            }
            return resolve();
        });
    }
}

module.exports = new Index();
