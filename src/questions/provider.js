const inquirer = require('inquirer');
const chalk = require('chalk');

const modes = ['VirtualBox', 'Windows Subsystem for Linux 2 (WSL2)'];

module.exports = {
    ask: () => {
        const questions = [
            {
                type: 'list',
                name: 'provider',
                message: chalk.bold.italic('Select the Provider:'),
                choices: modes,
                filter(value) {
                    switch (value) {
                        case 'VirtualBox':
                            return 'vbox';
                        case 'Windows Subsystem for Linux 2 (WSL2)':
                            return 'wsl2';
                        default:
                            break;
                    }
                    return '';
                },
            },
        ];

        return inquirer.prompt(questions);
    },
};
