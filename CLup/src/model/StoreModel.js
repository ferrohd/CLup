module.exports = class Store {
    constructor(name, vat, lat, lng, capacity, openFrom, openTo) {
        this.name = name
        this.vat = vat
        this.lat = lat
        this.lng = lng
        this.capacity = capacity,
        this.openFrom = openFrom,
        this.openTo = openTo
    }
    toJSON() { return {
        name: this.name,
        vat: this.vat,
        position: {
            lat: this.lat,
            lng: this.lng
        },
        capacity: this.capacity,
        open: {
            from: this.openFrom,
            to: this.openTo
        }
    }}
}