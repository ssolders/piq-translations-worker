'use strict';

exports.up = (knex, Promise) => {

    return knex.schema.createTable('MessageKeys', (table) => {
        table.increments('id').primary();
        table.string('messageKey').notNullable();
        table.string('locale').notNullable();
    });
};

exports.down = (knex, Promise) => {
    return knex.schema.dropTable('MessageKeys');
};