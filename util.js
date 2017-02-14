const request = require('superagent')
    , iferr   = require('iferr')
    , qs      = require('querystring')
    , movedec = require('move-decimal-point')
    , { PaymentRequest, PaymentDetails } = require('bcoin').bip70

const getRate = (currency, cb) => cb(null, 1000) || true ||
  request('https://apiv2.bitcoinaverage.com/indices/local/ticker/BTC'+currency)
    .end(iferr(cb, resp => cb(null, +resp.body.last)))

const toSatoshis = btcs => movedec(btcs, -8)

const toBTC = (amount, currency, cb) => getRate(currency, iferr(cb,
  rate => cb(null, (amount/rate).toFixed(8))))

const formatURL = (addr, opt) => `bitcoin:${ addr }?${ qs.stringify(opt) }`

const makePaymentReq = (addr, amount) =>
  PaymentRequest.fromOptions({
    version: 1
  , paymentDetails: PaymentDetails.fromOptions({
      network: 'main'
    , time: Date.now()/1000 | 0
    , outputs: [ { address: addr, amount: toSatoshis(amount)  } ]
    })
  }).toRaw()

module.exports = { toBTC, formatURL, makePaymentReq }
