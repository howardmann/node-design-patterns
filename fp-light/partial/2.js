let axios = require('axios')

// Basic wrapper around ajax requestModule
let fetchURL = (requestModule, url) => {
  return new Promise((resolve, reject) => {
    requestModule.get(url).then(resp => {
      resolve(resp.data)
    })
    .catch(err => reject(err))
  })
}

// Need to inject twice which is bad
fetchURL(axios, 'https://api.coinmarketcap.com/v2/ticker/?limit=10')
  .then(resp => {
    let data = resp
    return data
  })

fetchURL(axios, 'https://api.coinmarketcap.com/v2/ticker/?limit=20')
  .then(resp => {
    let data = resp
    return data
  })


// Using a partial which allows us to pre-fill arguments for the fn we want to use
let partial = function(fn, ...presetArgs) {
  return function partiallyApplied(...laterArgs) {
    return fn(...presetArgs, ...laterArgs);
  };
}

// Prefill our fetchURL by injecting with axios dependency
// This is basically dependency injection
let getURL = partial(fetchURL, axios)

getURL('https://api.coinmarketcap.com/v2/ticker/?limit=10')
  .then(resp => {
    let data = resp
    return data
  })

getURL('https://api.coinmarketcap.com/v2/ticker/?limit=20')
  .then(resp => {
    let data = resp
    return data
  })


// ES6 has another elegant way to perform dependency injection using default params
// The difference here is we put the external dependency as the final args and reference it when testing
// In production code we leave it off and let it refer to the default param
let fetchURL_ES6 = (url, requestModule = axios) => {
  return new Promise((resolve, reject) => {
    requestModule.get(url).then(resp => {
        resolve(resp.data)
      })
      .catch(err => reject(err))
  })
}

// I prefer this approach as its cleaner and testable with dependency injection
fetchURL_ES6('https://api.coinmarketcap.com/v2/ticker/?limit=10')
  .then(resp => {
    let data = resp
    return data
  })
