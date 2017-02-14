const iferr  = require('iferr')
    , except = require('except')
    , { toBTC, formatURL, makePaymentReq } = require('./util')

const app = require('express')()

app.use(require('morgan')('dev'))

app.get('/:addr([13][0-9a-zA-Z]+)', (req, res, next) => {
  if (!/^[A-Z]{3}$/.test(req.query.currency) || isNaN(+req.query.amount))
    return res.status(400).send('Invalid parameters')

  toBTC(req.query.amount, req.query.currency, iferr(next, amount =>
    res.format({
      default: _ => res.redirect(302, formatURL(req.params.addr, Object.assign(except(req.query, 'currency'), { amount })))
    , 'application/bitcoin-paymentrequest': _ => res.type('application/bitcoin-paymentrequest')
                                             .send(makePaymentReq(req.params.addr, amount))
    })
  ))
})

app.listen(process.env.PORT || 3000, _ => console.log('HTTP server running.'))
