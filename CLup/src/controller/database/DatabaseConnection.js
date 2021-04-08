const mysql = require('mysql')

module.exports = class DatabaseConnection {
    static connection = mysql.createPool({
        host     : 'HOST',
        user     : 'USERNAME',
        password : 'PASSWORD',
        database : 'DATABASE'
    })
    static getConnection() { return this.connection }
}