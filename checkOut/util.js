let util = module.exports = {}


util.calcSubTotal = (arr) => {
  let subTotalReducer = (prev, product) => {
    let subTotal = product.price * product.quantity
    return prev + subTotal
  }

  let initialValue = 0
  let result = arr.reduce(subTotalReducer, initialValue)

  return Number(result.toFixed(2))
}

util.calcSubTotalWithDiscount = (arr) => {
  let subTotalReducer = (prev, product) => {
    let subTotal = product.price * product.quantity
    let discount = product.discount ? (1 - product.discount) : 1
    
    return prev + (subTotal * discount)
  }

  let initialValue = 0
  let result = arr.reduce(subTotalReducer, initialValue)

  return Number(result.toFixed(2))
}

util.checkTax = (currency) => {
  const tax = {
    AUD: 0.1,
    USD: 0,
    EUR: 0.05,
    CNY: 0
  }
  return tax[currency] ? tax[currency] : 0
}

util.checkShipping = (zone) => {
  const shipping = {
    A: 5,
    B: 10,
    C: 15,
    D: 25
  }
  return shipping[zone] ? shipping[zone]: 5
}

util.toCurrency = (num) => {
  return `$${num.toFixed(2)}`
}

util.toPercent = (num) => {
  return `${(num*100).toFixed(2)}%`
}