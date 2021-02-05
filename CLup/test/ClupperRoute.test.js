const { expect } = require('chai')
const superagent = require('superagent')
const app = require('../src/controller/server')
const tester = require('./utils/ResponseTester')

const clupper = {email: 'beatrice.fletcher@example.com', password: 'louis'}

describe("Clupper Routes Testing", () => {
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

    it("Should have logged in", async () => {
      const user = clupper
      const res = await agent
            .post(`http://localhost:${port}/login`)
            .redirects(0).ok(res => res.status < 400)
            .type('form')
            .send(user)
      expect(tester.compare(res, 302, '/explore')).to.be.true
    })

    it("Should allow a clupper to get stores list", async () => {
      const res = await agent
            .get(`http://localhost:${port}/explore`)
            .redirects(0).ok(res => res.status < 400)

      expect(res.status).to.be.equal(200)
    })

    it("Should allow a clupper to get a store info", async () => {
      const storeId = 51760570179
      const res = await agent
            .get(`http://localhost:${port}/explore/store/`)
            .query({id: storeId})
            .redirects(0).ok(res => res.status < 400)

      expect(res.status).to.be.equal(200)
    })

    it("Should not allow a clupper to get a store that doesn't exists", async () => {
      const storeId = 99999999999
      const res = await agent
            .get(`http://localhost:${port}/explore/store/`)
            .query({id: storeId})
            .redirects(0).ok(res => res.status < 400)

      expect(tester.compare(res, 303, '/explore')).to.be.true
    })

    it("Should not allow a clupper to get queue status when he's not in queue", async () => {
      const res = await agent      
            .get(`http://localhost:${port}/explore/queue/`)
            .redirects(0).ok(res => res.status < 400)
      expect(tester.compare(res, 303, '/explore')).to.be.true
    })

    it("Should not allow a clupper to join a non existent queue", async () => {
      const storeId = 99999999999
      const res = await agent      
            .post(`http://localhost:${port}/explore/queue/join`)
            .type('form')
            .send({vat: storeId})
            .redirects(0).ok(res => res.status < 400)
      expect(tester.compare(res, 303, '/explore')).to.be.true
  })

    it("Should allow a clupper to join a queue", async () => {
        const res = await agent      
              .post(`http://localhost:${port}/explore/queue/join`)
              .type('form')
              .send({vat: 51760570179})
      expect(res.status).to.be.equal(200)
    })

    it("Should allow a clupper to get queue status", async () => {
      const res = await agent      
            .get(`http://localhost:${port}/explore/queue/`)
      expect(res.status).to.be.equal(200)
    })

    it("Should allow a clupper to leave a queue", async () => {
      const res = await agent      
              .post(`http://localhost:${port}/explore/queue/leave`)
              .type('form')
              .send({vat: 51760570179})
      expect(res.status).to.be.equal(200)
    })

    it("Should not allow a clupper to leave a not existent queue", async () => {
      const storeId = 99999999999
      const res = await agent      
            .post(`http://localhost:${port}/explore/queue/leave`)
            .type('form')
            .send({vat: storeId})
            .redirects(0).ok(res => res.status < 400)
      expect(tester.compare(res, 303, '/explore/queue')).to.be.true
    })
  })