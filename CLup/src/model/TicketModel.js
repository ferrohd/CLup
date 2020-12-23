module.exports = class Ticket {
    constructor(id, date, validFrom, validTo, user, store) {
        this.id = id
        this. date = date
        this.validFrom = validFrom
        this.validTo = validTo
        this.user = user
        this.store = store
    }
    toJSON() { return {
        id: this.id,
        date: this.date,
        valid: {
            from: this.validFrom,
            to: this.validTo
        },
        user: this.user,
        store: this.store
    }}
}