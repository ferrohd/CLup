const DatabaseConnection = require('../database/DatabaseConnection')
const User = require('./../../model/UserModel')

module.exports = class AccountServices {
    constructor() {
        this.dbConn = DatabaseConnection.getConnection()
        accountManagement = new AccountManagement(dbConn)
    }
}

class AccountManagement {
    constructor(dbConn) {
        this.dbConn = dbConn
    }
    registerClupper(clupper) {
       const { name, surname, email, password } = clupper.toJSON()
    }
    registerStoreManager(storeManager) {
        const { name, surname, email, password, store } = storeManager.toJSON()
    }
    getUser(email, password) {
        const tupla = '...'
        if (tupla) return new User(name, surname, email, password, store)
        else return null
    }
}