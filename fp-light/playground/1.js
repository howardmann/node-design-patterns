// Exercise
// Calculate total checkout price for user and trigger payment API
// Reject checkout if there are items that are age restricted

// Helper dependeicies
let _ = require('lodash')
let R = require('ramda')
let pipe = require('lodash/fp/pipe')


let identity = o => o // default helper which returns the arg

const mergePromise = (promise, inner = identity, outer = identity) => o => {
  return promise(inner(o)) // calls promise with the relevant property from the objects arg (inner)
    .then(outer) // returns the property from the outer arg
    .then(result => Object.assign({}, result, o)) // returns a new object combining original object arg and result of promise
}

const merge = (fn, inner = identity) => o => {
  let result = fn(inner(o))
  return Object.assign({}, result, o)
}

let sideEffect = fn => a => {
  fn(a) // process side-effects with arg
  return a // pass the arg further
}

const rejectIfTrue = (fn, rejectValue) => d => {
  return fn(d) ? Promise.reject(rejectValue) : d
}

// Used from before in partial/1.js
let fetchUser = (name) => Promise.resolve({
  name: 'Howie',
  looks: 'handsome',
  id: '123',
  checkout: [
    {item: 'beer', price: 5.00, qty: 6, status: 'Age Restricted'},
    {item: 'whiskey', price: 5.00, qty: 3, status: 'Age Restricted'},
    {item: 'chips', price: 5.00, qty: 2}
  ]
})
let postAPI = (id, total) => Promise.resolve({
  status: 'ok',
  id,
  total
})
let fetchAge = (id) => Promise.resolve({
  age: 19,
  id: '123'
})

// Exercise
// Calculate total checkout price for user and trigger payment API
// Reject checkout if there are items that are age restricted 

let someRestricted = _.partialRight(_.some, {
  status: 'Age Restricted'
})
let underage = _.partialRight(_.lte, 18)

let failCheckout = ({checkout, age}) => {
  return someRestricted(checkout) && underage(age) ? true : false
}

let checkoutTotal = pipe(
  _.partialRight(_.map, o => o.qty * o.price),
  _.sum
)

let addTotal = pipe(
  merge(arr => ({total: checkoutTotal(arr)}), o => o.checkout)
)

fetchUser('howie')
  .then(sideEffect(o => console.log(`Fetched user id: ${o.id}`)))
  .then(mergePromise(fetchAge, o => o.id))
  .then(rejectIfTrue(failCheckout, 'Fail Checkout'))
  .then(merge(arr => ({total: checkoutTotal(arr)}), o => o.checkout))
  .then(o => mergePromise(_.partial(postAPI, o.id), o => o.total)(o))
  .then(sideEffect(o => console.log(`${o.name} checkout completed for $${o.total}`)))
  .catch(console.error)

