module.exports = class User {
    constructor(name, surname, email, password, store) {
        this.name = name
        this.surname = surname
        this.email = email
        this.password = password
        this.store = store || null
    }
    isClupper() { return this.store == null }
    toJSON() { return {
        name: this.name,
        surname: this.surname,
        email: this.email,
        password: this.password,
        store: this.store
    }}
}