const shell = require('shelljs');

const { vagrantCLI } = require(`${pathJec}/src/providers/vbox/vagrantCommand`);

const { machineConfigInformations, ansibleAWXConfigInformations } = require(`${pathJec}/src/utils/configInformations`);

module.exports = {
    vbox(configurations) {
        const {
            tool,
            machine_name,
            public_ip,
            machine_number_of_cores,
            machine_memory_size,
            programs,
            ports,
            vars,
        } = configurations;

        shell.cd(`${pathJec}/src/files/provisioning`);

        if (tool) {
            console.log(`\n  >>>>>>>>>> Creating ${tool} in [VirtualBox]. Please Wait .......`);

            ansibleAWXConfigInformations(machine_name, machine_number_of_cores, machine_memory_size, public_ip, vars);

            shell.exec(
                vagrantCLI({ tool, machine_name, machine_number_of_cores, machine_memory_size, public_ip, vars })
            );

            ansibleAWXConfigInformations(machine_name, machine_number_of_cores, machine_memory_size, public_ip, vars);
        } else {
            console.log('\n  >>>>>>>>>> Creating Virtual Machine in [VirtualBox]. Please Wait .......');

            shell.exec(
                vagrantCLI({
                    machine_name,
                    public_ip,
                    machine_number_of_cores,
                    machine_memory_size,
                    programs,
                    ports,
                    vars,
                })
            );

            machineConfigInformations(
                machine_name,
                public_ip,
                machine_number_of_cores,
                machine_memory_size,
                programs,
                ports,
                vars
            );
        }
    },
};
