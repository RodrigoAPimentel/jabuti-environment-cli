const shell = require('shelljs');

const { createVirtualMachine } = require(`${pathJec}/src/creationModules/createVirtualMachine`);
const { createVirtualMachineTools } = require(`${pathJec}/src/creationModules/createVirtualMachineTools`);

module.exports = {
    async core(options) {
        switch (options.creationMode) {
            case 'Create Virtual Machine':
                await createVirtualMachine(options);
                break;

            case 'Create Virtual Machine with TOOL':
                await createVirtualMachineTools(options);
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
    },
};
