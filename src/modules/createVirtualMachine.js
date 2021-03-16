const shell = require('shelljs');
const { JEC_PATH } = require('../relativePath');

const { vagrantCLI } = require(`${JEC_PATH}/src/vagrantCommand`);

const { machineConfigInformations } = require(`${JEC_PATH}/src/modules/configInformations`);

const { ask, askOtherPort } = require(`${JEC_PATH}/src/questions/virtualMachine_create`);

module.exports = {
    async createVirtualMachine() {
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
        } = await ask();

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

        console.log('\n  >>>>>>>>>> Creating Virtual Machine. Please Wait .......');

        shell.cd(`${JEC_PATH}/src/files`);

        shell.exec(
            vagrantCLI({ machine_name, public_ip, machine_number_of_cores, machine_memory_size, programs, ports, vars })
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
    },
};
