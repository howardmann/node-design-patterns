import R from 'ramda';

let data = [
  { university: true, salary: 300, age: 42, gender: 'male', visaId: 'abc2132' },
  { university: true, salary: 200, age: 35, gender: 'female' },
  { university: true, salary: 80, age: 34, gender: 'male', visaId: '42213asdd' },
  { university: true, salary: 300, age: 23, gender: 'female' },
  { university: true, salary: 250, age: 52, gender: 'female' },
  { university: true, salary: 100, age: 31, gender: 'female' },
  { university: true, salary: 200, age: 45, gender: 'male' },
  { university: false, salary: 70, age: 18, gender: 'male', visaId: 'asdajsd1223' },
  { university: false, salary: 50, age: 21, gender: 'male' },
  { university: true, salary: 30, age: 43, gender: 'female' }
]


// 1. Imperative
let getMaleGraduateSalaries1 = (data) => {
  let filtered = data.filter(el => el.university && el.gender === 'male' && el.visaId)
  let salaries =  filtered.map(el => el.salary) 
  return salaries
}

let a = getMaleGraduateSalaries1(data)
a // [ 300, 80 ]

// 2. Declarative using ramda
// Note: may be longer but it is easier to read and reason
let getMaleGraduateSalaries2 = R.pipe(
  R.filter(R.propEq('university', true)),
  R.filter(R.propEq('gender', 'male')),
  R.filter(R.has('visaId')),
  R.map(R.prop('salary'))
)

let b = getMaleGraduateSalaries2(data)
b // [ 300, 80 ]

// 3. Declarative without ramda, roll our own helpers
let prop = (key) => 
  object => object[key]

let propEq = (key, val) => 
  object => object[key] === val ? true : false

let has = (key) => 
  object => key in object

let filter = (predicate) => 
  arr => arr.filter(predicate)

let map = (fn) =>
  arr => arr.map(fn)

let pipe = function() {
  var args = [].slice.call(arguments)
  return function(x){
    var result = x
    args.forEach(f => {
      result = f(result)
    })
    return result
  }
}

let getMaleGraduateSalaries3 = pipe(
  filter(propEq('university', true)),
  filter(propEq('gender', 'male')),
  filter(has('visaId')),
  map(prop('salary'))
)

let c = getMaleGraduateSalaries3(data)
c // [ 300, 80 ]
