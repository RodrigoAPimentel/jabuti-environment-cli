const chalk = require('chalk');
const clear = require('clear');

const pkg = require(`${pathJec}/package.json`);
const { checkRequirements, checkRequirementsMessages } = require(`${pathJec}/src/utils/checkRequirements`);
const { logo } = require(`${pathJec}/src/utils/logo`);

module.exports = {
    async homeScreen() {
        console.log(chalk.bold.green(`Starting ${pkg.description_name}, please wait ....`));

        const initialRequirements = await checkRequirements();

        clear();

        checkRequirementsMessages(initialRequirements);

        logo();

        console.log(`Welcome to ${pkg.description_name} ${chalk.yellow(`v${pkg.version}`)}`);
        console.log(`${chalk.green(pkg.description)}\n`);

        console.log(
            chalk.white(
                `Documentation for creating an application is at ${chalk.yellow(
                    'https://github.com/RodrigoAPimentel/jabuti-environment-cli'
                )}`
            )
        );

        initialRequirements[3][0] &&
            console.log(
                `${
                    chalk.bold.yellow(
                        '_____________________________________________________________________________________________________________________________________________________________________\n\n'
                    ) +
                    chalk.bold.yellow(`   ${pkg.description_name} update available: `) +
                    chalk.bold.green.bold(`${initialRequirements[3][1].replace('\n', '')} `) +
                    chalk.bold.gray(`(curent: ${pkg.version})\n\n`) +
                    chalk.bold.yellow(`   Run ${chalk.bold.italic.green(`npm install -g ${pkg.name}`)} to update.\n`) +
                    chalk.bold.yellow(
                        '_____________________________________________________________________________________________________________________________________________________________________\n'
                    )
                }`
            );

        if (!initialRequirements[4]) {
            console.log(
                `${
                    chalk.red(
                        '_____________________________________________________________________________________________________________________________________________________________________\n\n'
                    ) +
                    chalk.bold.red(
                        `   Basic requirement NOT INSTALLED. Please install for the ${pkg.description_name} to work!!\n`
                    ) +
                    chalk.red(
                        '_____________________________________________________________________________________________________________________________________________________________________\n'
                    )
                }`
            );

            return false;
        }

        console.log(
            chalk.green(
                '______________________________________________________________________________________________________________________________________________________________________\n'
            )
        );

        return true;
    },
};
