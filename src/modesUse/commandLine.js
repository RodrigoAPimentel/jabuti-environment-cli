const program = require('commander');
const shell = require('shelljs');

const pkg = require(`${pathJec}/package.json`);

const { core } = require(`${pathJec}/src/modesUse/modeUseCore`);
const { checkRequirements, checkRequirementsMessages } = require(`${pathJec}/src/utils/checkRequirements`);

module.exports = {
    cliCommands() {
        let opts = { modeUse: 'cli' };

        program.version(pkg.version);

        program
            .command('wizard')
            .description('Start the JEC with Wizard')
            .action(() => {
                opts = { wizard: true };
            });

        program
            .command('machine <machine_name> <public_ip>')
            .description(
                'Creates a Virtual Machine. If informed only the machine_name and public_ip a machine with standard configuration will be created. (<public_ip> format: xxx.xxx.xxx.xxx)'
            )
            .option('-p --number-cores <number>', 'Enter the Quantity of CPU Colors reserved for Virtual Machine')
            .option('-m --memory-size <megabytes>', 'Enter the Amount of RAM reserved for the Virtual Machine (Mb)')
            .option('-u --user <user>', 'Inform the User of the Virtual Machine Operating System')
            .option('-s --password <password>', 'Enter the Password for the Virtual Machine Operating System User')
            .option('-k --ssh-key', 'Copies the SSH key of the folder to the Virtual Machine')
            .option('-t --terminal', 'Installs and configures the Oh-My-ZSH Terminal on the Virtual Machine')
            .action((machine_name, public_ip, options) => {
                opts = { ...opts, creationMode: 'Create Virtual Machine', machine_name, public_ip, ...options };
            });

        program
            .command('tool <public_ip> <user> <password>')
            .description('Creates a Virtual Machine with DevOps Tool. (<public_ip> format: xxx.xxx.xxx.xxx)')
            .addOption(
                new program.Option('-r, --provider <provider>', 'Provider for Creation Virtual Machine Tool')
                    .choices(['vbox', 'wsl2'])
                    .makeOptionMandatory()
            )
            .addOption(
                new program.Option('-d, --devops-tool <tool>', 'DevOps Tool')
                    .choices(['ansible-awx', 'minishift'])
                    .makeOptionMandatory()
            )
            .action((public_ip, user, password, options) => {
                opts = {
                    ...opts,
                    creationMode: 'Create Virtual Machine with TOOL',
                    public_ip,
                    user,
                    password,
                    ...options,
                };
            });

        program
            .command('environment')
            .description('Creates a Development Environment')
            .addOption(
                new program.Option('-r, --provider <provider>', 'Provider for Environment Creation')
                    .choices(['vbox', 'wsl2'])
                    .makeOptionMandatory()
            )
            .addOption(
                new program.Option('-e, --environment <environment>', 'Development Environment')
                    .choices(['react-native', 'react'])
                    .makeOptionMandatory()
            )
            .action((options) => {
                opts = { ...opts, creationMode: 'Create Standard Development Environment', ...options };
            });

        program
            .command('requeriments')
            .description('Basic Requirements Status')
            .action(async () => {
                checkRequirementsMessages(await checkRequirements());
            });

        program.command('tst').action(() => {
            console.log('\n>>>>>>>>>> MODO TESTE <<<<<<<<<<\n');
            shell.exec('wsl --exec cat /etc/issue');
            const pathJecWsl = `/mnt/${pathJec.replaceAll('\\', '/').replaceAll(':', '').toLowerCase()}`;
            console.log(pathJec);
            console.log(pathJecWsl);
            // shell.exec(`wsl --exec ls -la ${pathJecWsl}`);
            // shell.exec(`wsl --exec cp ${pathJecWsl}/src/files/programs/Git.sh /mnt/wsl/`);
            shell.exec(`wsl --exec ls -la /mnt/wsl`);
        });

        program.parse(process.argv);

        return opts;
    },

    async run(cliOptions) {
        core(cliOptions);
    },
};
