// Another compose example combined with partials

// Example dataset problem
// Find the total visits and signups to all pages that contain the url matching word magic
// Calculate the average signup converison rate for the above
let data = [
  {
    site: 'abc.com/magic/apple',
    visits: 1000,
    signups: 30
  },
  {
    site: 'abc.com/magic/banana',
    visits: 3000,
    signups: 40
  },
  {
    site: 'abc.com/',
    visits: 10000,
    signups: 500
  },
  {
    site: 'abc.com/about',
    visits: 20000,
    signups: 30
  },
  {
    site: 'abc.com/contact',
    visits: 20000,
    signups: 100
  },
  {
    site: 'abc.com/magic/pear',
    visits: 500,
    signups: 20
  },
  {
    site: 'abc.com/magic/pineapple',
    visits: 1500,
    signups: 200
  }
]

// Break the problem down into single utility functions first. We use the following 3 utils
// Matches a string against a regex word. Returns boolean
let checkRe = (text, word) => {
  return new RegExp(word).test(text)
}

// Filters an array of objects based on a property and boolean function
let filter = (arr, prop, fn) => {
  return arr.filter(el => fn(el[prop]))
}

// Sums total values of an object property in an array
let sum = (arr, prop) => {
  return arr.reduce((tally, el) => {
    return el[prop] + tally
  }, 0)
}

// Create a new funciton which utilizes the util functions above to compose a larger function
// Use our compose helper with partial to setout the order and method we want the data to be executed
// E.g. 1) we first want to filter the data by the site property for all regex patterns matching the given urlMatch param
// 2) Then we sum the result of filtered array objects based on the given prop
// By using compose this then returns a function waiting for the data array to begin its work
let totalURLByPropCalculator = (urlMatch, prop) => {
  return compose(
    partialRight(sum, prop),
    partialRight(filter, 'site', partialRight(checkRe, urlMatch))
  )
}
// Use partial to prefill the above helper with the magic keyword
let totalMagicByProp = partial(totalURLByPropCalculator, 'magic')
// [NOTE] Equivalent to
// let totalMagicByProp = prop => totalURLByPropCalculator('magic', prop)

// Add the final arg and then execute the function by passing the data array of objects
let totalMagicSignups = totalMagicByProp('signups')(data) // 290
let totalMagicVisits = totalMagicByProp('visits')(data) // 6000

// Voila we get our answer
let answer = totalMagicSignups / totalMagicVisits // 0.04833

// compose util
function compose(...fns) {
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

// Using a partial right util (same as partial but to the right)
function partialRight(fn, ...presetArgs) {
  return function partiallyApplied(...laterArgs) {
    return fn(...laterArgs, ...presetArgs);
  };
}

// Using a partial which allows us to pre-fill arguments for the fn we want to use from the left
function partial (fn, ...presetArgs) {
  return function partiallyApplied(...laterArgs) {
    return fn(...presetArgs, ...laterArgs);
  };
}
