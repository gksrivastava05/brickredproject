var pgp = require('pg-promise')();
var config = {
    host: 'localhost',
    port: '5432',
    user: 'myuser',
    password: 'password',
    database: 'mydb'

}

var DB = pgp(config);
module.exports.DB = DB;




/******* Using Knex Module... */
var knex = require('knex')({
    client: 'pg',
    connection: {
        host: 'localhost',
        port: '5432',
        user: 'myuser',
        password: 'password',
        database: 'mydb'
    }
});


module.exports.knex = knex;