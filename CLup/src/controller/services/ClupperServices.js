const Ticket = require('./../../model/TicketModel')

module.exports = class ClupperServices {
    bookingManagement = new BookingManagement()
    queueManagement = new QueueManagement()
    storeLocator = new StoreLocator()
}

class BookingManagement {
    constructor() {}
    getAvaiableTimeSlots(store) {}
    createBooking(email, store, from , to) {
        return new Ticket(id, date, from, to, email, store)
    }
    deleteBooking(ticket) {}
    getBookingStatus(ticket) {}
}

class QueueManagement {
    constructor() {}
    joinQueue(email, store) {}
    leaveQueue(email, store) {}
    getQueueStatus(email, store) {
        return {
            position: 10,
            peopleInQueue: 100
        }
    }
}

class StoreLocator {
    constructor() {}
    findPositionByAddress(address) {}
    findStoreByPosition(gps_position) {}
    findNearStores(gps_position, radius) {}
}