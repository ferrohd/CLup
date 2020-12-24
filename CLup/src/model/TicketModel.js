module.exports = class Ticket {
    constructor(id, date, validFrom, validTo, user, store, inside) {
        this.id = id
        this. date = date
        this.validFrom = validFrom
        this.validTo = validTo
        this.user = user
        this.store = store
        this.inside = inside
    }
    toJSON() { return {
        id: this.id,
        date: this.date,
        valid: {
            from: this.validFrom,
            to: this.validTo
        },
        user: this.user,
        store: this.store,
        inside: this.inside
    }}
}