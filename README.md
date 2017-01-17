# bitcoinuri

Create bitcoin URIs with fiat-denominated amounts that are dynamically adjusted according
to the current exchange rates.

### Running the server

```bash
$ git clone git@github.com:shesek/bitcoinuri.git && cd bitcoinuri

$ PORT=3000 npm start
```

### Using the server

There's a live version of this app running at https://bitcoinuri.herokuapp.com/.

Example URIs:

- https://bitcoinuri.herokuapp.com/1EoNrcZmCpZK1Zzpo5Yey9dvtFQk8t9aiU?amount=100&currency=USD

- https://bitcoinuri.herokuapp.com/1EoNrcZmCpZK1Zzpo5Yey9dvtFQk8t9aiU?amount=150&currency=EUR

- https://bitcoinuri.herokuapp.com/1EoNrcZmCpZK1Zzpo5Yey9dvtFQk8t9aiU?amount=150&currency=EUR&label=order99219


### Exchange rates

Exchange rates are pulled from BitcoinAverage using the `local` market.

See the full list of available currencies [here](https://apiv2.bitcoinaverage.com/constants/symbols/local).

### **WARNING**

Using the hosted service (`bitcoinuri.herokuapp.com`) to receive payments means that anybody
controlling the server (including myself, heroku's employees and hackers) **can steal your money**
by redirecting to a different bitcoin address than the one provided.

In addition, if this service ever becomes unavailable in the future, all payment URIs using it will break.
This is hosted on Heroku's free tier, and so expected to continue working as long as Heroku
is (or until they change their pricing model).

**Use at your own risk.** Preferably, *run this your own server*s.

### License

[WTFPL](http://www.wtfpl.net/txt/copying)

```
        DO WHAT THE FUCK YOU WANT TO PUBLIC LICENSE 
                    Version 2, December 2004 

            DO WHAT THE FUCK YOU WANT TO PUBLIC LICENSE 
   TERMS AND CONDITIONS FOR COPYING, DISTRIBUTION AND MODIFICATION 

  0. You just DO WHAT THE FUCK YOU WANT TO.
```
