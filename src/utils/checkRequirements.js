const shell = require('shelljs');
const semver = require('semver');

const nodeVersionRequired = '14.11.0';
const vagrantVersionRequired = '2.2.7';
const virtualBoxVersionRequired = '6.0.10';

function checkForNewVersion(infoCLI) {
    return new Promise((resolve) => {
        shell.exec(
            `npm show ${infoCLI.name} version --fetch-retries 1 --fetch-retry-mintimeout 500 --fetch-retry-maxtimeout 500`,
            { silent: true, async: true },
            (code, stdout, stderr) => {
                if (!stderr && semver.lt(infoCLI.version, stdout)) resolve([true, stdout]);
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
    async checkRequirements(infoCLI) {
        const node = checkNode();
        const vagrant = checkVagrant();
        const virtualBox = checkVirtualBox();
        const appForNewVersion = await checkForNewVersion(infoCLI);

        let dependencyOk = true;

        if (vagrant[2] === false || virtualBox[2] === false) dependencyOk = false;

        return [node, vagrant, virtualBox, appForNewVersion, dependencyOk];
    },
};
