const { expect } = require('chai')
const superagent = require('superagent')
const app = require('../src/controller/server')

let issuedTicketId = null

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

    it("Should allow a store manager to get overview of the sore", async () => {
        const res = await agent
              // Login
              .post(`http://localhost:${port}/login`)
              .type('form')
              .send({email: 'allan.rose@example.com', password: 'recon'})
              expect(res.status).to.be.equal(200)
              // Go to explore page
        const res_1 = await agent      
              .get(`http://localhost:${port}/overview`)
              expect(res_1.status).to.be.equal(200)
    })

    it("Should allow a store manager to issue a new ticket", async () => {
        const res = await agent
              // Login
              .post(`http://localhost:${port}/login`)
              .type('form')
              .send({email: 'allan.rose@example.com', password: 'recon'})
              expect(res.status).to.be.equal(200)
              // Go to queue page
        const res_1 = await agent      
              .get(`http://localhost:${port}/ticket`)
              expect(res_1.status).to.be.equal(200)
    })
  })