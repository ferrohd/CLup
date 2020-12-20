export class ClupperServices {
    constructor() {
        this.bookingManagement = new BookingManagement()
        this.queueManagement = new QueueManagement()
        this.storeLocator = new StoreLocator()
    }
}

class BookingManagement {
    constructor() {}
    getAvaiableTimeSlots(store) {}
    createBooking(clupper, store, timeslots) {}
    deleteBooking(ticket) {}
    getBookingStatus(ticket) {}
}

class QueueManagement {
    constructor() {}
    joinQueue(clupper, store) {}
    leaveQueue(ticket) {}
    getQueueStatus(ticket) {}
}

class StoreLocator {
    constructor() {}
    findPositionByAddress(address) {}
    findStoreByPosition(gps_position) {}
    findNearStores(gps_position, radius) {}
}