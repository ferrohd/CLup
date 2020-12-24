const DatabaseConnection = require('../database/DatabaseConnection')
const Ticket = require('./../../model/TicketModel')

module.exports = class ClupperServices {
    constructor() {
        this.dbConn = DatabaseConnection.getConnection()
        this.bookingManagement = new BookingManagement(this.dbConn)
        this.queueManagement = new QueueManagement(this.dbConn)
        this.storeLocator = new StoreLocator(this.dbConn)
    }
}

class BookingManagement {
    constructor(dbConn) {
        this.dbConn = dbConn
    }
    getAvaiableTimeSlots(store) {}
    createBooking(email, store, from , to) {
        return new Ticket(id, date, from, to, email, store)
    }
    deleteBooking(ticket) {}
    getBookingList(email) {
        const bookings = []
        return bookings
    }
    getBookingStatus(ticket) {}
}

class QueueManagement {
    constructor(dbConn) {
        this.dbConn = dbConn
    }
    joinQueue(email, store) {}
    leaveQueue(email, store) {}
    getQueueStatus(email, store) {
        return {
            ticketID,
            position: 10,
            peopleInQueue: 100
        }
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