const User = require('../src/model/UserModel')
const rg = require('./utils/RandomGenerator')
const expect = require('chai').expect
const assert = require('chai').assert

const name = rg.getRandomString(10)
const surname = rg.getRandomString(10)
const email = rg.getRandomString(10) + '@' + rg.getRandomString(10) + '.' + rg.getRandomString(3)
const password = rg.getRandomString(10)
const store = rg.getRandomInt(0, 1000) 

const ticket = new User(name, surname, email, password, store)

const json = ticket.toJSON()

describe('User Model', () => {
    it('should return correct data', () => {
        // Value testing
        expect(json.name).to.be.equal(name)
        expect(json.surname).to.be.equal(surname)
        expect(json.email).to.be.equal(email)
        expect(json.password).to.be.equal(password)
        expect(json.store).to.be.equal(store)
    })
    it('should store correct data-type', () => {
        // Type testing
        assert.typeOf(json.name, 'string')
        assert.typeOf(json.surname, 'string')
        assert.typeOf(json.email, 'string')
        assert.typeOf(json.password, 'string')
        assert.typeOf(json.store, 'number')
    })
})
