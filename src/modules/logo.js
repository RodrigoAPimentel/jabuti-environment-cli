const chalk = require("chalk");
const figlet = require("figlet");
const { JEC_PATH } = require("./../relativePath");

const infoCLI = require(`${JEC_PATH}/package.json`);

module.exports = {
  logo() {
    console.log(
      chalk.yellow(
        figlet.textSync(infoCLI.description_name, {
          horizontalLayout: "full",
        })
      )
    );
  },
};
