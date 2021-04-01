const shell = require('shelljs');
const semver = require('semver');
const chalk = require('chalk');

const pkg = require(`${pathJec}/package.json`);

const nodeVersionRequired = '14.11.0';
const vagrantVersionRequired = '2.2.7';
const virtualBoxVersionRequired = '6.0.10';

function checkForNewVersion() {
    return new Promise((resolve) => {
        shell.exec(
            `npm show ${pkg.name} version --fetch-retries 1 --fetch-retry-mintimeout 500 --fetch-retry-maxtimeout 500`,
            { silent: true, async: true },
            (code, stdout, stderr) => {
                if (!stderr && semver.lt(pkg.version, stdout)) resolve([true, stdout]);
                resolve([false, '', '']);
            }
        );
    });
}

function checkNode() {
    const nodeVersion = shell.exec('node --version', { silent: true }).split('v')[1].trim();

    if (semver.lte(nodeVersionRequired, nodeVersion)) {
        return [true, `NodeJs v${nodeVersion}`];
    }
    return [
        false,
        `NodeJs installed in a lower version than recommended. Upgrade to v${nodeVersionRequired} or higher at https://github.com/coreybutler/nvm-windows#node-version-manager-nvm-for-windows`,
    ];
}

function checkVagrant() {
    const vagrant = shell.which('vagrant', { silent: true });

    if (vagrant) {
        const vagrantVersion = shell.exec('vagrant --version', { silent: true }).split(' ')[1].trim();

        if (semver.lte(vagrantVersionRequired, vagrantVersion)) {
            return [true, `Vagrant v${vagrantVersion}`];
        }
        return [
            false,
            `Vagrant installed in a lower version than recommended. Upgrade to v${vagrantVersionRequired} or higher at https://www.vagrantup.com/downloads`,
        ];
    }
    return [false, 'Vagrant NOT INSTALLED. Download at https://www.vagrantup.com/downloads', false];
}

function checkVirtualBox() {
    const virtualBox = shell.which('virtualbox', { silent: true });

    if (virtualBox) {
        const virtualBoxVersion = shell.exec('vboxmanage --version', { silent: true }).split('r')[0];

        if (semver.lte(virtualBoxVersionRequired, virtualBoxVersion)) {
            return [true, `VirtualBox v${virtualBoxVersion}`];
        }
        return [
            false,
            `VirtualBox installed in a lower version than recommended. Upgrade to v${virtualBoxVersionRequired} or higher at https://www.virtualbox.org/wiki/Downloads`,
        ];
    }
    return [false, 'VirtualBox NOT INSTALLED. Download at https://www.virtualbox.org/wiki/Downloads', false];
}

module.exports = {
    async checkRequirements() {
        const node = checkNode();
        const vagrant = checkVagrant();
        const virtualBox = checkVirtualBox();
        const appForNewVersion = await checkForNewVersion();

        let dependencyOk = true;

        if (vagrant[2] === false || virtualBox[2] === false) dependencyOk = false;

        return [node, vagrant, virtualBox, appForNewVersion, dependencyOk];
    },

    checkRequirementsMessages(requeriments) {
        const [nodeRequirements, vagrantRequirements, virtualBoxRequirements] = requeriments;

        console.log(chalk.bold.green(`INFO!! Using ${pkg.description_name} in Wizard Mode`));

        console.log(
            `${
                nodeRequirements[0]
                    ? chalk.bold.green(`INFO!! ${nodeRequirements[1]}`)
                    : chalk.bold.yellow(`WARNING!! ${nodeRequirements[1]}`)
            }`
        );
        console.log(
            `${
                vagrantRequirements[0]
                    ? chalk.bold.green(`INFO!! ${vagrantRequirements[1]}`)
                    : vagrantRequirements[2] === false
                    ? chalk.bold.red(`PROBLEM!! ${vagrantRequirements[1]}`)
                    : chalk.bold.yellow(`WARNING!! ${vagrantRequirements[1]}`)
            }`
        );
        console.log(
            `${
                virtualBoxRequirements[0]
                    ? chalk.bold.green(`INFO!! ${virtualBoxRequirements[1]}`)
                    : virtualBoxRequirements[2] === false
                    ? chalk.bold.red(`PROBLEM!! ${virtualBoxRequirements[1]}`)
                    : chalk.bold.yellow(`WARNING!! ${virtualBoxRequirements[1]}`)
            }`
        );
    },
};
