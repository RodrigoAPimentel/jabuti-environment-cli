#!/usr/bin/env node
const shell = require('shelljs');
const clear = require('clear');

const modes_questions = require('./questions/modes');
const { homeScreen } = require('./modules/homeScreen');

const { createVirtualMachine } = require('./modules/createVirtualMachine');
const { createVirtualMachineTools } = require('./modules/createVirtualMachineTools');

module.exports = class Jec {
    constructor() {
        console.log('iiiiiiiiiiiii');
        this.init();
    }

    async init() {
        // clear();
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

            // case "Create Standard Environment":
            //   console.log(chalk.red("Not Implemented 1"));
            //   break;

            // case "Create Development Environment from Profile":
            //   console.log(chalk.red("Not Implemented 2"));
            //   break;

            case 'Exit':
                shell.exit(1);
                break;

            default:
                console.log('Not Implemented !!');
                break;
        }
    }
};

// module.exports = new Jec();
