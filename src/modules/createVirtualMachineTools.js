const clear = require('clear');
const shell = require('shelljs');
const { JEC_PATH } = require('../relativePath');

const { vagrantCLI } = require(`${JEC_PATH}/src/vagrantCommand`);

const { homeScreen } = require(`${JEC_PATH}/src/modules/homeScreen`);
const { ansibleAWXConfigInformations } = require(`${JEC_PATH}/src/modules/configInformations`);

const { ask, askAWX, askMinishift } = require(`${JEC_PATH}/src/questions/virtualMachine_tool`);

module.exports = {
    async createVirtualMachineTools() {
        const { vmTool } = await ask();

        switch (vmTool) {
            case 'Ansible-AWX':
                const vars = [];

                const machine_name = 'Ansible-AWX';
                const machine_number_of_cores = 2;
                const machine_memory_size = 4096;

                const { public_ip, user, password } = await askAWX();

                vars[0] = user;
                vars[1] = password;

                clear();
                homeScreen();

                console.log(`\n  >>>>>>>>>> Creating ${vmTool}. Please Wait .......`);

                ansibleAWXConfigInformations(
                    machine_name,
                    machine_number_of_cores,
                    machine_memory_size,
                    public_ip,
                    vars
                );

                shell.cd(`${JEC_PATH}/src/files`);

                shell.exec(
                    vagrantCLI({ vmTool, machine_name, machine_number_of_cores, machine_memory_size, public_ip, vars })
                );

                ansibleAWXConfigInformations(
                    machine_name,
                    machine_number_of_cores,
                    machine_memory_size,
                    public_ip,
                    vars
                );
                break;
            case 'Minishift-Windows':
                const { cidr } = await askMinishift();

                shell.cd(`${JEC_PATH}/src/files/vmTools/Minishift-Windows/minishift-1.34.2-windows-amd64`);
                shell.exec(`minishift start --vm-driver virtualbox --host-only-cidr ${cidr}/24`);
                break;
            default:
                console.log('Not Implemented !!');
                break;
        }
    },
};
