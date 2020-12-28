const { query } = require('express')
const DatabaseConnection = require('../database/DatabaseConnection')
const User = require('./../../model/UserModel')

module.exports = class AccountServices {
    constructor() {
        this.dbConn = DatabaseConnection.getConnection()
        this.accountManagement = new AccountManagement(this.dbConn)
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
            const values = [email, name, surname, password, null]
            return new Promise( (resolve, _reject) => {
                this.dbConn.query(stmt, values, (err, _results, _fields) => {
                    err ? resolve(false) : resolve(true)
                })
            })
        }
    }
    async registerStoreManager(storeManager, storeObject) {
        const { name, surname, email, password, store } = storeManager.toJSON()
        const { storeName, vat, position, capacity} = storeObject.toJSON()
        const { lat, lng } = position
        const user = await this.getUser(email, password)
        if (user) return false
        else {
            //TODO insert storeObject into DB
            const stmt = `INSERT INTO user (email ,name, surname, password, store) VALUES(?,?,?,?,?)`
            const values = [email, name, surname, password, store]
            return new Promise( (resolve, _reject) => {
                this.dbConn.query(stmt, values, (err, _results, _fields) => {
                    err ? resolve(false) : resolve(true)
                })
            })
        }
    }
    async getUser(email, password) {
        const stmt = `SELECT * FROM user WHERE email = ? AND password = ?`
        const values = [email, password]
        return new Promise( (resolve, reject) => {
            this.dbConn.query(stmt, values, (err, results, _fields) => {
                if (err) reject(err)
                else if (results.length != 0) {
                    const row = results[0]
                    const name = row.name
                    const surname = row.surname
                    const store = row.store
                    resolve(new User(name, surname, email, password, store))
                }
                else resolve(null)
            })
        })
    }
    async getPositionFromAddress(address) {
        //TODO query Google Maps API to find lat and lng of the address
        return {lat: 0, lng: 0}
    }
}