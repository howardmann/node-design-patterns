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

let getPartial = function(api) {
  return function(endpoint) {
    return function(param) {
      let baseURL = `${api}/${endpoint}`
      let url = param ? `${baseURL}/${param}` : baseURL      
      return axios.get(url)
    }
  }
}

var getCoinAPI = getPartial('https://api.coinmarketcap.com/v2')
var getAll = getCoinAPI('ticker/?limit=10')
var getGlobal = getCoinAPI('global')
var getTicker = getCoinAPI('ticker')

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