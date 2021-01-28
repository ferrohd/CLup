const DatabaseConnection = require('../database/DatabaseConnection')
const SharedServices = require('./SharedServices')
const sharedServices = new SharedServices()

module.exports = class StoreManagerServices {
    constructor() {
        const dbConn = DatabaseConnection.getConnection()
        this.storeOverview = new StoreOverview(dbConn)
        this.storeManagement = new StoreManagement(dbConn)
        this.ticketManagement = new TicketManagement(dbConn)
        this.guestManagement = new GuestManagement(dbConn)
    }
}

class StoreOverview {
    constructor(dbConn) {
        this.dbConn = dbConn
    }
    async getStoreInfo(vat, getInline = true) {
        const store = await sharedServices.storeDetails.getStore(vat)

        if(!store.error) {
            const address = await sharedServices.positionStack.getAddressFromPosition(store.lat, store.lng)
            if(address.error) return address
            store.address = address
            
            if(getInline) {
                const inline = await sharedServices.storeDetails.getStoreInLine(store.vat)
                if(inline.error) return inline
                store.inline = inline
            }
        }
        
        return store
    }
    async getStoreInside(vat) {
        const stmt = `SELECT id FROM ticket WHERE store = ? AND inside = true`
        const values = [vat]
        return new Promise( (resolve, _reject) => {
            this.dbConn.query(stmt, values, (err, results, _fields) => {
                err ? resolve({error: err.sqlMessage, sqlError: true}) : resolve(results.length)
            })
        })
    }
}

class StoreManagement {
    constructor(dbConn) {
        this.dbConn = dbConn
    }
    async editStoreCapacity(vat, newCapacity) {
        const stmt = `UPDATE store SET capacity = ? WHERE vat = ?`
        const values = [newCapacity, vat]
        return new Promise( (resolve, _reject) => {
            this.dbConn.query(stmt, values, (err, _results, _fields) => {
                err ? resolve({error: err.sqlMessage, sqlError: true}) : resolve(true)
            })
        })
    }
    async getStoreCapacity(vat) {
        const stmt = `SELECT capacity FROM store WHERE vat = ?`
        const values = [vat]
        return new Promise( (resolve, _reject) => {
            this.dbConn.query(stmt, values, (err, results, _fields) => {
                if(err) return resolve({error: err.sqlMessage, sqlError: true})
                if(results.length == 0) return resolve({error: "No store found.", sqlError: false})
                resolve(results[0])
            })
        })
    }
}

class TicketManagement {
    constructor(dbConn) {
        this.dbConn = dbConn
    }
    async getTicketInside(ticketID, vat) {
        const stmt = `SELECT inside FROM ticket WHERE id = ? AND store = ?`
        const values = [ticketID, vat]
        return new Promise( (resolve, _reject) => {            
            this.dbConn.query(stmt, values, (err, results, _fields) => {
                if(err) return resolve({error: err.sqlMessage, sqlError: true})
                if(results.length == 0) return resolve({error: 'No ticket found.', sqlError: false})
                resolve(results[0].inside)
            })
        })
    }
    async scanEntrance(ticketID, vat) {
        //Also imposes that ticketID is the first in the queue
        const stmt = `UPDATE ticket AS t SET inside = true WHERE t.id = ? AND t.store = ? AND 0 = (SELECT count(*) FROM ticket WHERE inside = false AND store = t.store AND date < t.date)`
        const values = [ticketID, vat]
        return new Promise( (resolve, _reject) => {
            this.dbConn.query(stmt, values, (err, results, _fields) => {
                if(err) return resolve({error: err.sqlMessage, sqlError: true})
                if(results.changedRows == 0) return resolve({error: 'This ticket is not the head of the queue, entrance not allowed.', sqlError: false})
                resolve(true)
            })
        })
    }
    async deleteTicket(ticketID, vat) {
        const stmt = `DELETE FROM ticket WHERE id = ? AND store = ?`
        const values = [ticketID, vat]

        return new Promise( (resolve, _reject) => {
            this.dbConn.query(stmt, values, (err, _results, _fields) => {
                err ? resolve({error: err.sqlMessage, sqlError: true}) : resolve(true)
            })
        })
    }
    async getTicketInQeueue(vat) {
        const stmt = `SELECT * FROM ticket WHERE inside = ? AND store = ? ORDER BY date`
        const values = [false, vat]
        return new Promise( (resolve, _reject) => {
            this.dbConn.query(stmt, values, (err, results, _fields) => {
                if(err) return resolve({error: err.sqlMessage, sqlError: true})
                else resolve(results)
            })
        })
    }
}

class GuestManagement {
    constructor(dbConn) {
        this.dbConn = dbConn
    }
    async issueTicket(email, vat) {
        return sharedServices.ticketManager.createTicket(email, vat)
    }
}