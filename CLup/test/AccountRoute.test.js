const { expect } = require('chai')
const superagent = require('superagent')
const app = require('../src/controller/server')
const tester = require('./utils/ResponseTester')
const rg = require('./utils/RandomGenerator')
const cleaner = require('./utils/DBCleaner')

const clupper = {email: 'beatrice.fletcher@example.com', password: 'louis'}
const storeManager = {email: 'allan.rose@example.com', password: 'recon'}
const store = {vat: '51760570179'}
const newUser = {name: rg.getRandomString(10), surname: rg.getRandomString(10), email: rg.getRandomString(10) + '@example3.com', password: rg.getRandomString(10), storeName: rg.getRandomString(10), address: 'Duomo di Milano', vat: rg.getRandomString(10) + '2', capacity: rg.getRandomInt(5, 100)}

describe("Account Route Testing", () => {
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
  
    it("Should allow a clupper to login", async () => {
      const user = clupper
      const res = await agent
            .post(`http://localhost:${port}/login`)
            .redirects(0).ok(res => res.status < 400)
            .type('form')
            .send(user)

      expect(tester.compare(res, 302, '/explore')).to.be.true
    })

    it("Should allow a store manager to login", async () => {
      const user = storeManager
      const res = await agent
            .post(`http://localhost:${port}/login`)
            .redirects(0).ok(res => res.status < 400)
            .type('form')
            .send(user)

      expect(tester.compare(res, 302, '/overview')).to.be.true
    })
  
    it("Should not allow the login with wrong credentials", async () => {
      const user = newUser
      const res = await agent
            .post(`http://localhost:${port}/login`)
            .redirects(0).ok(res => res.status < 400)
            .type('form')
            .send(user)

      expect(tester.compare(res, 303, '/login')).to.be.true
    })

    it("Should redirect to login on logout", async () => {
      const res = await agent
            .get(`http://localhost:${port}/logout`)
            .redirects(0).ok(res => res.status < 400)

      expect(tester.compare(res, 302, '/login')).to.be.true
    })

    it("Should allow a clupper to register", async () => {
      const user = newUser
      const res = await agent
            .post(`http://localhost:${port}/register`)
            .redirects(0).ok(res => res.status < 400)
            .type('form')
            .send(user)

      expect(tester.compare(res, 302, '/login')).to.be.true

      cleaner.deleteUser(user.email)
    })

    it("Should not allow a clupper to register with incomplete data", async () => {
      const user = {...newUser}
      user[Object.keys(user)[rg.getRandomInt(0, 3)]] = null
      const res = await agent
            .post(`http://localhost:${port}/register`)
            .redirects(0).ok(res => res.status < 400)
            .type('form')
            .send(user)

      var result = tester.compare(res, 303, '/register')

      expect(result).to.be.true
      if(!result)
        cleaner.deleteUser(user.email)
    })

    it("Should not allow a clupper to register with an already registered email", async () => {
      const user = {...newUser}
      user.email = rg.getRandomBool() ? clupper.email : storeManager.email
      const res = await agent
            .post(`http://localhost:${port}/register`)
            .redirects(0).ok(res => res.status < 400)
            .type('form')
            .send(user)

      expect(tester.compare(res, 303, '/register')).to.be.true
    })

    it("Should allow a store manager to register", async () => {
      const user = newUser
      const res = await agent
            .post(`http://localhost:${port}/register-store`)
            .redirects(0).ok(res => res.status < 400)
            .type('form')
            .send(user)

      expect(tester.compare(res, 302, '/login')).to.be.true

      cleaner.deleteUser(user.email)
      cleaner.deleteStore(user.vat)
    })

    it("Should not allow a store manager to register with incomplete data", async () => {
      const user = {...newUser}
      user[Object.keys(user)[rg.getRandomInt(0, 7)]] = null
      const res = await agent
            .post(`http://localhost:${port}/register-store`)
            .redirects(0).ok(res => res.status < 400)
            .type('form')
            .send(user)
      
      var result = tester.compare(res, 303, '/register-store')

      expect(result).to.be.true
      if(!result) {
        cleaner.deleteUser(user.email)
        cleaner.deleteStore(user.vat)
      }
    })

    it("Should not allow a store manager to register with an already registered email", async () => {
      const user = {...newUser}
      user.email = rg.getRandomBool() ? clupper.email : storeManager.email
      const res = await agent
            .post(`http://localhost:${port}/register-store`)
            .redirects(0).ok(res => res.status < 400)
            .type('form')
            .send(user)

      expect(tester.compare(res, 303, '/register-store')).to.be.true
    })

    it("Should not allow a store manager to register with an already registered vat", async () => {
      const user = {...newUser}
      user.vat = store.vat
      const res = await agent
            .post(`http://localhost:${port}/register-store`)
            .redirects(0).ok(res => res.status < 400)
            .type('form')
            .send(user)

      expect(tester.compare(res, 303, '/register-store')).to.be.true
    })
  })