// Example 1 - trasform array to object by property name

let usersArr = [
  {name: 'howie', age: 21, sex: 'M'},
  {name: 'hela', age: 22, sex: 'F'},
  {name: 'felix', age: 3, sex: 'M'}
]

let keyByUserNameReducer = (prev, user) => {
  return {...prev, [user.name]: user}
}

let users = usersArr.reduce(keyByUserNameReducer, {}) //?
//  {
//    howie: {
//      name: 'howie',
//      age: 21,
//      sex: 'M'
//    },
//    hela: {
//      name: 'hela',
//      age: 22,
//      sex: 'F'
//    },
//    felix: {
//      name: 'felix',
//      age: 3,
//      sex: 'M'
//    }
//  }

// Example 2 - transform array to object and tally by property name
let fruitsArr = [
  'apple',
  'banana',
  'apple',
  'apple',
  'pear',
  'banana',
  'pineapple'
]

let tallyFruitByNameReducer = (prev, fruit) => {
  let tally = {
    [fruit]: prev[fruit] ? prev[fruit] += 1 : 1
  }
  return {...prev, ...tally}
}

let fruitsTally = fruitsArr.reduce(tallyFruitByNameReducer, {}) //?
// {
//   apple: 3,
//   banana: 2,
//   pear: 1,
//   pineapple: 1
// }