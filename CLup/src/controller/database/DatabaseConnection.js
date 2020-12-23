const mysql = require('mysql')

module.exports = class DatabaseConnection {
    static conn = mysql.createPool({
        host     : 'lorenzofratus.it',
        user     : 'clxnnpfi_ferro',
        password : 'ferro98ferro'
    })
    static connection = this.conn.connect()
    static getConnection() { return this.connection }
}