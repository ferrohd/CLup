const { expect } = require('chai')
const superagent = require('superagent')
const app = require('../src/controller/server')

describe("Account Route Testing", () => {
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

    it("Should not allow unregistered user", async () => {
      let response
        try {
            response = await agent.get(`http://localhost:${port}/explore`)
        } catch (err) {
            expect(err.response.status).to.be.equal(302)
            const response = undefined
        }
        expect(response.status).to.be.equal(200)
    })
  
    it("Should allow a user to login", async () => {
      const res = await agent
            // Login
            .post(`http://localhost:${port}/login`)
            .type('form')
            .send({email: 'beatrice.fletcher@example.com', password: 'louis'})
            expect(res.status).to.be.equal(200)
            // Go to explore page
            const res_1 = await agent.get(`http://localhost:${port}/explore`)
            expect(res_1.status).to.be.equal(200)
    })

    it("Should allow a user to logout", async () => {
        const res = await agent
                .get(`http://localhost:${port}/logout`)
                expect(res.status).to.be.equal(200)
    })
  })