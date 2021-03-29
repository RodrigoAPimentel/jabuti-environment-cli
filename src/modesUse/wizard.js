#!/usr/bin/env node
const clear = require('clear');

const modes_questions = require(`${pathJec}/src/questions/modes`);
const { homeScreen } = require(`${pathJec}/src/homeScreen`);

const { core } = require(`${pathJec}/src/modesUse/modeUseCore`);

class Wizard {
    constructor() {
        this.init();
    }

    async init() {
        clear();
        const status = await homeScreen();
        status && this.modes();
    }

    async modes() {
        const responses = await modes_questions.ask();

        core(responses);
    }
}

module.exports = new Wizard();
