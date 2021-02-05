const DatabaseConnection = require('../../src/controller/database/DatabaseConnection')

// For debugging purposes
const logger = (err, results, values) => {
    console.log(err);
    console.log(results);
    console.log(values);
}

class DBHelper {
    static addUser(user) {
        const dbConn = DatabaseConnection.getConnection()
        const stmnt = 'INSERT INTO user (email, name, surname, password, store) VALUES(?,?,?,?,?)'
        const values = [user.email, user.name, user.surname, user.password, user.store]
        dbConn.query(stmnt, values)
    }

    static addStore(store) {
        const dbConn = DatabaseConnection.getConnection()
        const stmnt = 'INSERT INTO store (vat, name, lat, lng, capacity) VALUES(?,?,?,?,?)'
        const values = [store.vat, store.name, store.lat, store.lng, store.capacity]
        dbConn.query(stmnt, values)
    }

    static addTicket(ticket) {
        const dbConn = DatabaseConnection.getConnection()
        const stmnt = 'INSERT INTO ticket (id, inside, user, store) VALUES(?,?,?,?)'
        const values = [ticket.id, ticket.inside, ticket.user, ticket.store]
        dbConn.query(stmnt, values)
    }

    static deleteUser(email) {
        const dbConn = DatabaseConnection.getConnection()
        const stmnt = 'DELETE FROM user WHERE email = ?'
        const values = [email]
        dbConn.query(stmnt, values)
    }

    static deleteStore(vat) {
        const dbConn = DatabaseConnection.getConnection()
        const stmnt = 'DELETE FROM store WHERE vat = ?'
        const values = [vat]
        dbConn.query(stmnt, values)
    }

    static deleteTicket(id) {
        const dbConn = DatabaseConnection.getConnection()
        const stmnt = 'DELETE FROM ticket WHERE id = ?'
        const values = [id]
        dbConn.query(stmnt, values)
    }
}

module.exports = DBHelper;