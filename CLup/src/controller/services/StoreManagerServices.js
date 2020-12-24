module.exports = class StoreManagerServices {
    constructor() {}
    storeOverview = new StoreOverview()
    storeManagement = new StoreManagement()
    scanTicket = new ScanTicket()
}

class StoreOverview {
    constructor() {}
    getInsideStatus(store) {}
    getQueueStatus(store) {}
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