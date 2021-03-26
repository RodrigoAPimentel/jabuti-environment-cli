const shell = require('shelljs');

const { vagrantCLI } = require(`${pathJec}/src/utils/vagrantCommand`);

const {
    standard_machine_memory_size,
    standard_machine_number_of_cores,
    standard_ports,
    standard_programs,
    standard_vars,
} = require(`${pathJec}/src/creationModules/virtualMachineSettings/defaultVirtualMachineSettings`);

const { machineConfigInformations } = require(`${pathJec}/src/utils/configInformations`);

const {
    ask,
    askCreateVirtualMachine,
    askCreateVirtualMachineStandard,
    askOtherPort,
} = require(`${pathJec}/src/questions/virtualMachineCreate`);

function executeVirtualMachine(
    machine_name,
    public_ip,
    machine_number_of_cores,
    machine_memory_size,
    programs,
    ports,
    vars
) {
    console.log('\n  >>>>>>>>>> Creating Virtual Machine. Please Wait .......');

    shell.cd(`${pathJec}/src/files/provisioning`);

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

module.exports = {
    async createVirtualMachine(configurations) {
        let type;

        if (configurations.modeUse === 'cli') {
            type = 'Virtual Machine CLI';
        } else {
            const { vmType } = await ask();
            type = vmType;
        }

        switch (type) {
            case 'Virtual Machine CLI':
                const {
                    machine_name: name,
                    public_ip: ipp,
                    numberCores = standard_machine_number_of_cores,
                    memorySize = standard_machine_memory_size,
                    user: usr = standard_vars[0],
                    password: psw = standard_vars[1],
                    sshKey = standard_vars[2],
                    terminal: ter = false,
                } = configurations;

                ter === true && standard_programs.push('ZSH');

                varss = [usr, psw, sshKey];

                sshKey === true
                    ? (varss[2] = ['Yes', `'${shell.cat('~/.ssh/id_rsa.pub').stdout.trim()}'`])
                    : (varss[2] = ['No', '']);

                executeVirtualMachine(name, ipp, numberCores, memorySize, standard_programs, standard_ports, varss);
                break;

            case 'Standard Virtual Machine':
                const { machine_name_standard, public_ip_standard } = await askCreateVirtualMachineStandard();

                executeVirtualMachine(
                    machine_name_standard,
                    public_ip_standard,
                    standard_machine_number_of_cores,
                    standard_machine_memory_size,
                    standard_programs,
                    standard_ports,
                    standard_vars
                );
                break;

            case 'Customize the Virtual Machine':
                const {
                    machine_name,
                    public_ip,
                    machine_number_of_cores,
                    machine_memory_size,
                    user,
                    password,
                    ssh_key,
                    programs,
                    ports,
                    terminal,
                } = await askCreateVirtualMachine();

                const vars = [user, password];

                ports.map((port, i) => {
                    const hostPort = ports[i].substring(ports[i].indexOf('(') + 1, ports[i].indexOf(':'));
                    const ip = public_ip.split('.')[3];
                    const hostPortModified = parseInt(hostPort) + parseInt(ip);

                    ports[i] = port.replace(eval(`/${hostPort}/i`), hostPortModified);
                });

                if (ports[0] === 'Other') {
                    const { ruleName, hostPort, guestPort } = await askOtherPort();

                    ports.map((port, i) => port === 'Other' && (ports[i] = `${ruleName}(${hostPort}:${guestPort})`));
                }

                programs.map((prg, idx) => {
                    if (prg === 'NestJS') {
                        programs.splice(idx, 1);
                        programs.push(prg);
                    }
                });

                if (terminal === 'Yes') programs.push('ZSH');

                ssh_key === 'Yes'
                    ? (vars[2] = ['Yes', `'${shell.cat('~/.ssh/id_rsa.pub').stdout.trim()}'`])
                    : (vars[2] = ['No', '']);

                executeVirtualMachine(
                    machine_name,
                    public_ip,
                    machine_number_of_cores,
                    machine_memory_size,
                    programs,
                    ports,
                    vars
                );
                break;

            default:
                break;
        }
    },
};
