const { expect } = require('chai')
const superagent = require('superagent')
const app = require('../src/controller/server')
const tester = require('./utils/ResponseTester')
const rg = require('./utils/RandomGenerator')
const cleaner = require('./utils/DBHelper')

const store = {vat: rg.getRandomString(10), name: '_', lat: 45.464211, lng: 9.191383, capacity: 10}
const storeManager = {name: '_', surname: '_', email: rg.getRandomString(10) + '@example1.com', password: rg.getRandomString(10), store: store.vat}

describe("Store Manager Route Testing", () => {
    let server
    const port = 4001
    const agent = superagent.agent()

    before( (done) => {
      cleaner.addStore(store)
      cleaner.addUser(storeManager)
      server = app.listen(port, () => {
        done()
      })
    })
    after((done) => {
      server.close(done)
      cleaner.deleteUser(storeManager.email)
      cleaner.deleteStore(store.vat)
    })

    it("Should have logged in", async() => {
      const res_ = await agent
            .post(`http://localhost:${port}/login`)
            .redirects(0).ok(res => res.status < 400)
            .type('form')
            .send(storeManager)

      expect(tester.compare(res_, 302, '/overview')).to.be.true
    })

    //----- /overview/capacity -----

    it("Should allow a store manager to update the capacity", async() => {
      const res = await agent
            .post(`http://localhost:${port}/overview/capacity`)
            .redirects(0).ok(res => res.status < 400)
            .type('form')
            .send({capacity: 0})

      expect(tester.redirected(res)).to.be.false
    })

    // it("Should not allow a store manager to update the capacity with an invalid value", async() => {
    //   // const res
    //   // expect(tester.compare(res, 303, '/overview')).to.be.true

    //   const res = await agent
    //         .get(`http://localhost:${port}/overview`)
    //         .redirects(0).ok(res => res.status < 400)

    //   expect(tester.redirected(res)).to.be.true
    // })

    // /overview/ticket/scan

    // it("Should allow a store manager to scan a ticket at the entrance", async() => {
    //   const res
    //   expect(tester.compare(res, 302, '/overview')).to.be.true
    // })

    // it("Should allow a store manager to scan a ticket at the exit", async() => {
    //   const res
    //   expect(tester.compare(res, 302, '/overview')).to.be.true
    // })

    // it("Should not allow a store manager to scan a non existing ticket", async() => {
    //   const res
    //   expect(tester.compare(res, 303, '/overview')).to.be.true
    // })

    // it("Should not allow a store manager to scan a ticket that is not the head of the queue", async() => {
    //   const res
    //   expect(tester.compare(res, 303, '/overview')).to.be.true
    // })

    // it("Should not allow a store manager to scan a ticket when the capacity is full", async() => {
    //   const res
    //   expect(tester.compare(res, 303, '/overview')).to.be.true
    // })

    // /overview/ticket

    // it("Should allow a store manager to see the list of issued tickets", async() => {
    //   const res
    //   expect(tester.compare(res, 302, '/overview')).to.be.true
    // })

    // /overview/ticket/issue

    // it("Should allow a store manager to issue a ticket", async() => {
    //   const res
    //   expect(tester.compare(res, 302, '/overview')).to.be.true
    // })

    // /overview/ticket/delete

    // it("Should allow a store manager to delete a ticket", async() => {
    //   const res
    //   expect(tester.compare(res, 302, '/overview')).to.be.true
    // })

    // it("Should not allow a store manager to delete an invalid ticket", async() => {
    //   const res
    //   expect(tester.compare(res, 303, '/overview')).to.be.true
    // })
  })