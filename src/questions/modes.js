const inquirer = require('inquirer');
const chalk = require('chalk');

const modes = [
    'Create Virtual Machine',
    'Create Virtual Machine with TOOL',
    // "Create Standard Development Environment",
    // "Create Development Environment from Profile",
    'Exit',
];

module.exports = {
    ask: () => {
        const questions = [
            {
                type: 'list',
                name: 'mode',
                message: chalk.bold.italic('Select the Mode of Operation:'),
                choices: modes,
                validate(value) {
                    if (value.length) {
                        return true;
                    }
                    return 'Choose a Mode';
                },
            },
        ];
        return inquirer.prompt(questions);
    },
};
