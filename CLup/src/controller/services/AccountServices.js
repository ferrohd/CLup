const { query, json, response } = require('express')
const DatabaseConnection = require('../database/DatabaseConnection')
const User = require('./../../model/UserModel')
const request = require('request')

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
        const { vat, position, capacity} = storeObject.toJSON()
        const storeName = storeObject.toJSON().name
        const { lat, lng } = position
        const user = await this.getUser(email, password)
        if (user) return false
        else {
            return new Promise ( (resolve, reject) => {
                this.dbConn.getConnection( (err, conn) => {
                    if (err) resolve(false)
                    conn.beginTransaction( err => {
                        if (err) resolve(false)
                        
                        const Sstmnt = `INSERT INTO store (vat, name, lat, lng, capacity) VALUES(?,?,?,?,?)`
                        const Svalues = [vat, storeName, lat, lng, capacity]
                        conn.query(Sstmnt, Svalues, (err, _results, _fields) => {
                            if (err) {
                                console.log(err)
                                conn.rollback()
                                resolve(false)
                            }
                        })
                        // Try to register the store manager
                        const SMstmt = `INSERT INTO user (email ,name, surname, password, store) VALUES(?,?,?,?,?)`
                        const SMvalues = [email, name, surname, password, store]
                        conn.query(SMstmt, SMvalues, (err, _results, _fields) => {
                            if (err) {
                                console.log('ERRORE CREAZIONE ACCOUNT')
                                console.log(err)
                                conn.rollback()
                                resolve(false)
                            }
                            else {
                                conn.commit( err => { 
                                    if (err) {
                                        console.log('ERRORE COMMIT')
                                        conn.rollback()
                                        resolve(false)
                                    } else {
                                        resolve(true)
                                    }
                                })
                            }
                        })
                    })
                    conn.release()
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
        return new Promise( (resolve, reject) => {
            const url = 'http://api.positionstack.com/v1/forward?access_key=d2ae97b4da3aa8f88d5f1c58c38d97bd&country=IT&region=Lombardia&query=' + address
            console.log('richiesta')
            request(url, (err, res, body) => {
                if (err) resolve({lat: 0, lng: 0})
                else if (res.statusCode == 200) {
                    const result = JSON.parse(body).data[0]
                    console.log(result)
                    if (result) resolve({ lat: result.latitude, lng: result.longitude })
                    else resolve({lat: 0, lng: 0})
                }
                else resolve({lat: 0, lng: 0})
            })
        })
    }
}