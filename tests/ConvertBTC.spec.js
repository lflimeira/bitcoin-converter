const nock = require('nock')
const chai = require('chai')
const sinon = require('sinon')
const sinonChai = require('sinon-chai')
const expect = chai.expect

chai.use(sinonChai)

const convertBTC = require('../src/ConvertBTC')

describe('ConvertBTC', () => {
  
  let consoleStub

  const responseMock = {
    "time": "2018-04-10 02:01:45",
    "success": true,
    "price": 6758.51
  }
  
  beforeEach(() => {
    consoleStub = sinon.stub(console, 'log')
  })

  afterEach(() => {
    console.log.restore()
  })

  it('should use currency USD and 1 as amount default', (done) => {
    nock('https://apiv2.bitcoinaverage.com')
      .get('/convert/global')
      .query({ from: 'BTC', to: 'USD', amount: 1 })
      .reply(200, responseMock)

    convertBTC()

    setTimeout(() => {
      expect(consoleStub).to.have.been.calledWith('1 BTC to USD = 6758.51')
      done()
    }, 300)
  })

  it('should use currency USD and 10 as amount', (done) => {
    nock('https://apiv2.bitcoinaverage.com')
      .get('/convert/global')
      .query({ from: 'BTC', to: 'USD', amount: 10 })
      .reply(200, responseMock)

    convertBTC('USD', 10)

    setTimeout(() => {
      expect(consoleStub).to.have.been.calledWith('10 BTC to USD = 6758.51')
      done()
    }, 300)
  })
})
