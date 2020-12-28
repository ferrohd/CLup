module.exports = class Store {
    constructor(name, vat, lat, lng, capacity) {
        this.name = name
        this.vat = vat
        this.lat = lat
        this.lng = lng
        this.capacity = capacity
    }
    toJSON() { return {
        name: this.name,
        vat: this.vat,
        position: {
            lat: this.lat,
            lng: this.lng
        },
        capacity: this.capacity
    }}
}