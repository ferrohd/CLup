export class StoreManagerServices {
    constructor() {
        this.storeOverview = new StoreOverview()
        this.storeManagement = new StoreManagement()
        this.scanTicket = new ScanTicket()
    }
}

class StoreOverview {
    constructor() {}
    getInsideStatus(store) {}
    getQueueStatus(store) {}
    getBookingStatus(store) {}
}

class StoreManagement {
    constructor() {}
    editStoreCapacity(store, new_capacity) {}
    getStoreCapacity(store) {}
}

class ScanTicket {
    constructor() {}
    scanEntrance(store, ticket) {}
    scanExit(store, ticket) {}
}