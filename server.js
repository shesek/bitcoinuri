const iferr  = require('iferr')
    , except = require('except')
    , { toBTC, formatURL, makePaymentReq } = require('./util')

    , CTYPE = 'application/bitcoin-paymentrequest'

const app = require('express')()
app.use(require('morgan')('dev'))

let redirect
app.get('/:addr([13][0-9a-zA-Z]+)/:amount([0-9.]+)/:currency([A-Z]{3})', ({ params, query }, res, next) =>
  toBTC(params.amount, params.currency, iferr(next, amount =>
    res.format({
      'text/html': redirect = _ => res.redirect(302, formatURL(params.addr, amount, query))
    , [CTYPE]: _ => res.type(CTYPE).send(makePaymentReq(params.addr, amount, query))
    , default: redirect
    })
  ))
)

app.listen(process.env.PORT || 3000, _ => console.log('HTTP server running.'))
