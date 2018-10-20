import R from 'ramda';

let data = [
  { university: true, salary: 300, age: 42, gender: 'male' },
  { university: true, salary: 200, age: 35, gender: 'female' },
  { university: false, salary: 80, age: 34, gender: 'male' },
  { university: true, salary: 300, age: 23, gender: 'female' },
  { university: true, salary: 250, age: 52, gender: 'female' },
  { university: true, salary: 100, age: 31, gender: 'female' },
  { university: true, salary: 200, age: 45, gender: 'male' },
  { university: true, salary: 70, age: 18, gender: 'male' },
  { university: false, salary: 50, age: 21, gender: 'male' },
  { university: true, salary: 30, age: 43, gender: 'female' }
]

// Helpers without using Ramda
// Alternatives for Ramda are R.propEq and R.prop
let propEq = (prop, value) =>
  o => o[prop] === value ? true : false

let prop = (prop) =>
  o => o[prop]

// Calc average salary of male university graduates
let average = (arr) => arr.reduce((sum, tally) => sum + tally, 0) / arr.length

let calcAvg = (gender) =>
  R.pipe(
    R.filter(propEq('university', true)),
    R.filter(propEq('gender', gender)),
    R.map(prop('salary')),
    average
  )

let calcMaleAvg = calcAvg('male')
let calcFemaleAvg = calcAvg('female')

let maleAvg = calcMaleAvg(data)
maleAvg // 190

let femaleAvg = calcFemaleAvg(data)
femaleAvg // 176

