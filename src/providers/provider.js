const { vbox } = require(`${pathJec}/src/providers/vbox/vbox`);
const { wsl2 } = require(`${pathJec}/src/providers/wsl2/wsl2`);

module.exports = {
    provider(configurations) {
        switch (configurations.provider) {
            case 'vbox':
                vbox(configurations);
                break;
            case 'wsl2':
                wsl2(configurations);
                break;

            default:
                break;
        }
    },
};
