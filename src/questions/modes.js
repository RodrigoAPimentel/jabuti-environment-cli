const inquirer = require("inquirer");

const modes = [
  "Create Virtual Machine",
  "Create Virtual Machine with TOOL",
  // "Create Standard Development Environment",
  // "Create Development Environment from Profile",
];

module.exports = {
  ask: () => {
    const questions = [
      {
        type: "list",
        name: "mode",
        message: "Select the Mode of Operation:",
        choices: modes,
        validate: function (value) {
          if (value.length) {
            return true;
          } else {
            return "Choose a Mode";
          }
        },
      },
    ];
    return inquirer.prompt(questions);
  },
};
