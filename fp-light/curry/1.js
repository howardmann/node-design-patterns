// #Currying is a special form of partial application where the arity is reduced to 1, with a chain of successive chained
// function calls, each which takes one argument.Once all arguments have been specified by these
// function calls, the original
// function is executed with all the collected arguments
// You can use chaining with curry

// Custom fetch
let request = require('request')
let fetch = (url) => {
  return new Promise((resolve, reject) => {
    request(url, function (err, resp, body) {
      if (err) {
        reject(err)
      }
      resolve(JSON.parse(body))
    })
  })
}

// arity means how many args it can take
// Curry partial util
let curry = function (fn, arity = fn.length) {
  return (function nextCurried(prevArgs) {
    return function curried(nextArg) {
      var args = [...prevArgs, nextArg];

      if (args.length >= arity) {
        return fn(...args);
      } else {
        return nextCurried(args);
      }
    };
  })([]);
}

// Example 1: Curry the ticker
let getTickerPrices = (ticker, compareArr) => {
  let currencyArr = compareArr.join(',')
  let url = `https://min-api.cryptocompare.com/data/price?fsym=${ticker}&tsyms=${ticker},${currencyArr}`
  return fetch(url)
}

curry(getTickerPrices)('ETH')(['USD', 'AUD']) // { ETH: 1, USD: 502.78, AUD: 677.9 }​​​​​

// Example 2: Specify the arity required before executing

// Start with a simple sum function which takes individual args [contrived example]
let sum = function (...nums) {
  let numArr = [...nums]
  return numArr.reduce((el, tally) => {
    return el + tally
  },0)
}

// Creat a curry function which only takes 5 args before executing
let currySumFive = curry(sum, 5)
currySumFive(1)(2)(3)(4) // Returns a function, doesn't meet the 5 arg arity
currySumFive(1)(2)(3)(4)(5) // 15

// This is how this function would look if we wrote it out by hand (albeit using ES6)
// Eg. a partial function which prefills the final fn until it reaches 5 args
let sumFive = (v1) => 
  v2 => 
    v3 =>
      v4 => 
        v5 => sum(v1, v2, v3, v4, v5)

sumFive(1)(2)(3)(4)(5) // 15

