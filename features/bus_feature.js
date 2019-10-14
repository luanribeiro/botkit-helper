
const { BotkitConversation } = require("botkit");
const BusService = require("../services/bus_service");

module.exports = function(controller) {

    let DIALOG_SCHEDULE_BUS = 'DIALOG_SCHEDULE_BUS';
    let DIALOG_SCHEDULE_BUS_CONVERSATION = new BotkitConversation(DIALOG_SCHEDULE_BUS, controller);

    DIALOG_SCHEDULE_BUS_CONVERSATION.ask('What is your code stop?', async(response, convo, bot) => {
        let promise = new BusService().schedules(response);
        await promise.then(function(result) {
            let schedules = [ ];
            
            for (let key in result.schedules) {
                const schedule = result.schedules[key];
                
                let scheduleString = '';
                scheduleString += 'line: ' + schedule.line;
                scheduleString += ', arrival: ' + schedule.arrival;
                scheduleString += ', waitTime: ' + schedule.waitTime;
                scheduleString += "<br>";

                schedules.push(scheduleString);
            }
            
            convo.setVar('schedules', schedules);
        }, function(err) {
            console.log(err);
            bot.say('Sorry.');
        });
        
    }, 'reply_schedules');
    
    DIALOG_SCHEDULE_BUS_CONVERSATION.addMessage('{{vars.schedules}}');

    controller.addDialog(DIALOG_SCHEDULE_BUS_CONVERSATION);

    controller.hears('schedule-bus', 'message', async (bot, message) => {
        await bot.beginDialog(DIALOG_SCHEDULE_BUS);
    });

};