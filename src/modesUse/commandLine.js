const program = require('commander');

const pkg = require(`${pathJec}/package.json`);

const { core } = require(`${pathJec}/src/modesUse/modeUseCore`);

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
            .command('vm <machine_name> <public_ip>')
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
                new program.Option('-d, --devops-tool <tool>', 'DevOps Tool').choices(['ansible-awx', 'minishift'])
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

        program.parse(process.argv);

        return opts;
    },

    async run(cliOptions) {
        core(cliOptions);
    },
};
