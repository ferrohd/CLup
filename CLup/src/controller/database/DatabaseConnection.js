const mysql = require('mysql')

module.exports = class DatabaseConnection {
    static connection = mysql.createPool({
        host     : 'lorenzofratus.it',
        user     : 'clxnnpfi_ferro',
        password : 'ferro98ferro',
        database: 'clxnnpfi_clup'
    })
    static getConnection() { return this.connection }
}