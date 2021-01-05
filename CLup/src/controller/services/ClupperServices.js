const DatabaseConnection = require('../database/DatabaseConnection')
const Ticket = require('../../model/TicketModel')
const SharedServices = require('./SharedServices')
const sharedServices = new SharedServices()
const haversine = require('haversine-distance')

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
    async joinQueue(email, vat) {
        const userTicket = await this.getQueueTicket(email)
        if(!userTicket.error) return {error: "You can be in one queue at a time.", sqlError: false}
        if(userTicket.sqlError) return userTicket

        return sharedServices.ticketManager.createTicket(email, vat)
    }
    async leaveQueue(email, vat) {
        const stmt = `DELETE FROM ticket WHERE user = ? AND store = ? AND inside = false`
        const values = [email, vat]
        return new Promise( (resolve, _reject) => {
            this.dbConn.query(stmt, values, (err, _results, _fields) => {
                err ? resolve({error: err.sqlMessage, sqlError: true}) : resolve(true)
            })
        })
    }
    async getQueueTicket(email) {
        const stmt = `SELECT * FROM ticket WHERE user = ?`
        const values = [email]
        return new Promise( (resolve, _reject) => {
            this.dbConn.query(stmt, values, (err, results, _fields) => {
                if(err) return resolve({error: err.sqlMessage, sqlError: true})
                if(results.length == 0) return resolve({error: 'No ticket found.', sqlError: false})
                const { id, date, user, store, inside } = results[0]
                const ticket = new Ticket(id, date, user, store, inside)
                resolve(ticket)
            })
        })
    }
    async getQueueBefore(vat, date) {
        const stmt = `SELECT id FROM ticket WHERE store = ? AND inside = false AND date < ?`
        const values = [vat, date]
        return new Promise( (resolve, _reject) => {
            this.dbConn.query(stmt, values, (err, results, _fields) => {
                err ? resolve({error: err.sqlMessage, sqlError: true}) : resolve(results.length)
            })
        })
    }
}

class StoreLocator {
    constructor(dbConn) {
        this.dbConn = dbConn
    }
    // Default position is set to the Duomo of Milan
    async findNearStores(userPos = {lat: 45.464211, lng: 9.191383}) {
        const stmt = `SELECT * FROM store`
        return new Promise( (resolve, _reject) => {
            this.dbConn.query(stmt, (err, results, _fields) => {
                if (err) return resolve({error: err.sqlMessage, sqlError: true})
                for (let res of results) {
                    res.distance = haversine(userPos, {lat: res.lat, lng: res.lng})
                }
                resolve(results.sort( (a, b) => {
                    if (a.distance <= b.distance) return -1
                    else return 1
                }))
            })
        })

    }
    async getStoreInfo(vat, userPos, additional = true) {
        const store = await sharedServices.storeDetails.getStore(vat, userPos)
    
        if(!store.error && additional) {    
            const address = await sharedServices.positionStack.getAddressFromPosition(store.lat, store.lng)
            if(address.error) return address
            store.address = address

            const inline = await sharedServices.storeDetails.getStoreInLine(store.vat)
            if(inline.error) return inline
            store.inline = inline
        }

        return store
    }
}