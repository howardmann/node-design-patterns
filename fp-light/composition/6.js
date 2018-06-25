// Imperative vs declarative with composition

// Problem: Compare average male vs female salary over age 30 with university degree
let data = [
  {university: true, salary: 300, age: 42, gender: 'male'},
  {university: true, salary: 200, age: 35, gender: 'female'},
  {university: false, salary: 80, age: 34, gender: 'male'},
  {university: true, salary: 300, age: 23, gender: 'female'},
  {university: true, salary: 250, age: 52, gender: 'female'},
  {university: true, salary: 100, age: 31, gender: 'female'},
  {university: true, salary: 200, age: 45, gender: 'male'},
  {university: true, salary: 70, age: 18, gender: 'male'},
  {university: false, salary: 50, age: 21, gender: 'male'},
  {university: true, salary: 100, age: 43, gender: 'female'}
]

// 1. Imperative style
let calcAvgSalary = (data, gender, age) => {
  let filterGender = data.filter(el => el.gender === gender)
  let overAge = filterGender.filter(el => el.age > age)
  let salaryArr = overAge.map(el => el.salary)
  let totalSalary = salaryArr.reduce((tally, el) => {
    return tally + el
  }, 0)
  let averageSalary = totalSalary / salaryArr.length
  return averageSalary.toFixed(0)
}

let maleAvg = calcAvgSalary(data, 'male', 30) // 193
let femaleAvg = calcAvgSalary(data, 'female', 30) // 163

// 2. Declarative style
// filterGender --> filterOverAge --> map salary --> sum Salary --> average Salary --> toFix
// More lines of code but easier to see how the function is composed and data gets piped through and transformed

// We create two helper functions using compose to first extract the property
// and then check it against a predicate function
// We are wrapping into around another function because we want to reuse for different genders and ages
let isGender = (gender) => {
  return compose(
    partial(isEqual, gender),
    partial(prop, 'gender')
  )
}
let isOlder = (age) => {
  return compose(
    partialRight(isGreaterThan, age),
    partial(prop, 'age')
  )
}

// Here we have our big compose function which initially to takes an age and gender to create a function
// It then awaits an array to perform the compose steps
// filterGender --> filterOverAge --> map salary --> sum Salary --> average Salary --> toFix
let calcAvgSalary2 = (age, gender) => {
  return compose(
    partial(toFixed,0),
    average,
    partialRight(map, 'salary'),
    partial(filter, isOlder(age)),
    partial(filter, isGender(gender))
  )
} 
let calcSalaryOver30 = partial(calcAvgSalary2, 30)
let maleAvg2 = calcSalaryOver30('male')(data) // 193
let femaleAvg2 = calcSalaryOver30('female')(data) // 163


// Utility functions
function toFixed(dec, num){
  return num.toFixed(dec)
}
function isEqual(a, b){
  return a === b
}
function isGreaterThan(a, b){
  return a > b
} 
function prop(name, obj) {
  return obj[name];
}
function average(arr){
  return arr.reduce(((a, b) => a + b)) / arr.length
} 

function filter(fn, arr) {
  return arr.filter(el => fn(el))
}

function map(arr, prop) {
  return arr.map(el => el[prop])
}

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

function partialRight(fn, ...presetArgs) {
  return function partiallyApplied(...laterArgs) {
    return fn(...laterArgs, ...presetArgs);
  };
}

function partial(fn, ...presetArgs) {
  return function partiallyApplied(...laterArgs) {
    return fn(...presetArgs, ...laterArgs);
  };
}

function sum(arr, prop) {
  return arr.reduce((tally, el) => {
    return el[prop] + tally
  }, 0)
}
