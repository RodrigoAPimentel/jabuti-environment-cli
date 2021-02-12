const shell = require("shelljs");

const JEC_PATH = shell.exec('echo %JEC_HOME%').stdout.trim();

module.exports = { JEC_PATH };