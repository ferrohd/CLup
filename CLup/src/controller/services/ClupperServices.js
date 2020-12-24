const DatabaseConnection = require('../database/DatabaseConnection')
const Ticket = require('./../../model/TicketModel')

module.exports = class ClupperServices {
    constructor() {
        this.dbConn = DatabaseConnection.getConnection()
        this.queueManagement = new QueueManagement(this.dbConn)
        this.storeLocator = new StoreLocator(this.dbConn)
    }
}

class QueueManagement {
    constructor(dbConn) {
        this.dbConn = dbConn
    }
    async joinQueue(email, store) {
        const alreadyInQueue = await this.getQueueStatus(email, store)
        return new Promise( (resolve, _reject) => {
            if (alreadyInQueue) resolve(null)
            else {
                const stmnt = 'INSERT INTO'
            }
        })
    }
    leaveQueue(email, store) {}
    async getQueueStatus(email, store) {
        const stmt = `SELECT ticket.id, user.email FROM user JOIN ticket JOIN store WHERE user.store = null AND store.vat = ? AND  ORDER BY ticket.timestamp`
        const values = [store]
        return new Promise( (resolve, _reject) => {
            this.dbConn.query(stmt, values, (err, results, _fields) => {
                if (err || results.length == 0) resolve(null)
                const peopleInQueue = results.length
                let position = 0
                let exists = false
                for (res in results) {
                    if (res.email = email ) {
                        exists = true
                        break
                    }
                    position++
                }
                if (exists) resolve({
                    ticketID: res.id,
                    position: position,
                    peopleInQueue: peopleInQueue
                })
                else resolve(null)
            })
        })
    }
}

class StoreLocator {
    constructor(dbConn) {
        this.dbConn = dbConn
    }
    findPositionByAddress(address) {}
    findStoreByPosition(gps_position) {}
    findNearStores(gps_position, radius) {}
}