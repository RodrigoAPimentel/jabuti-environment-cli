const shell = require('shelljs');

const { provider: providers } = require(`${pathJec}/src/providers/provider`);

const { ask, askAWX, askMinishift } = require(`${pathJec}/src/questions/virtualMachineTool`);
const providers_questions = require(`${pathJec}/src/questions/provider`);

module.exports = {
    async createVirtualMachineTools(configurations) {
        let tool;

        if (configurations.modeUse === 'cli') {
            switch (configurations.devopsTool) {
                case 'ansible-awx':
                    tool = 'Ansible-AWX';
                    break;
                case 'minishift':
                    tool = 'Minishift-Windows';
                    break;
                default:
                    break;
            }
        } else {
            const { vmTool } = await ask();
            tool = vmTool;
        }

        switch (tool) {
            case 'Ansible-AWX':
                const vars = [];

                const machine_name = 'Ansible-AWX';
                const machine_number_of_cores = 2;
                const machine_memory_size = 4096;

                const { provider } = await providers_questions.ask();
                const { public_ip, user, password } =
                    configurations.modeUse === 'cli' ? configurations : await askAWX();

                vars[0] = user;
                vars[1] = password;

                providers({
                    tool,
                    machine_name,
                    machine_number_of_cores,
                    machine_memory_size,
                    public_ip,
                    vars,
                    provider,
                });
                break;

            case 'Minishift-Windows':
                let cidr;
                if (configurations.modeUse === 'cli') {
                    cidr = configurations.public_ip;
                } else {
                    const responses = await askMinishift();
                    cidr = responses.cidr;
                }

                console.log(`\n  >>>>>>>>>> Creating ${tool}. Please Wait .......`);

                shell.cd(`${pathJec}/src/files/vmTools/Minishift-Windows/minishift-1.34.2-windows-amd64`);
                shell.exec(`minishift start --vm-driver virtualbox --host-only-cidr ${cidr}/24`);
                break;

            default:
                break;
        }
    },
};
