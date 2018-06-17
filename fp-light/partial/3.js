// From getify FP light https://github.com/getify/Functional-Light-JS/blob/master/manuscript/ch3.md/#chapter-3-managing-function-inputs
// #Partial application is a technique
// for reducing the arity(that is, the expected number of arguments to a
//   function) by creating a new function where some of the arguments are preset.

let request = require('request')

// Custom fetch
let fetch = (url) => {
  return new Promise((resolve, reject) => {
    request(url, function (err, resp, body) {
      if (err) { reject(err) }
      resolve(JSON.parse(body))
    })
  })
}

// Custom fetcher which returns ticker and currency pairs
let getTickerPrices = (ticker, compareArr) => {
  let currencyArr = compareArr.join(',')
  let url = `https://min-api.cryptocompare.com/data/price?fsym=${ticker}&tsyms=${ticker},${currencyArr}`
  return fetch(url)
}

// Using a partial util
let partial = function (fn, ...presetArgs) {
  return function partiallyApplied(...laterArgs) {
    return fn(...presetArgs, ...laterArgs);
  };
}

// 1. Use a partial to prefil ticker
let getETHPrices = partial(getTickerPrices, 'ETH')

getETHPrices(['BTC', 'USD', 'AUD', 'EUR']) // { ETH: 1, BTC: 0.07713, USD: 502.87, AUD: 678.08, EUR: 432.63 }​​​​​

// Using a partial right util (same as partial but to the right)
function partialRight(fn, ...presetArgs) {
  return function partiallyApplied(...laterArgs) {
    return fn(...laterArgs, ...presetArgs);
  };
}

// 2. Use a partial Right to prefil currency pairs
let getMajorCurrencies = partialRight(getTickerPrices, ['USD','EUR','AUD'])
getMajorCurrencies('ETH') // { ETH: 1, BTC: 0.07726, USD: 502.87, AUD: 679.22, EUR: 432.7 }​​​​​
