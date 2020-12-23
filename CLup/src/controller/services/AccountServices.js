export class AccountServices {
    accountManagement = new AccountManagement()
}

class AccountManagement {
    constructor() {}
    registerClupper(name, surname, email, password) {}
    registerStoreManager(mame, surname, email, password, storeName, storeAddress, storeVAT, storeMaxCapacity, openingTimeFrames)
    login(username, password) {}
    logout(user) {}
}