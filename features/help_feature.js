
const { BotkitConversation } = require("botkit");

module.exports = function(controller) {

    let DIALOG_HELP = 'DIALOG_HELP';
    let DIALOG_HELP_CONVERSATION = new BotkitConversation(DIALOG_HELP, controller);

    DIALOG_HELP_CONVERSATION.say('Some commands you can use...');
    DIALOG_HELP_CONVERSATION.say('- schedule-bus');

    controller.addDialog(DIALOG_HELP_CONVERSATION);

    controller.hears('help', 'message', async (bot, message) => {
        await bot.beginDialog(DIALOG_HELP);
    });

};