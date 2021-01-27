const { expect } = require('chai')
const superagent = require('superagent')
const app = require('../src/controller/server')

describe("Clupper Route Testing", () => {
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

    it("Should allow a clupper to get stores list", async () => {
        const res = await agent
              // Login
              .post(`http://localhost:${port}/login`)
              .type('form')
              .send({email: 'beatrice.fletcher@example.com', password: 'louis'})
              expect(res.status).to.be.equal(200)
              // Go to explore page
        const res_1 = await agent      
              .get(`http://localhost:${port}/explore`)
              expect(res_1.status).to.be.equal(200)
    })

    it("Should allow a clupper to get queue status", async () => {
        const res = await agent
              // Login
              .post(`http://localhost:${port}/login`)
              .type('form')
              .send({email: 'beatrice.fletcher@example.com', password: 'louis'})
              expect(res.status).to.be.equal(200)
              // Go to queue page
        const res_1 = await agent      
              .get(`http://localhost:${port}/explore/queue/`)
              expect(res_1.status).to.be.equal(200)
    })

    it("Should allow a clupper to join a queue", async () => {
        const res = await agent
              // Login
              .post(`http://localhost:${port}/login`)
              .type('form')
              .send({email: 'beatrice.fletcher@example.com', password: 'louis'})
              expect(res.status).to.be.equal(200)
              // Join queue
        const res_1 = await agent      
              .post(`http://localhost:${port}/explore/queue/join`)
              .type('form')
              .send({vat: 51760570179})
              expect(res_1.status).to.be.equal(200)
    })

    it("Should allow a clupper to leave a queue", async () => {
        const res = await agent
              // Login
              .post(`http://localhost:${port}/login`)
              .type('form')
              .send({email: 'beatrice.fletcher@example.com', password: 'louis'})
              expect(res.status).to.be.equal(200)
              // Leave queue
        const res_1 = await agent      
              .post(`http://localhost:${port}/explore/queue/leave`)
              .type('form')
              .send({vat: 51760570179})
              expect(res_1.status).to.be.equal(200)
    })
  })