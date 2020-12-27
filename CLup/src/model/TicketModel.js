module.exports = class Ticket {
    constructor(id, date, user, store, inside) {
        this.id = id
        this. date = date
        this.user = user
        this.store = store
        this.inside = inside
    }
    toJSON() { return {
        id: this.id,
        date: this.date,
        user: this.user,
        store: this.store,
        inside: this.inside
    }}
}