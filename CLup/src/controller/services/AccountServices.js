const { query } = require('express')
const DatabaseConnection = require('../database/DatabaseConnection')
const User = require('./../../model/UserModel')

module.exports = class AccountServices {
    constructor() {
        this.dbConn = DatabaseConnection.getConnection()
        accountManagement = new AccountManagement(this.dbConn)
    }
}

class AccountManagement {
    constructor(dbConn) {
        this.dbConn = dbConn
    }
    async registerClupper(clupper) {
        const { name, surname, email, password } = clupper.toJSON()
        const user = await this.getUser(email, password)
        if (user) return false
        else {
            const stmt = `INSERT INTO user (email ,name, surname, password, store) VALUES(?,?,?,?,?)`
            const values = [email, name, surname, password, store || null]
            return new Promise( (resolve, _) => {
                this.dbConn.query(stmt, values, (err, _, _) => {
                    err ? resolve(false) : resolve(true)
                })
            })
        }
    }
    async registerStoreManager(storeManager) {
        const { name, surname, email, password, store } = storeManager.toJSON()
    }
    getUser(email, password) {
        const query = 'SELECT * FROM user WHERE email = ' + email + 'AND password = ' + password
        return new Promise( (resolve, reject) => {
            this.dbConn.query(query, (err, results, fields) => {
                if (err) reject(err)
                if (results) resolve(new User(name, surname, email, password))
                else resolve(null)
            })
        })
    }
}