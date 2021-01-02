const DatabaseConnection = require('../database/DatabaseConnection')
const Store = require('../../model/StoreModel')
const Ticket = require('../../model/TicketModel')
const crypto = require('crypto')
const haversine = require('haversine-distance')
const request = require('request')

module.exports = class SharedServices {
    constructor() {
        this.dbConn = DatabaseConnection.getConnection()
        this.storeDetails = new StoreDetails(this.dbConn)
        this.ticketManager = new TicketManager(this.dbConn)
        this.positionStack = new PositionStack(this.dbConn)
    }
}

class StoreDetails {
    constructor(dbConn) {
        this.dbConn = dbConn
    }
    async getStore(vat, userPos) {
        const stmt = `SELECT * FROM store WHERE vat = ?`
        const values = [vat]
        return new Promise( (resolve, _reject) => {
            this.dbConn.query(stmt, values, (err, results, _fields) => {
                if(err) return resolve({error: err, sqlError: true})
                if(results.length == 0) return resolve({error: 'No store found.', sqlError: false})
                const { name, vat, lat, lng, capacity } = results[0]
                const store = new Store(name, vat, lat, lng, capacity)
                if(userPos)
                    store.distance = haversine(userPos, {lat: lat, lng: lng})
                resolve(store)
            })
        })
    }
    async getStoreInLine(vat) {
        const stmt = `SELECT id FROM ticket WHERE store = ? AND inside = false`
        const values = [vat]
        return new Promise( (resolve, _reject) => {
            this.dbConn.query(stmt, values, (err, results, _fields) => {
                err ? resolve({error: err.sqlMessage, sqlError: true}) : resolve(results.length)
            })
        })
    }
}

class TicketManager {
    constructor(dbConn) {
        this.dbConn = dbConn
    }
    async createTicket(email, vat) {
        const stmt = `INSERT INTO ticket (id, inside, user, store) VALUES(?,?,?,?)`
        const ticketID = crypto.randomBytes(40).toString('hex')
        const date = Math.floor(Date.now() / 1000)
        const values = [ticketID, false, email, vat]
        return new Promise( (resolve, _reject) => {
            this.dbConn.query(stmt, values, (err, _results, _fields) => {
                err ? resolve({error: err.sqlMessage, sqlError: true}) : resolve(new Ticket(ticketID, date, email, vat, false))
            })
        })
    }
}

class PositionStack {
    constructor(dbConn) {
        this.dbConn = dbConn
    }
    async getAddressFromPosition(lat, lng) {            
        const url = 'http://api.positionstack.com/v1/reverse?access_key=d2ae97b4da3aa8f88d5f1c58c38d97bd&country=IT&region=Lombardia&query=' + lat + "," + lng
        return new Promise( (resolve, _reject) => {
            request(url, (err, res, body) => {
                if(err) return resolve({error: err.sqlMessage, sqlError: true})
                if(res.statusCode != 200) 
                    return resolve({error: 'PositionStack responded with ' + res.statusCode + '.', sqlError: false})
                    
                const result = JSON.parse(body).data[0]
                result ? resolve(result.label) : resolve({error: 'Cannot find the inserted position.', sqlError: false})
            })
        })
    }
    async getPositionFromAddress(address) {            
        const url = 'http://api.positionstack.com/v1/forward?access_key=d2ae97b4da3aa8f88d5f1c58c38d97bd&country=IT&region=Lombardia&query=' + address
        return new Promise( (resolve, _reject) => {
            request(url, (err, res, body) => {
                if(err) return resolve({error: err.sqlMessage, sqlError: true})
                if(res.statusCode != 200) 
                    return resolve({error: 'PositionStack responded with ' + res.statusCode + '.', sqlError: false})

                const result = JSON.parse(body).data[0]
                result ? resolve({lat: result.latitude, lng: result.longitude}) : resolve({error: 'Cannot find the inserted address.', sqlError: false})
            })
        })
    }
}