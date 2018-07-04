let pipe = require('lodash/fp/pipe');
let _ = require('lodash');

// Task 1: sum all even numbers and then square it
let data = [1, 2, 3, 4, 5, 10, 11, 12]

// Imperative approach
let sumEvenSquared = function(arr) {
  let evenArr = arr.filter(el => el % 2 === 0)
  let sumEvens = evenArr.reduce(function(tally, num){
    return tally += num
  }, 0)
  return sumEvens * sumEvens
} 
sumEvenSquared(data) // 784

// Functional using pipe (reverse of compose)
let isEven = (arr) => arr.filter(el => el % 2 === 0)
let square = (num) => num * num
let sum = (arr) => arr.reduce(function(tally, el){return tally += el, 0})

let fpSumEvenSquared = pipe(
  isEven,
  sum,
  square
)
fpSumEvenSquared(data) // 784


// Task 2: zapier like task. Take payload and change into new format
let payload = {
  code: 'AU',
  filename: 'Test_File_Name.pdf'
}
// let output = {
//   country: 'Australia',
//   link: 'https://www.internal.com/Test_File_Name.pdf'
// }

// Imperative approach
let zapier = (obj) => {
  let {code, filename} = obj
  let link = `https://www.internal.com/${filename}`
  let country;
  if (code === 'AU') {
    country = 'Australia'
  } 
  if (code === 'US') {
    country = 'United States'
  } 
  if (code === 'UK') {
    country = 'United Kingdom'
  }
  return {
    country,
    link
  }  
}

zapier(payload)
// {
//   country: 'Australia',
//   link: 'https://www.internal.com/Test_File_Name.pdf'
// }


// Functional approach
let getFile = _.partialRight(_.get,'filename')
let returnLink = filename => `https://www.internal.com/${filename}`

let transformLink = obj => {
  return Object.assign({...obj}, {
    link: pipe(getFile, returnLink)(obj)
  })
}

const COUNTRY_CODES = {
  'AU': 'Australia',
  'US': 'United States',
  'UK': 'United Kingdom'
}

let transformCountry = obj => {
  return Object.assign({...obj}, {
    country: COUNTRY_CODES[obj.code]
  })
}

let fpZapier = pipe(
  transformLink,
  transformCountry,
  _.partialRight(_.pick, ['country', 'link'])
)

fpZapier(payload)
// {
//   country: 'Australia',
//   link: 'https://www.internal.com/Test_File_Name.pdf'
// }
