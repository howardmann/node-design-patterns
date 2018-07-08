let pipe = require('lodash/fp/pipe');
let _ = require('lodash');
let partial = _.partial;

// Exercise: transform shopping cart data to return total checkout price after 3% sales disc and 10% GST
// Get data from API endpoint and then return calculation
let data = [
  {price: 12.00, quantity: 1, item: 'Tooth Brush'},
  {price: 4.00, quantity: 2, item: 'Tooth Paste'},
  {price: 15.00, quantity: 2, item: 'Toilet Paper'},
  {price: 5.50, quantity: 4, item: 'Soap'},
  {price: 6.50, quantity: 1, item: 'Laundry Powder'}
]

// Fake promise
let fetchData = () => Promise.resolve(data)

// 1. Imperative approach
// Advantage easier to write but harder to read and test
let checkOut = function(){
  return fetchData().then(data => {
    let totalArr = data.map(item => item.price * item.quantity)
    let totalDiscArr = totalArr.map(item => item * 0.97)
    let totalTaxArr = totalDiscArr.map(item => item * 1.1)
    let sumTotal = totalTaxArr.reduce(function (sum, item) {
      return sum += item
    }, 0)
    return sumTotal
  })
} 

checkOut() // 83.7595

// 2. Functional
// More verbose but easier to test and read over time
let map = (fn, arr) => arr.map(fn)
let subTotal = (item) => item.price * item.quantity
let multiply = (x, y) => x * y
let sum = (arr) => arr.reduce(function(tally, el){return tally += el}, 0)

// Compose a calcTotal function using pipe which expects an array and then executes from left to right
let calcTotal = pipe(
  partial(map, subTotal),
  partial(map, partial(multiply, 0.97)),
  partial(map, partial(multiply, 1.1)),
  sum
)

let checkOutFP = (arr) => fetchData().then(calcTotal)
checkOutFP() // 83.7595

// Same as above but extra step of spelling out the partial functions
let mapSubTotal = partial(map, subTotal)
let mapDiscount = partial(map, partial(multiply, 0.97))
let mapTax = partial(map, partial(multiply, 1.1))

let calcTotalVerbose = pipe(
  mapSubTotal,
  mapDiscount,
  mapTax,
  sum
)

let checkOutVerbose = (arr) => fetchData().then(calcTotalVerbose)
checkOutVerbose() // 83.7595
