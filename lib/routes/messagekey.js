'use strict';

module.exports = {
    method: 'POST',
    path: '/messagekey',
    options: {
        // Our handler doesn't need to do anything asynchronous or use the
        // response toolkit, so the route handler's signature appears a little simpler than before
        handler: async (request) => {

            // We define some riddles, just hardcoded for now
            const { payload } = request
            console.log(payload)
            console.log(`Got a key! It's: ${payload.foo}`)

            return `Got the key`;
        }
    }
};