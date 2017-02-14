# bitcoinuri

Create bitcoin payment URIs with amounts that are dynamically adjusted to reflect
the current bitcoin exchange rate.

## Installing & Running

```bash
$ git clone https://github.com/shesek/bitcoinuri && cd bitcoinuri
$ npm install
$ PORT=3000 npm start
```

If you can't install this app yourself, there's a hosted version of it available at https://bitcoinuri.herokuapp.com/.

Before using the hosted version, please make sure to read the :warning: WARNING :warning: message below.

## How to use

There are two different methods for using this script:

#### Method 1: BIP 21 URI redirect (*for payment links*)

This method works by using an HTTP URL (`https://host/:addr/:amount/:currency`)
that redirects to the `bitcoin:` URI (with the provided
`address` and `amount` converted from `currency` to BTC)
instead of using the `bitcoin:` URI directly.

For example, the URL below will issue a redirect to the `bitcoin:` URI
with the amount field set to the BTC-equivalent of $30.

https://bitcoinuri.herokuapp.com/1E6Ap6h7skgRDJCygm5U17GSBtKY6jfLBP/30/USD?memo=bamba

```bash
$ curl -I https://bitcoinuri.herokuapp.com/1E6Ap6h7skgRDJCygm5U17GSBtKY6jfLBP/30/USD?memo=bamba

HTTP/1.1 302 Found
Location: bitcoin:1E6Ap6h7skgRDJCygm5U17GSBtKY6jfLBP?amount=0.03012&memo=bamba
```

The advantage of this method is that it does not require the wallet to support the BIP 70 payment protocol.

However, this doesn't work well as a QR code with all wallets.
Some wallets (like the Bitcoin Android Wallet) expects to find the `bitcoin:` URI directly in the scanned QR code
and won't follow URLs if they encounter them,
while other wallets (like Mycelium) open the URL using the built-in browser mechanism for handling links
(which will follow the redirect and re-open the wallet).

Note that this is only an issue when using the wallet's internal QR reader directly,
not when using a generic QR reader app (which uses the usual browser mechanism to handle links).

Because of that issue, this is best used for *clickable payment links* embedded on webpages (where it works on all wallets),
and should be **avoided for QR codes**.

#### Method 2: BIP 70/72 Payment Request URI (*for QR codes*)

This method works by embedding the URL for a dynamically-generated BIP 70 payment request into the `bitcoin:` URI.

For example, the `bitcoin:` payment URI below will fetch the payment request from the server (including the current price)
if the wallet has payment protocol (BIP 70) support, or fall-back to the default fixed amount if not.

    bitcoin:1C5A2rTYQnbvLTLHXb4Xdmdbi6XUA8ipuj?amount=0.03012&r=https://bitcoinuri.herokuapp.com/1C5A2rTYQnbvLTLHXb4Xdmdbi6XUA8ipuj/30/USD

Unlike the redirect method, this works fine as a QR on all wallets,
but only BIP 70 enabled wallets will get the dynamic price (older wallets will get the default fallback value).

While this can work for clickable payment links too, the redirect method is preferable for that use-case
as it can provide dynamic prices to all wallets, not just BIP 70 enables ones.
This is best used for *payment QR codes*.

(Note that both methods use the exact same URL. The server differentiates the two
cases according to the `Accept` header being sent.
See [BIP 71](https://github.com/bitcoin/bips/blob/master/bip-0071.mediawiki) for more details.)

## Exchange rates

Exchange rates are pulled from BitcoinAverage using the `local` market.

See the full list of available currencies [here](https://apiv2.bitcoinaverage.com/constants/symbols/local).

## Why?

We wanted to have shekels-denominated prices on the QR codes we have on products
at the [Israeli Bitcoin emBassy](http://www.bitembassy.org/), instead of having to constantly update it manually
as the exchange rate changes.

<img src="http://www.bitembassy.org/wp-content/uploads/photo-gallery/IMG_8590.jpg" width="260" title='The sign in Hebrew reads: "donate 2 millibits and the snack is on us. fiat retail price: 100 shekels (~$25)" ;)'>
<img src="http://cryptopotato.com/wp-content/uploads/2016/07/EMBASSY_8275.jpg" width="280">

### :warning: **WARNING** :warning:

Using the hosted service (`bitcoinuri.herokuapp.com`) to receive payments means that anybody
controlling the server (including myself, heroku's employees and hackers) **can redirect your payments to themselves**
by returning a different bitcoin address than the one provided.

In addition, when using the redirect method, if the hosted service ever becomes unavailable then all payment URLs using it will cease working
(with the payment protocol method, it'll continue working but with the default fallback price).
This is hosted on Heroku's free tier and has no maintenance costs, and so is likely to continue running for the foreseeable future.

**Use at your own risk.** Preferably, *run this on your own servers:exclamation:*

### License

[WTFPL](http://www.wtfpl.net/txt/copying)

```
        DO WHAT THE FUCK YOU WANT TO PUBLIC LICENSE 
                    Version 2, December 2004 

            DO WHAT THE FUCK YOU WANT TO PUBLIC LICENSE 
   TERMS AND CONDITIONS FOR COPYING, DISTRIBUTION AND MODIFICATION 

  0. You just DO WHAT THE FUCK YOU WANT TO.
```
