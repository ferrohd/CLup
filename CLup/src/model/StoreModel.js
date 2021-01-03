module.exports = class Store {
    constructor(name, vat, lat, lng, capacity) {
        this.name = name
        this.vat = vat
        this.lat = lat
        this.lng = lng
        this.capacity = capacity
        //Additional fields
        this.distance = null
        this.address = null
        this.inline = null
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