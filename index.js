#!/usr/bin/env node
const shell = require('shelljs');
const clear = require('clear');

const modes_questions = require('./src/questions/modes');
const { homeScreen } = require('./src/modules/homeScreen');

const { createVirtualMachine } = require('./src/modules/createVirtualMachine');
const { createVirtualMachineTools } = require('./src/modules/createVirtualMachineTools');

class Jec {
    constructor() {
        this.init();
    }

    async init() {
        clear();
        const status = await homeScreen();
        status && this.modes();
    }

    async modes() {
        const responses = await modes_questions.ask();

        switch (responses.mode) {
            case 'Create Virtual Machine':
                await createVirtualMachine();
                break;

            case 'Create Virtual Machine with TOOL':
                await createVirtualMachineTools();
                break;

            // case 'Create Standard Development Environment':
            //     console.log(chalk.bold.red('    Not Implemented !!'));
            //     break;

            // case 'Create Development Environment from Profile':
            //     console.log(chalk.bold.red('    Not Implemented !!'));
            //     break;

            case 'Exit':
                shell.exit(1);
                break;

            default:
                break;
        }
    }
}

module.exports = new Jec();
