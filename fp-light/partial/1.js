let axios = require('axios')

// Original
let fetchAll = () => {
  return axios.get('https://api.coinmarketcap.com/v2/ticker/?limit=10')
}

let fetchGlobal = () => {
  return axios.get(`https://api.coinmarketcap.com/v2/global`)
}

let fetchTicker = (id) => {
  return axios.get(`https://api.coinmarketcap.com/v2/ticker/${id}`)
}


// Using partial
let makeGetPartial = function(api) {
  return function endpointPartial(endpoint) {
    return function finalPartial(param) {
      let baseURL = `${api}/${endpoint}`
      let url = param ? `${baseURL}${param}` : baseURL
      return axios.get(url)
    }
  }
}

var makeCoinAPI = makeGetPartial('https://api.coinmarketcap.com/v2')
var getAll = makeCoinAPI('ticker/?limit=10')
var getGlobal = makeCoinAPI('global')
var getTicker = makeCoinAPI('ticker/')

getAll().then(resp => {
  let data = resp.data.data
  return data
})

getGlobal().then(resp => {
  let data = resp.data.data
  return data
})

getTicker(3).then(resp => {
  let data = resp.data.data
  return data
})

var makeCryptoAPI = makeGetPartial('https://min-api.cryptocompare.com/data')
var compareETH = makeCryptoAPI('price?fsym=ETH&tsyms=')
var compareLTC = makeCryptoAPI('price?fsym=LTC&tsyms=')
var compareETHFull = makeCryptoAPI('pricemultifull?fsyms=ETH&tsyms=')

compareETH('BTC,USD,EUR,AUD').then(resp => {
  let data = resp.data
  return data  
})

compareLTC('BTC,USD,EUR,AUD').then(resp => {
  let data = resp.data
  return data  
})

compareETHFull('BTC,USD,EUR,AUD').then(resp => {
  let data = resp.data
  return data  
})

let compareETHFullClean = function(tickerArr) {
  let pairs = tickerArr.join(',')
  return new Promise (resolve => {
    compareETHFull(pairs).then(resp => {
      let result = resp.data.DISPLAY.ETH
      resolve(result)
    })
  })
}

compareETHFullClean(['BTC','USD','EUR','AUD']).then(resp => {
  let data = resp
  return data
})

// Or same thing as above but using constructor function
let MakeGetPartial = function (api) {
  this.domain = api
  this.buildEndpoint = (endpoint) => {
    return param => {
      let baseURL = `${this.domain}/${endpoint}`
      let url = param ? `${baseURL}${param}` : baseURL
      return axios.get(url)
    }
  }
}

var coinAPI = new MakeGetPartial('https://api.coinmarketcap.com/v2')
var getCoins = coinAPI.buildEndpoint('ticker/?limit=10')
var getCoinTicker = coinAPI.buildEndpoint('ticker/')

getCoins().then(resp => {
  let data = resp.data
  return data
})

getCoinTicker(1).then(resp => {
  let data = resp.data
  return data
})
