// lib/routes/riddle-by-id.js
'use strict';

const Boom = require('@hapi/boom');
const Joi = require('@hapi/joi');

module.exports = {
    method: 'GET',
    path: '/messagekeys',
    options: {
        tags: ['api'],
        handler: async (request) => {

            const { MessageKeys } = request.models();
            const keys = await MessageKeys.query()
            console.log(keys)

            if (Array.isArray(keys) && keys.length === 0) {
              const error = Boom.forbidden("Sorry we don't have any messages at this point, the list is simply empty.");
              error.output.statusCode = 202;    // Assign a custom error code
              error.output.payload["csrf-decorator"] = request.headers["csrf-decorator"];
              error.reformat();
              return error
            }
            if (!keys) {
                throw Boom.notFound('Sorry, we were unable to find any keys');
            }
            
            function getUnique(arr, comp) {
              const unique = arr
                   .map(e => e[comp])
                 // store the keys of the unique objects
                .map((e, i, final) => final.indexOf(e) === i && i)
                // eliminate the dead keys & store unique objects
                .filter(e => arr[e]).map(e => arr[e]);
               return unique;
            }

            // if we have any duplicate keys, only return unique ones
            return getUnique(keys, 'messageKey')
        }
    }
};