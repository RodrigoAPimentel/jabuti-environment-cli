const chalk = require('chalk');
const { JEC_PATH } = require('../relativePath');

const infoCLI = require(`${JEC_PATH}/package.json`);

const appName = infoCLI.description_name;
const appDescription = infoCLI.description;
const appVersion = infoCLI.version;

module.exports = {
    logo() {
        console.log(`
${chalk.red('     ██╗ █████╗ ██████╗ ██╗   ██╗████████╗██╗    ')}${chalk.yellow(
            '███████╗███╗   ██╗██╗   ██╗██╗██████╗  ██████╗ ███╗   ██╗███╗   ███╗███████╗███╗   ██╗████████╗     ██████╗██╗     ██╗'
        )}
${chalk.red('     ██║██╔══██╗██╔══██╗██║   ██║╚══██╔══╝██║    ')}${chalk.yellow(
            '██╔════╝████╗  ██║██║   ██║██║██╔══██╗██╔═══██╗████╗  ██║████╗ ████║██╔════╝████╗  ██║╚══██╔══╝    ██╔════╝██║     ██║'
        )}
${chalk.red('     ██║███████║██████╔╝██║   ██║   ██║   ██║    ')}${chalk.yellow(
            '█████╗  ██╔██╗ ██║██║   ██║██║██████╔╝██║   ██║██╔██╗ ██║██╔████╔██║█████╗  ██╔██╗ ██║   ██║       ██║     ██║     ██║'
        )}
${chalk.red('██   ██║██╔══██║██╔══██╗██║   ██║   ██║   ██║    ')}${chalk.yellow(
            '██╔══╝  ██║╚██╗██║╚██╗ ██╔╝██║██╔══██╗██║   ██║██║╚██╗██║██║╚██╔╝██║██╔══╝  ██║╚██╗██║   ██║       ██║     ██║     ██║'
        )}
${chalk.red('╚█████╔╝██║  ██║██████╔╝╚██████╔╝   ██║   ██║    ')}${chalk.yellow(
            '███████╗██║ ╚████║ ╚████╔╝ ██║██║  ██║╚██████╔╝██║ ╚████║██║ ╚═╝ ██║███████╗██║ ╚████║   ██║       ╚██████╗███████╗██║'
        )}
${chalk.red(' ╚════╝ ╚═╝  ╚═╝╚═════╝  ╚═════╝    ╚═╝   ╚═╝    ')}${chalk.yellow(
            '╚══════╝╚═╝  ╚═══╝  ╚═══╝  ╚═╝╚═╝  ╚═╝ ╚═════╝ ╚═╝  ╚═══╝╚═╝     ╚═╝╚══════╝╚═╝  ╚═══╝   ╚═╝        ╚═════╝╚══════╝╚═╝'
        )}
       `);

        console.log(`Welcome to ${appName} ${chalk.yellow(`v${appVersion}`)}`);
        console.log(`${chalk.green(appDescription)}\n`);
        console.log(
            chalk.white(
                `Documentation for creating an application is at ${chalk.yellow(
                    'https://github.com/RodrigoAPimentel/jabuti-environment-cli'
                )}`
            )
        );
        console.log(
            '______________________________________________________________________________________________________________________________________________________________________\n'
        );
    },
};
