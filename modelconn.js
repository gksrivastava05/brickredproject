const pgp = require('pg-promise')();

var conndb = require('./conndb');

var knex = conndb.knex;
var bookshelf = require('bookshelf')(knex);


const Registration = bookshelf.Model.extend({
    tableName: 'user_tb',
    idAttribute: 'user_id'
});


module.exports.Registration = Registration;

// const RoleMasterTable = bookshelf.Model.extend({
//     tableName: "role_master_tb",
//     idAttribute: 'role_master_id'
// });

// module.exports.RoleMasterTable = RoleMasterTable;

// const UserRoel = bookshelf.Model.user_role({
//     tableName: 'user_role',
//     idAttribute: 'user_id'
// });

// module.exports.UserRoel = UserRoel;