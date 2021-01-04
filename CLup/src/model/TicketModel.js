const qrcode = require('qrcode')

module.exports = class Ticket {
    constructor(id, date, user, store, inside) {
        this.id = id
        this.date = date
        this.user = user
        this.store = store
        this.inside = inside
        //Additional fields
        this.qrcode = null
    }
    toJSON() { return {
        id: this.id,
        date: this.date,
        user: this.user,
        store: this.store,
        inside: this.inside
    }}
    toPNGBase64() {
        return new Promise( (resolve, _reject) => {
            qrcode.toBuffer(this.id, {margin: 0, color: {light: "#ffffff00", dark: "#272d2dff"}}, (err, buf) => {
                if (err) resolve({error: err})
                else resolve(buf.toString('base64'))
            })
        })
    }
}