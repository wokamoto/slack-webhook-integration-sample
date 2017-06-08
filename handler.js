'use strict';

/**
 * Functions
 */

// Require Logic
var service = require('./lib');

// Receive Webhook
module.exports.receiveWebhook = service.webhooks.receive;
