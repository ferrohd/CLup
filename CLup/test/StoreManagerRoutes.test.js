const { expect } = require('chai')
const superagent = require('superagent')
const app = require('../src/controller/server')
const tester = require('./utils/ResponseTester')
const rg = require('./utils/RandomGenerator')
const dbHelper = require('./utils/DBHelper')

const storeManager = {email: 'allan.rose@example.com', password: 'recon', store: '51760570179'}

describe("Store Manager Route Testing", () => {
    let server
    const port = 4001
    const agent = superagent.agent()

    before( (done) => {
      server = app.listen(port, () => {
        done()
      })
    })
    after((done) => {
      server.close(done)
    })

    it("Should have logged in", async() => {
      const res = await agent
            .post(`http://localhost:${port}/login`)
            .redirects(0).ok(res => res.status < 400)
            .type('form')
            .send(storeManager)

      expect(tester.compare(res, 302, '/overview')).to.be.true
    })

    //----- /overview/capacity -----

    it("Should allow a store manager to update the capacity", async() => {
      const res = await agent
            .post(`http://localhost:${port}/overview/capacity`)
            .redirects(0).ok(res => res.status < 400)
            .type('form')
            .send({capacity: 30})

      expect(tester.compare(res, 302, '/overview')).to.be.true
    })

    it("Should not allow a store manager to update the capacity with an invalid value", async() => {
      const res = await agent
            .post(`http://localhost:${port}/overview/capacity`)
            .redirects(0).ok(res => res.status < 400)
            .type('form')
            .send({capacity: '_'})

      expect(tester.compare(res, 303, '/overview')).to.be.true
    })

    //----- /overview/ticket/scan -----

    it("Should allow a store manager to scan a ticket at the entrance", async() => {
      const ticket = {id: '_' + rg.getRandomString(10), inside: false, user: storeManager.email, store: storeManager.store, date: '2000-01-09 15 −48 −23'}
      await dbHelper.addTicket(ticket);
      
      const res = await agent
            .post(`http://localhost:${port}/overview/ticket/scan`)
            .redirects(0).ok(res => res.status < 400)
            .type('form')
            .send({ticket: ticket.id})

      expect(tester.compare(res, 302, '/overview')).to.be.true
      
      await dbHelper.deleteTicket(ticket.id)
    })

    it("Should allow a store manager to scan a ticket at the exit", async() => {
      const ticket = {id: '_' + rg.getRandomString(10), inside: true, user: storeManager.email, store: storeManager.store, date: '2000-01-09 15 −48 −23'}
      await dbHelper.addTicket(ticket);
      
      const res = await agent
            .post(`http://localhost:${port}/overview/ticket/scan`)
            .redirects(0).ok(res => res.status < 400)
            .type('form')
            .send({ticket: ticket.id})

      expect(tester.compare(res, 302, '/overview')).to.be.true

      await dbHelper.deleteTicket(ticket.id)
    })

    it("Should not allow a store manager to scan a non existing ticket", async() => {      
      const res = await agent
            .post(`http://localhost:${port}/overview/ticket/scan`)
            .redirects(0).ok(res => res.status < 400)
            .type('form')
            .send({ticket: rg.getRandomString(10)})

      expect(tester.compare(res, 303, '/overview')).to.be.true
    })

    it("Should not allow a store manager to scan a ticket that is not the head of the queue", async() => {
      const ticket1 = {id: '_' + rg.getRandomString(10), inside: false, user: storeManager.email, store: storeManager.store, date: '2000-01-08 15 −48 −23'}
      const ticket2 = {id: '_' + rg.getRandomString(10), inside: false, user: storeManager.email, store: storeManager.store, date: '2000-01-08 16 −48 −23'}
      await dbHelper.addTicket(ticket1);
      await dbHelper.addTicket(ticket2);
      
      const res = await agent
            .post(`http://localhost:${port}/overview/ticket/scan`)
            .redirects(0).ok(res => res.status < 400)
            .type('form')
            .send({ticket: ticket2.id})

      expect(tester.compare(res, 303, '/overview')).to.be.true

      await dbHelper.deleteTicket(ticket1.id)
      await dbHelper.deleteTicket(ticket2.id)
    })

    it("Should not allow a store manager to scan a ticket when the capacity is full", async() => {
      await dbHelper.setCapacity(storeManager.store, 0)

      const ticket = {id: '_' + rg.getRandomString(10), inside: false, user: storeManager.email, store: storeManager.store, date: '2000-01-07 15 −48 −23'}
      await dbHelper.addTicket(ticket);
      
      const res = await agent
            .post(`http://localhost:${port}/overview/ticket/scan`)
            .redirects(0).ok(res => res.status < 400)
            .type('form')
            .send({ticket: ticket.id})

      expect(tester.compare(res, 303, '/overview')).to.be.true

      await dbHelper.setCapacity(storeManager.store, 30)
      await dbHelper.deleteTicket(ticket.id)
    })

    // /overview/ticket

    it("Should allow a store manager to see the list of issued tickets", async() => {      
      const res = await agent
            .get(`http://localhost:${port}/overview/ticket/`)
            .redirects(0).ok(res => res.status < 400)

      expect(tester.redirected(res)).to.be.false
    })

    // /overview/ticket/issue

    it("Should allow a store manager to issue a ticket", async() => {  
      const res = await agent
            .get(`http://localhost:${port}/overview/ticket/issue`)
            .redirects(0).ok(res => res.status < 400)

      expect(tester.redirected(res)).to.be.false
            
      let regexp = new RegExp('/.*<input name="ticket" type="hidden" value="(.*)"><\/form>.*/')
      let result = res.text.match(regexp)
      await dbHelper.deleteTicket(result[1])
    })

    // /overview/ticket/delete

    it("Should allow a store manager to delete a ticket", async() => {
      const ticket = {id: '_' + rg.getRandomString(10), inside: false, user: storeManager.email, store: storeManager.store, date: '2000-01-09 15 −48 −23'}
      await dbHelper.addTicket(ticket);
      
      const res = await agent
            .post(`http://localhost:${port}/overview/ticket/delete`)
            .redirects(0).ok(res => res.status < 400)
            .type('form')
            .send({ticket: ticket.id})

      expect(tester.compare(res, 302, '/overview')).to.be.true

      await dbHelper.deleteTicket(ticket.id)
    })
  })