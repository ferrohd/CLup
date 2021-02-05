const { expect } = require('chai')
const superagent = require('superagent')
const app = require('../src/controller/server')
const tester = require('./utils/ResponseTester')

const clupper = {email: 'beatrice.fletcher@example.com', password: 'louis'}
const storeManager = {email: 'allan.rose@example.com', password: 'recon'}

describe("Middlewares Testing", () => {
    let server
    const port = 4001
    const agent = superagent.agent()

    before((done) => {
      server = app.listen(port, () => {
        done()
      })
    })
    after((done) => {
      server.close(done)
    })
  
    it("Should not allow the access to explore without login", async () => {
      const res = await agent
            .get(`http://localhost:${port}/explore`)
            .redirects(0).ok(res => res.status < 400)

      expect(tester.compare(res, 303, '/login')).to.be.true
    })
  
    it("Should not allow the access to overview without login", async () => {
      const res = await agent
            .get(`http://localhost:${port}/overview`)
            .redirects(0).ok(res => res.status < 400)

      expect(tester.compare(res, 303, '/login')).to.be.true
    })
  
    it("Should allow a clupper the access to explore", async () => {
      const user = clupper
      const res = await agent
            .post(`http://localhost:${port}/login`)
            .redirects(0).ok(res => res.status < 400)
            .type('form')
            .send(user)

      expect(tester.compare(res, 302, '/explore')).to.be.true

      const res2 = await agent
            .get(`http://localhost:${port}/explore`)
            .redirects(0).ok(res => res.status < 400)

      expect(tester.redirected(res2)).to.be.false 

      const res3 = await agent
            .get(`http://localhost:${port}/logout`)
            .redirects(0).ok(res => res.status < 400)

      expect(tester.compare(res3, 302, '/login')).to.be.true
    })
  
    it("Should not allow a clupper the access to overview", async () => {
      const user = clupper
      const res = await agent
            .post(`http://localhost:${port}/login`)
            .redirects(0).ok(res => res.status < 400)
            .type('form')
            .send(user)

      expect(tester.compare(res, 302, '/explore')).to.be.true

      const res2 = await agent
            .get(`http://localhost:${port}/overview`)
            .redirects(0).ok(res => res.status < 400)

      expect(tester.compare(res2, 303, '/explore')).to.be.true

      const res3 = await agent
            .get(`http://localhost:${port}/logout`)
            .redirects(0).ok(res => res.status < 400)

      expect(tester.compare(res3, 302, '/login')).to.be.true
    })
  
    it("Should allow a store manager the access to overview", async () => {
      const user = storeManager
      const res = await agent
            .post(`http://localhost:${port}/login`)
            .redirects(0).ok(res => res.status < 400)
            .type('form')
            .send(user)

      expect(tester.compare(res, 302, '/overview')).to.be.true

      const res2 = await agent
            .get(`http://localhost:${port}/overview`)
            .redirects(0).ok(res => res.status < 400)

      expect(tester.redirected(res2)).to.be.false 

      const res3 = await agent
            .get(`http://localhost:${port}/logout`)
            .redirects(0).ok(res => res.status < 400)

      expect(tester.compare(res3, 302, '/login')).to.be.true
    })
  
    it("Should not allow a store manager the access to explore", async () => {
      const user = storeManager
      const res = await agent
            .post(`http://localhost:${port}/login`)
            .redirects(0).ok(res => res.status < 400)
            .type('form')
            .send(user)

      expect(tester.compare(res, 302, '/overview')).to.be.true

      const res2 = await agent
            .get(`http://localhost:${port}/explore`)
            .redirects(0).ok(res => res.status < 400)

      expect(tester.compare(res2, 303, '/overview')).to.be.true

      const res3 = await agent
            .get(`http://localhost:${port}/logout`)
            .redirects(0).ok(res => res.status < 400)

      expect(tester.compare(res3, 302, '/login')).to.be.true
    })
  })