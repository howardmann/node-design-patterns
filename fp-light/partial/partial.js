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

compareETH('BTC,USD,EUR,AUD').then(resp => {
  let data = resp.data
  return data  
})

compareLTC('BTC,USD,EUR,AUD').then(resp => {
  let data = resp.data
  return data  
})

