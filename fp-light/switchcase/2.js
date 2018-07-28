// FP helper (same as 1.js last example but creating a util)
let switchCase = cases => defaultCase => code =>
    cases.hasOwnProperty(code) ? cases[code] : defaultCase

const cases = {
  'AU': 'Australia',
  'US': 'United States',
  'UK': 'United Kingdom',
  'CN': 'China',
  'NZ': 'New Zealand'
}

const defaultCase = 'Unknown'

let pickCountry = switchCase(cases)(defaultCase)

// Using rambda cond function
// Takes an array of [predicate, transformer] function pairs
let R = require('ramda')

let pickCountryR = R.cond([
  [R.equals('AU'), R.always('Australia')],
  [R.equals('US'), R.always('United States')],
  [R.equals('UK'), R.always('United Kingdom')],
  [R.equals('CN'), R.always('China')],
  [R.equals('NZ'), () => 'New Zealand'],
  [R.is(String), () => 'Unknown']
])

// Advantage of using ramda cond is the ability to transform based on the arg

let echoCountry = R.cond([
  [R.equals('AU'), (d) => `${d} stands for Straya`], 
  [R.equals('US'), (d) => `${d}A ${d}A ${d}A`],
  [R.equals('UK'), (d) => `FC${d}`],
  [R.equals('CN'), R.always('China')], 
  [R.equals('NZ'), () => 'New Zealand'], 
  [R.is(String), () => 'Unknown']
])

echoCountry('AU') // AU stands for Straya
echoCountry('US') // USA USA USA
echoCountry('UK') // FCUK
