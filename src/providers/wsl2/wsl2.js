const shell = require('shelljs');

module.exports = {
    wsl2(configurations) {
        console.log('\n  >>>>>>>>>> Creating Virtual Machine in [WSL2]. Please Wait .......');

        console.log(`${JSON.stringify(configurations)}`);

        shell.exec('wsl --exec cat /etc/issue');
    },
};
