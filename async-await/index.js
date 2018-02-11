let axios = require('axios')

// Fetches the top 10 cryptocurrencies by market cap
let fetchList = () => {
  let url = "https://api.coinmarketcap.com/v1/ticker/?limit=10"
  return axios.get(url)
}

// Fetches coin snapshot data of a given ticker symbol
let fetchCoin = (ticker) => {
  let url = `https://www.cryptocompare.com/api/data/coinsnapshot/?fsym=${ticker}&tsym=USD`
  return axios.get(url)
}

// Best of readability and performance async await and Promise.all
let getTop3Coins = async () => {
  // Use async await to firstly fetch the full list of coins and then pick out the top 3
  let topCoins = await fetchList()
  let firstTicker = topCoins.data[0].symbol
  let secondTicker = topCoins.data[1].symbol
  let thirdTicker = topCoins.data[2].symbol

  // Use Promise.all to fetch coin data and when done destructure into variables
  let [first, second, third] = await Promise.all([
    fetchCoin(firstTicker), 
    fetchCoin(secondTicker), 
    fetchCoin(thirdTicker
  )])
  
  // Pluck out what is neeeded and return
  return {
    [firstTicker]: first.data.Data,
    [secondTicker]: second.data.Data,
    [thirdTicker]: third.data.Data
  }
}

let x = getTop3Coins()
x