const shell = require('shelljs');

const { vagrantCLI } = require(`${pathJec}/src/providers/vbox/vagrantCommand`);

const { ansibleAWXConfigInformations } = require(`${pathJec}/src/utils/configInformations`);

const { ask, askAWX, askMinishift } = require(`${pathJec}/src/questions/virtualMachineTool`);

const providers_questions = require(`${pathJec}/src/questions/provider`);

const { provider: providers } = require(`${pathJec}/src/providers/provider`);

module.exports = {
    async createStandardDevelopmentEnvironment(configurations) {
        if (configurations.modeUse === 'cli') {
            providers(configurations);
        } else {
            const { provider } = await providers_questions.ask();

            console.log(`@@ CONFIGURATIONS:${JSON.stringify(configurations)}`);
            console.log(`@@ PROVIDER:${provider}`);

            console.log('============ Create Standard Development Environment ============');

            providers({ provider });
        }
    },
};
