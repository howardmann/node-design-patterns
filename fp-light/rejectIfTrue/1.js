// ## RejectIfTrue: Promise reject if function is true
// Prepopulates function and rejectValue awaiting argument
// If function returns true given the arg then reject the promise with the given rejectValue error msg

const rejectIfTrue = (fn, rejectValue) => d => {
  return fn(d) ? Promise.reject(rejectValue) : d
}

// Dependency
let _ = require('lodash')

// Used from before in partial/1.js
let fetchAll = () => Promise.resolve({
  name: 'Howie',
  looks: 'handsome',
  id: '123'
})
let postAPI = (id) => Promise.resolve({
  status: 'ok',
  id: '123'
})
let fetchAge = (id) => Promise.resolve({
  age: 15,
  id: '123'
})


fetchAll()
  .then(_.partialRight(_.pick, ['id', 'name']))
  .then(o => fetchAge(o.id))
  .then(rejectIfTrue(o => o.age < 18, 'You are underage'))
  .then(o => postAPI(o.id))
  .then(console.log) // Will log success message if overage
  .catch(console.error) // Will catch and throw error msg if underage
