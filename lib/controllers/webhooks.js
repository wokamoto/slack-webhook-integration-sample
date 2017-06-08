/**
 * Controller: Webhooks
 * - Webhooks exist outside of Slack Apps.  But here is some boilerplate for them anyway.
 * - event.body includes: token, team_id, team_domain, channel_id, channel_name, timestamp, user_id, user_name, text, trigger_word
 * - Receives an outgoing webhook from Slack (A trigger word was used).
 * - Only works from public channels.  Otherwise, use SlashCommands.
 */
'use strict';

module.exports.receive = (event, context, callback) => {
    const qs = require('qs');
    let response = {
        statusCode: 200,
        body: '',
    };

    // Webhooks exist outside of Slack Apps.  There is not much we can offer you here except an endpoint and a function awaiting to be written
    let params = qs.parse(event.body);
    let triggerWord = params.trigger_word ? params.trigger_word : '',
        words = params.text ? params.text.split(triggerWord) : [triggerWord,''];
    params.words = words[1].trim().split(' ');

    if (params.token !== process.env.SLACK_OUTGOING_TOKEN) {
        response.statusCode = 401;
        return callback(null, response);

    } else {
        try {
            let triggerFunc = require('../trigger/'+triggerWord);
            return triggerFunc.handler(triggerWord,params,callback);
        } catch(err) {
            response.statusCode = 404;
            response.body = JSON.stringify({
                text:       'Webhook received. But trigger is not found.\n'+'Trigger: '+triggerWord
            });
            return callback(null, response);
        }
    }
};
