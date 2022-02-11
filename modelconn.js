const pgp = require('pg-promise')();

var conndb = require('./conndb');

var knex = conndb.knex;
var bookshelf = require('bookshelf')(knex);


const Registration = bookshelf.Model.extend({
    tableName: 'registration',
    idAttribute: 'registration_id'
});

module.exports.Registration = Registration;