const request = require('superagent')
    , iferr   = require('iferr')
    , qs      = require('querystring')

const getRate = (currency, cb) =>
  request('https://apiv2.bitcoinaverage.com/indices/local/ticker/BTC'+currency)
    .end(iferr(cb, resp => cb(null, +resp.body.last)))

const toBTC = (amount, currency='USD', cb) => getRate(currency, iferr(cb,
  rate => cb(null, (amount/rate).toFixed(8))))

const formatURL = (addr, opt) => `bitcoin:${ addr }?${ qs.stringify(opt) }`

module.exports = { toBTC, formatURL }
