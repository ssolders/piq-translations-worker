'use strict';
const Joi = require('@hapi/joi');

module.exports = {
    method: 'POST',
    path: '/messagekeys',
    options: {
        validate: {
            // Check that the POST'd data complies with our model's schema
            payload: {
                messageKey: Joi.string().required(),
                locale: Joi.string().required()
            }
        },
        // Our handler doesn't need to do anything asynchronous or use the
        // response toolkit, so the route handler's signature appears a little simpler than before
        handler: async (request) => {
            
            // We nab our Riddles model, from which we execute queries on our Riddles table
            const { MessageKeys } = request.models();
            // We define some riddles, just hardcoded for now
            const { payload } = request
            console.log(`Got a key! It's: ${payload.messageKey}`)

            // If that throws for any reason, hapi will reply with a 500 error for us, which we could customize better in the future.
            return await MessageKeys.query().insertAndFetch(payload);
        }
    }
};