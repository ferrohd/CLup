const DatabaseConnection = require('../database/DatabaseConnection')
const User = require('../../model/UserModel')

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
        const unique = await this.checkUniqueEmail(email)
        if (!unique) return {error: 'This email is already in use.', sqlError: false}

        const stmt = `INSERT INTO user (email ,name, surname, password, store) VALUES(?,?,?,?,?)`
        const values = [email, name, surname, password, null]
        return new Promise( (resolve, _reject) => {
            this.dbConn.query(stmt, values, (err, _results, _fields) => {
                err ? resolve({error: err.sqlMessage, sqlError: true}) : resolve(true)
            })
        })
    }
    async registerStoreManager(storeManager, storeObject) {
        const { name, surname, email, password, store } = storeManager.toJSON()
        const { vat, position, capacity} = storeObject.toJSON()
        const storeName = storeObject.toJSON().name
        const { lat, lng } = position

        const uniqueEmail = await this.checkUniqueEmail(email)
        if (!uniqueEmail) return {error: 'This email is already in use.', sqlError: false}
        const uniqueVAT = await this.checkUniqueVAT(vat)
        if (!uniqueVAT) return {error: 'This VAT number is already in use.', sqlError: false}
                    
        const Sstmt = `INSERT INTO store (vat, name, lat, lng, capacity) VALUES(?,?,?,?,?)`
        const Svalues = [vat, storeName, lat, lng, capacity]
        const SMstmt = `INSERT INTO user (email ,name, surname, password, store) VALUES(?,?,?,?,?)`
        const SMvalues = [email, name, surname, password, store]

        return new Promise ( (resolve, reject) => {
            this.dbConn.getConnection( (err, conn) => {
                if (err) resolve({error: err.sqlMessage, sqlError: true})
                conn.beginTransaction( err => {
                    if (err) resolve({error: err.sqlMessage, sqlError: true})
                    conn.query(Sstmt, Svalues, (err, _results, _fields) => {
                        if (err) {
                            conn.rollback()
                            resolve({error: err.sqlMessage, sqlError: true})
                        }
                    })
                    // Try to register the store manager
                    conn.query(SMstmt, SMvalues, (err, _results, _fields) => {
                        if (err) {
                            conn.rollback()
                            return resolve({error: err.sqlMessage, sqlError: true})
                        }
                        conn.commit( err => { 
                            if (err) {
                                conn.rollback()
                                return resolve({error: err.sqlMessage, sqlError: true})
                            }
                            resolve(true)
                        })
                    })
                })
                conn.release()
            })
        })
        
    }
    async getUser(email, password) {
        const stmt = `SELECT * FROM user WHERE email = ? AND password = ?`
        const values = [email, password]
        return new Promise( (resolve, _reject) => {
            this.dbConn.query(stmt, values, (err, results, _fields) => {
                if (err) return resolve({error: err.sqlMessage, sqlError: true})
                if (results.length == 0) return resolve({error: 'Wrong combination of email and password.', sqlError: false})
                const { email, name, surname, password, store } = results[0]
                resolve(new User(name, surname, email, password, store))
            })
        })
    }
    async checkUniqueEmail(email) {
        const stmt = `SELECT email FROM user WHERE email = ?`
        const values = [email]
        return new Promise( (resolve, _reject) => {
            this.dbConn.query(stmt, values, (err, results, _fields) => {
                err ? resolve({error: err.sqlMessage, sqlError: true}) : resolve(results.length == 0)
            })
        })
    }
    async checkUniqueVAT(vat) {
        const stmt = `SELECT vat FROM store WHERE vat = ?`
        const values = [vat]
        return new Promise( (resolve, _reject) => {
            this.dbConn.query(stmt, values, (err, results, _fields) => {
                err ? resolve({error: err.sqlMessage, sqlError: true}) : resolve(results.length == 0)
            })
        })
    }
}