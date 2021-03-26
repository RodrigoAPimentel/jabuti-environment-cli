const inquirer = require('inquirer');
const fs = require('fs').promises;

const ports = require(`${pathJec}/src/creationModules/virtualMachineSettings/ports`);

const modes = ['Standard Virtual Machine', 'Customize the Virtual Machine'];

async function listProgramsInDirectory() {
    const listFiles = await fs.readdir(`${pathJec}/src/files/programs`);

    return listFiles.map((file) => file.split('.')[0]).filter((file) => file !== 'ZSH');
}

module.exports = {
    async ask() {
        const questions = [
            {
                type: 'list',
                name: 'vmType',
                message: 'Select the type of Virtual Machine',
                choices: modes,
                pageSize: 20,
                validate(value) {
                    if (value.length) {
                        return true;
                    }
                    return 'Choose a type';
                },
            },
        ];
        return inquirer.prompt(questions);
    },

    async askCreateVirtualMachine() {
        const programs = await listProgramsInDirectory();

        const questions = [
            {
                type: 'input',
                name: 'machine_name',
                message: 'Enter the NAME of the Virtual Machine:',
                default: 'Virtual-Machine-1',
            },
            {
                type: 'input',
                name: 'public_ip',
                message: 'Enter the PUBLIC IP of the Virtual Machine:',
                default: '192.168.100.123',
            },
            {
                type: 'input',
                name: 'machine_number_of_cores',
                message: 'Enter the NUMBER OF CORES for the Virtual Machine:',
                default: '2',
            },
            {
                type: 'input',
                name: 'machine_memory_size',
                message: 'Enter the MEMORY RAM SIZE for the Virtual Machine (Mb):',
                default: '4096',
            },
            {
                type: 'input',
                name: 'user',
                message: 'Enter USER for Virtual Machine:',
                default: 'root',
            },
            {
                type: 'password',
                name: 'password',
                message: 'Enter the PASSWORD for Virtual Machine [Default = toor]:',
                default: 'toor',
            },
            {
                type: 'list',
                name: 'ssh_key',
                message: 'Do you want to copy the public SSH key to the Virtual Machine?',
                choices: ['Yes', 'No'],
            },
            {
                type: 'list',
                name: 'terminal',
                message: 'Do you want to change the terminal from Bash to Oh-My-ZSH on the Virtual Machine?',
                choices: ['Yes', 'No'],
            },
            {
                type: 'checkbox',
                name: 'programs',
                message: 'Select the programs to be installed:',
                choices: programs,
                pageSize: 20,
            },
            {
                type: 'checkbox',
                name: 'ports',
                message: 'Select the ports that became available:',
                choices: ports,
                pageSize: 20,
            },
        ];
        return inquirer.prompt(questions);
    },

    async askCreateVirtualMachineStandard() {
        const questions = [
            {
                type: 'input',
                name: 'machine_name_standard',
                message: 'Enter the NAME of the Virtual Machine:',
                default: 'Virtual-Machine-Standard-1',
            },
            {
                type: 'input',
                name: 'public_ip_standard',
                message: 'Enter the PUBLIC IP of the Virtual Machine:',
                default: '192.168.100.223',
            },
        ];
        return inquirer.prompt(questions);
    },

    async askOtherPort() {
        const otherPort = [
            {
                name: 'ruleName',
                type: 'input',
                message: '>>>> Enter the NEW Port Rule Name:',
                default: 'New-Rule',
            },
            {
                name: 'hostPort',
                type: 'input',
                message: '>>>> Enter the Host Port:',
                default: '3333',
            },
            {
                name: 'guestPort',
                type: 'input',
                message: '>>>> Enter the Guest Port:',
                default: '3333',
            },
        ];
        return inquirer.prompt(otherPort);
    },
};
