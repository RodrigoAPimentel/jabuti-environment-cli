const inquirer = require('inquirer');
const fs = require('fs').promises;

async function listVMToolInDirectory() {
    const listVMTools = await fs.readdir(`${pathJec}/src/files/vmTools`);

    return listVMTools.map((file) => file.split('.')[0]);
}

module.exports = {
    async ask() {
        const vmTools = await listVMToolInDirectory();

        const questions = [
            {
                type: 'list',
                name: 'vmTool',
                message: 'Select the Tool to be installed',
                choices: vmTools,
                pageSize: 20,
                validate(value) {
                    if (value.length) {
                        return true;
                    }
                    return 'Choose a Tool';
                },
            },
        ];
        return inquirer.prompt(questions);
    },

    async askAWX() {
        const questions = [
            {
                name: 'public_ip',
                type: 'input',
                message: '>>>> Enter the public IP of the Ansible-AWX:',
                default: '192.168.100.123',
            },
            {
                name: 'user',
                type: 'input',
                message: '>>>> Enter USER for Ansible AWX:',
                default: 'root',
            },
            {
                name: 'password',
                type: 'password',
                message: '>>>> Enter the PASSWORD for Ansible AWX (Default = toor):',
                default: 'toor',
            },
        ];
        return inquirer.prompt(questions);
    },

    async askMinishift() {
        const questions = [
            {
                name: 'cidr',
                type: 'input',
                message: '>>>> Enter the CIDR to be used for the minishift VM:',
                default: '192.168.99.1',
            },
        ];
        return inquirer.prompt(questions);
    },
};
