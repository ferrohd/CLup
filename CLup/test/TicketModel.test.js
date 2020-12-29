const Ticket = require('../src/model/TicketModel')
const rg = require('./utils/RandomGenerator')
const expect = require('chai').expect
const assert = require('chai').assert

const id = rg.getRandomString(10)
const date = rg.getRandomInt(1, 10000)
const user = rg.getRandomInt(0, 10000000)
const store = rg.getRandomInt(0, 10000000)
const inside = rg.getRandomBool(0, 1000) 

const ticket = new Ticket(id, date, user, store, inside)

const json = ticket.toJSON()

describe('Ticket Model', () => {
    it('should return correct data', () => {
        // Value testing
        expect(json.id).to.be.equal(id)
        expect(json.date).to.be.equal(date)
        expect(json.user).to.be.equal(user)
        expect(json.store).to.be.equal(store)
        expect(json.inside).to.be.equal(inside)
    })
    it('should store correct data-type', () => {
        // Type testing
        assert.typeOf(json.id, 'string')
        assert.typeOf(json.date, 'number')
        assert.typeOf(json.user, 'number')
        assert.typeOf(json.store, 'number')
        assert.typeOf(json.inside, 'boolean')
    })
})
