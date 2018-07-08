let coin = module.exports = {}

// Dependencies
let get = require('lodash/get');
let axios = require('axios');
let values = require('lodash/values');

coin.getPrices = (request = axios) => {
  let url = "https://api.coinmarketcap.com/v1/ticker/?limit=30"
  return request.get(url)
}

coin.parseSingleTicker = (obj) => {
  let {
    symbol,
    price_usd,
    market_cap_usd,
    percent_change_24h,
    percent_change_7d
  } = obj
  return {
    ticker: symbol,
    currency: "USD",
    price: Number(price_usd),
    mktcap: Number(market_cap_usd),
    changePctDay: Number(percent_change_24h) / 100,
    changePctWeek: Number(percent_change_7d) / 100
  }
}

coin.parseTickers = (data) => {
  let transformed = data.map(ticker => coin.parseSingleTicker(ticker))
  let transformedSorted = transformed.sort((a, b) => b.mktcap - a.mktcap)
  return transformedSorted
}

coin.fetchTickers = (request = axios) => {
  return new Promise((resolve, reject) => {
    coin.getPrices(request)
      .then(payload => {
        let data = payload.data
        let result = coin.parseTickers(data)
        resolve(result)
      })
      .catch(err => {
        reject(err)
      })
  })
}

// Use case
// coin.fetchTickers().then(data => {
//   data
// })