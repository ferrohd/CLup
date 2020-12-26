const DatabaseConnection = require('../database/DatabaseConnection')

module.exports = class StoreManagerServices {
    constructor() {
        const dbConn = DatabaseConnection.getConnection()
        this.storeOverview = new StoreOverview(dbConn)
        this.storeManagement = new StoreManagement(dbConn)
        this.scanTicket = new ScanTicket(dbConn)
    }
}

class StoreOverview {
    constructor(dbConn) {
        this.dbConn = dbConn
    }
    getInsideStatus(store) {
        return new Promise( (resolve, _reject) => {
            const stmnt = 'SELECT * FROM ticket WHERE store = ? AND inside = true'
            const values = [store]
            this.dbConn.query(stmnt, values, (err, results, _fields) => {
                if (err) resolve(null)
                else resolve(results.length)
            })
        })
    }
    getQueueStatus(store) {
        return new Promise( (resolve, _reject) => {
            const stmnt = 'SELECT * FROM ticket WHERE store = ? AND inside = false'
            const values = [store]
            this.dbConn.query(stmnt, values, (err, results, _fields) => {
                if (err) resolve(null)
                else resolve(results.length)
            })
        })
    }
}

class StoreManagement {
    constructor(dbConn) {
        this.dbConn = dbConn
    }
    editStoreCapacity(store, new_capacity) {
        return new Promise( (resolve, reject) => {
            const stmnt = 'UPDATE store SET capacity = ? WHERE vat = ?'
            const values = [new_capacity, store]
            this.dbConn.query(stmnt, values, (err, _results, _fields) => {
                err ? resolve(false) : resolve(true)
            })
        })
    }
    getStoreCapacity(store) {
        return new Promise( (resolve, reject) => {
            const stmnt = 'SELECT capacity FROM store WHERE vat = ?'
            const values = [store]
            this.dbConn.query(stmnt, values, (err, results, _fields) => {
                if (err) resolve(null)
                else resolve(results[0])
            })
        })
    }
}

class ScanTicket {
    constructor(dbConn) {
        this.dbConn = dbConn
    }
    scanEntrance(ticket) {
        return new Promise( (resolve, reject) => {
            const stmnt = 'UPDATE ticket SET inside = true WHERE ticket = ?'
            const values = [ticket]
            this.dbConn.query(stmnt, values, (err, _results, _fields) => {
                err ? resolve(false) : resolve(true)
            })
        })
    }
    scanExit(ticket) {
        return new Promise( (resolve, reject) => {
            const stmnt = 'DELETE FROM ticket WHERE ticket = ?'
            const values = [ticket]
            this.dbConn.query(stmnt, values, (err, _results, _fields) => {
                err ? resolve(false) : resolve(true)
            })
        })
    }
}