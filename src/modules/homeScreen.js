const chalk = require('chalk');
const clear = require('clear');

const { JEC_PATH } = require('../relativePath');

const infoCLI = require(`${JEC_PATH}/package.json`);
const { checkRequirements } = require('../checkRequirements');

function logo() {
    console.log(`
${chalk.green('     ██╗ █████╗ ██████╗ ██╗   ██╗████████╗██╗    ')}${chalk.yellow(
        '███████╗███╗   ██╗██╗   ██╗██╗██████╗  ██████╗ ███╗   ██╗███╗   ███╗███████╗███╗   ██╗████████╗     ██████╗██╗     ██╗'
    )}
${chalk.green('     ██║██╔══██╗██╔══██╗██║   ██║╚══██╔══╝██║    ')}${chalk.yellow(
        '██╔════╝████╗  ██║██║   ██║██║██╔══██╗██╔═══██╗████╗  ██║████╗ ████║██╔════╝████╗  ██║╚══██╔══╝    ██╔════╝██║     ██║'
    )}
${chalk.green('     ██║███████║██████╔╝██║   ██║   ██║   ██║    ')}${chalk.yellow(
        '█████╗  ██╔██╗ ██║██║   ██║██║██████╔╝██║   ██║██╔██╗ ██║██╔████╔██║█████╗  ██╔██╗ ██║   ██║       ██║     ██║     ██║'
    )}
${chalk.green('██   ██║██╔══██║██╔══██╗██║   ██║   ██║   ██║    ')}${chalk.yellow(
        '██╔══╝  ██║╚██╗██║╚██╗ ██╔╝██║██╔══██╗██║   ██║██║╚██╗██║██║╚██╔╝██║██╔══╝  ██║╚██╗██║   ██║       ██║     ██║     ██║'
    )}
${chalk.green('╚█████╔╝██║  ██║██████╔╝╚██████╔╝   ██║   ██║    ')}${chalk.yellow(
        '███████╗██║ ╚████║ ╚████╔╝ ██║██║  ██║╚██████╔╝██║ ╚████║██║ ╚═╝ ██║███████╗██║ ╚████║   ██║       ╚██████╗███████╗██║'
    )}
${chalk.green(' ╚════╝ ╚═╝  ╚═╝╚═════╝  ╚═════╝    ╚═╝   ╚═╝    ')}${chalk.yellow(
        '╚══════╝╚═╝  ╚═══╝  ╚═══╝  ╚═╝╚═╝  ╚═╝ ╚═════╝ ╚═╝  ╚═══╝╚═╝     ╚═╝╚══════╝╚═╝  ╚═══╝   ╚═╝        ╚═════╝╚══════╝╚═╝'
    )}
       `);
}

function requirementsMessages(initialRequirements) {
    const [nodeRequirements, vagrantRequirements, virtualBoxRequirements] = initialRequirements;

    console.log(chalk.green(`INFO! Using ${infoCLI.description_name} version installed globally`));
    console.log(
        `${
            nodeRequirements[0]
                ? chalk.green(`INFO! ${nodeRequirements[1]}`)
                : chalk.yellow(`⚠️WARNING⚠️ ${nodeRequirements[1]}`)
        }`
    );
    console.log(
        `${
            vagrantRequirements[0]
                ? chalk.green(`INFO! ${vagrantRequirements[1]}`)
                : chalk.yellow(`⚠️WARNING⚠️ ${vagrantRequirements[1]}`)
        }`
    );
    console.log(
        `${
            virtualBoxRequirements[0]
                ? chalk.green(`INFO! ${virtualBoxRequirements[1]}`)
                : chalk.yellow(`⚠️WARNING⚠️ ${virtualBoxRequirements[1]}`)
        }`
    );
}

module.exports = {
    async homeScreen() {
        console.log(chalk.green(`Starting ${infoCLI.description_name}, please wait ....`));

        const initialRequirements = await checkRequirements(infoCLI);

        // clear();

        requirementsMessages(initialRequirements);

        logo();

        console.log(`Welcome to ${infoCLI.description_name} ${chalk.yellow(`v${infoCLI.version}`)}`);
        console.log(`${chalk.green(infoCLI.description)}\n`);

        console.log(
            chalk.white(
                `Documentation for creating an application is at ${chalk.yellow(
                    'https://github.com/RodrigoAPimentel/jabuti-environment-cli'
                )}`
            )
        );

        if (!initialRequirements[4]) {
            console.log(
                `${
                    chalk.red(
                        '_____________________________________________________________________________________________________________________________________________________________________\n\n'
                    ) +
                    chalk.red(
                        `   Basic requirement not installed. Please install for the ${infoCLI.description_name} to work!!\n`
                    ) +
                    chalk.red(
                        '_____________________________________________________________________________________________________________________________________________________________________\n\n'
                    )
                }`
            );

            return false;
        }
        initialRequirements[3][0] &&
            console.log(
                `${
                    chalk.yellow(
                        '_____________________________________________________________________________________________________________________________________________________________________\n\n'
                    ) +
                    chalk.yellow(`   ⚠️${infoCLI.description_name} update available: `) +
                    chalk.green.bold(`${initialRequirements[3][1].replace('\n', '')} `) +
                    chalk.gray(`(curent: ${infoCLI.version})⚠️\n\n`) +
                    chalk.yellow(`   Run ${chalk.magenta(`npm install -g ${infoCLI.name}`)} to update.\n`) +
                    chalk.yellow(
                        '_____________________________________________________________________________________________________________________________________________________________________\n\n'
                    )
                }`
            );

        console.log(
            chalk.green(
                '______________________________________________________________________________________________________________________________________________________________________\n'
            )
        );

        return true;
    },
};
