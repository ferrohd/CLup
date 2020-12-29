const Store = require('../src/model/StoreModel')
const rg = require('./utils/RandomGenerator')
const expect = require('chai').expect
const assert = require('chai').assert

const storeName = rg.getRandomString(10)
const vat = rg.getRandomInt(1, 10000)
const lat = rg.getRandomInt(0, 10000000)
const lng = rg.getRandomInt(0, 10000000)
const capacity = rg.getRandomInt(0, 1000) 

const store = new Store(storeName, vat, lat, lng, capacity)

const json = store.toJSON()

describe('Store Model', () => {
    it('should return correct data', () => {
        // Value testing
        expect(json.name).to.be.equal(storeName)
        expect(json.vat).to.be.equal(vat)
        expect(json.position.lat).to.be.equal(lat)
        expect(json.position.lng).to.be.equal(lng)
        expect(json.capacity).to.be.equal(capacity)
    })
    it('should store correct data-type', () => {
        // Type testing
        assert.typeOf(json.name, 'string')
        assert.typeOf(json.vat, 'number')
        assert.typeOf(json.position.lat, 'number')
        assert.typeOf(json.position.lng, 'number')
        assert.typeOf(json.capacity, 'number')
    })
})
