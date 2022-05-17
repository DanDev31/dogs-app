const chai = require('chai')
const chaiHttp = require('chai-http')
const  should = require('chai').should()
const app = require('../../src/app.js')

chai.use(chaiHttp);


describe('Temperaments Route', () => {

    it('It should GET all temperaments', (done) => {
        chai.request(app)
        .get('/temperament')
        .end((err, res) => {
            res.should.have.status(200)
            res.body.should.be.a('array')
            done()
        })
    })

})