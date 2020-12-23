export class ClupperServices {
    bookingManagement = new BookingManagement()
    queueManagement = new QueueManagement()
    storeLocator = new StoreLocator()
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