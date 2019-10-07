'use strict';

const Schwifty = require('schwifty');
const Joi = require('@hapi/joi');

module.exports = class MessageKeys extends Schwifty.Model {

    static get tableName() {

        return 'MessageKeys';
    }

    static get joiSchema() {

        return Joi.object({
            messageKey: Joi.string(),
            locale: Joi.string()
        });
    }
};
