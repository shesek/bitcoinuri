const iferr  = require('iferr')
    , except = require('except')
    , { toBTC, formatURL, makePaymentReq } = require('./util')

const app = require('express')()
app.disable('x-powered-by')
app.use(require('morgan')('dev'))

let redirect
app.get('/:addr([13][0-9a-zA-Z]+)/:amount([0-9.]+)/:currency([A-Z]{3})', (req, res, next) => {
  toBTC(req.params.amount, req.params.currency, iferr(next, amount =>
    res.format({
      'text/html': redirect = _ => res.redirect(302, formatURL(req.params.addr, amount, req.query))
    , 'application/bitcoin-paymentrequest': _ => res.type('application/bitcoin-paymentrequest')
                                             .send(makePaymentReq(req.params.addr, amount, req.query))
    , default: redirect
    })
  ))
})

app.listen(process.env.PORT || 3000, _ => console.log('HTTP server running.'))
