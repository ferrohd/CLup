const DatabaseConnection = require('../../src/controller/database/DatabaseConnection')

class DBHelper {
    // static async addUser(user) {
    //     const dbConn = DatabaseConnection.getConnection()
    //     const stmnt = 'INSERT INTO user (email, name, surname, password, store) VALUES(?,?,?,?,?)'
    //     const values = [user.email, user.name, user.surname, user.password, user.store]
    //     return new Promise((resolve, _reject) => {
    //         dbConn.query(stmnt, values, (_err, _results, _fields) => {
    //             resolve()
    //         })
    //     })
    // }

    // static async addStore(store) {
    //     const dbConn = DatabaseConnection.getConnection()
    //     const stmnt = 'INSERT INTO store (vat, name, lat, lng, capacity) VALUES(?,?,?,?,?)'
    //     const values = [store.vat, store.name, store.lat, store.lng, store.capacity]
    //     return new Promise((resolve, _reject) => {
    //         dbConn.query(stmnt, values, (_err, _results, _fields) => {
    //             resolve()
    //         })
    //     })
    // }

    static async addTicket(ticket) {
        const dbConn = DatabaseConnection.getConnection()
        const stmnt = `INSERT INTO ticket (id, inside, user, store, date) VALUES(?,?,?,?,?)`
        const values = [ticket.id, ticket.inside, ticket.user, ticket.store, ticket.date]
        return new Promise((resolve, _reject) => {
            dbConn.query(stmnt, values, (_err, _results, _fields) => {
                resolve()
            })
        })
    }

    static async deleteUser(email) {
        const dbConn = DatabaseConnection.getConnection()
        const stmnt = 'DELETE FROM user WHERE email = ?'
        const values = [email]
        return new Promise((resolve, _reject) => {
            dbConn.query(stmnt, values, (_err, _results, _fields) => {
                resolve()
            })
        })
    }

    static async deleteStore(vat) {
        const dbConn = DatabaseConnection.getConnection()
        const stmnt = 'DELETE FROM store WHERE vat = ?'
        const values = [vat]
        return new Promise((resolve, _reject) => {
            dbConn.query(stmnt, values, (_err, _results, _fields) => {
                resolve()
            })
        })
    }

    static async deleteTicket(id) {
        const dbConn = DatabaseConnection.getConnection()
        const stmnt = 'DELETE FROM ticket WHERE id = ?'
        const values = [id]
        return new Promise((resolve, _reject) => {
            dbConn.query(stmnt, values, (_err, _results, _fields) => {
                resolve()
            })
        })
    }

    // static async deleteTickets() {
    //     const dbConn = DatabaseConnection.getConnection()
    //     const stmnt = "DELETE FROM ticket WHERE id LIKE '_%'"
    //     return new Promise((resolve, _reject) => {
    //         dbConn.query(stmnt, (_err, _results, _fields) => {
    //             resolve()
    //         })
    //     })
    // }

    static async setCapacity(vat, capacity) {
        const dbConn = DatabaseConnection.getConnection()
        const stmnt = 'UPDATE store SET capacity = ? WHERE vat = ?'
        const values = [capacity, vat]
        return new Promise((resolve, _reject) => {
            dbConn.query(stmnt, values, (_err, _results, _fields) => {
                resolve()
            })
        })
    }
}

module.exports = DBHelper;