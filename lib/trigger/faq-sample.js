'use strict';

const AWS = require('aws-sdk');
const botName = 'slack-webhook-integration-'+process.env.STAGE+'-receiveWebhook';
const lambda = new AWS.Lambda();

const availableCommands = ['usage', 'show', 'help'];
const availableHelp = {
    'show': ['services', '<servicename>'],
    'help': ['<servicename>']
};
const availableOptions = ['pricing', 'regions', 'faq [default]'];

const services = AWS.Service._serviceMap;
const serviceMap = [];
for (var service in AWS.Service._serviceMap) { serviceMap.push(service); }

module.exports.handler = (triggerWord,slackParams,callback) => {
    let params = {
        FunctionName: botName
    };
    let runTimePromise = lambda.getFunction(params).promise();
    runTimePromise.then((data) => {
        let returnMessage = '';
        let response = {
            statusCode: 200,
            body: '',
        };
        let runTime = data['Configuration']['Runtime'];
        returnMessage += '[' + runTime + '] ';
        if (slackParams.words.length == 1) {
            if (slackParams.words[0] === 'help') {
                returnMessage += '`Available commands: ' + availableCommands.join(',') + '`';
            }
            if (slackParams.words[0] === 'usage') {
                returnMessage += '`Usage: ' + triggerWord + ' <command> <service_name> <option>`';
            }
        }

        if (slackParams.words.length >= 2) {
            if (slackParams.words[0] === 'help' && availableHelp.hasOwnProperty(slackParams.words[1])) {
                returnMessage += '`Usage: ' + slackParams.words[1] + ' ' + availableHelp[slackParams.words[1]] + '`';
            }
            if (slackParams.words[0] === 'help' && services.hasOwnProperty(slackParams.words[1])) {
                returnMessage += '`Usage: show ' + slackParams.words[1] + ' <' + availableOptions.join(',') + '>`';
            }
            if (slackParams.words[0] === 'help' && availableHelp.hasOwnProperty(slackParams.words[1]) == false && services.hasOwnProperty(slackParams.words[1]) == false) {
                returnMessage += 'Invalid Service/Command -- `Available commands: ' + availableCommands.join(',') + '`';
            }
            if (slackParams.words[0] === 'show' && slackParams.words[1] === 'services') {
                returnMessage += 'Available services: `' + JSON.stringify(serviceMap) + '`';
            }
            if (slackParams.words[0] === 'show' && slackParams.words[1] === 'commands') {

            }
        }

        response.body = JSON.stringify({
            text:       returnMessage
        });

        return callback(null, response);
    });
};
