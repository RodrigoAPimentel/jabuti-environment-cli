#!/usr/bin/env node
const clear = require('clear');

const { logo } = require('./src/modules/logo');

const modes_questions = require('./src/questions/modes');

const { createVirtualMachine } = require('./src/modules/createVirtualMachine');
const { createVirtualMachineTools } = require('./src/modules/createVirtualMachineTools');

class Jec {
    constructor() {
        clear();
        logo();
        this.modes();
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
            default:
                console.log('Not Implemented !!');
                break;
        }
    }
}

module.exports = new Jec();
