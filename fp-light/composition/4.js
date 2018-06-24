// Expanding on 3.js we will write a utility to compose 2 or more functions
let compose = function(...fns) {
  return function composed(result) {
    // copy the array of functions
    var list = [...fns];

    while (list.length > 0) {
      // take the last function off the end of the list
      // and execute it
      result = list.pop()(result);
    }

    return result;
  };
}

// Using example from 2.js to compose more than 2 functions
let data = [
  {success: true, seats: 100},
  {success: false, seats: 30},
  {success: false, seats: 20},
  {success: false, seats: 30},
  {success: true, seats: 80},
  {success: false, seats: 20},
  {success: true, seats: 10},
  {success: false, seats: 30}
]

// We will break this task into three smaller functions
let filterSuccess = (arr, boolean = true) => {
  return arr.filter( el => boolean ? el.success : !el.success)
}

let getProperty = (arr, prop) => {
  return arr.map( el => el[prop])
}

let sum = (arr) => {
  return arr.reduce((tally, el) => {
    return tally + el
  }, 0)
}

// 1. We will compose the three functions above to create a single function
// BONUS: we will be using our partialRight function to pre-fill our getProperty and filterSuccess functions
let totalNonSuccess = compose(
  sum, 
  partialRight(getProperty, 'seats'), 
  partialRight(filterSuccess, false)
)

let total = totalNonSuccess(data)
total

// Under the hood
let totalNonSuccess2 = (arr) => {
  return sum(getProperty(filterSuccess(arr, false), 'seats'))
}
let total2 = totalNonSuccess2(data)
total2 //130


// Using a partial right util (same as partial but to the right)
function partialRight(fn, ...presetArgs) {
  return function partiallyApplied(...laterArgs) {
    return fn(...laterArgs, ...presetArgs);
  };
}


// 2. Doing same as one but using function instead of partial, the benefit of using partials is you can do it inline and compose
// Optional to you what is easier to read. 
// I see the real benefit of using partials here because it shows true lego blocks and less room for error or wrapping
let getSeats = (arr) => getProperty(arr, 'seats')
let filterNonSuccess = (arr) => filterSuccess(arr, false)
let totalNonSuccess3 = compose(
  sum,
  getSeats,
  filterNonSuccess
)
let total3 = totalNonSuccess3(data)
total3 // 130