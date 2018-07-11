// ## MERGE: Calls a promise and returns new Object combining promise result and original arg
// Helpful when passing results from previous calls down the line
// Think of a tumbleweed or snowball effect down a zapier pipe

let identity = o => o // default helper which returns the arg

const merge = (promise, inner = identity, outer = identity) => o => {
  return promise(inner(o)) // calls promise with the relevant property from the objects arg (inner)
    .then(outer) // returns the property from the outer arg
    .then(result => Object.assign({}, result, o)) // returns a new object combining original object arg and result of promise
}

// Used from before in partial/1.js
let sideEffect = fn => a => {
  fn(a) // process side-effects with arg
  return a // pass the arg further
}

// Used from before in partial/1.js
let fetchAll = () => Promise.resolve({
  name: 'Howie',
  looks: 'handsome',
  id: '123'
})
let postAPI = (id) => Promise.resolve({
  status: 'ok',
  id: 'secret'
})
let fetchAge = (id) => Promise.resolve({
  age: 18,
  id: '123'
})

// 1. Imperative method: Before using merge helper
// Similar to partial/1.js except now we want to pass on existing object to each subsequent call (like a snowball)
fetchAll()
  .then(result => {
    // There are 2 side effects here but its not clear
    console.log(`Name returned: ${result.name}`)
    return postAPI(result.id)
      .then(resp => {
        console.log(resp);
        return Object.assign({}, resp, result)
      })
  })
  .then(result => {
    let id = result.id
    return fetchAge(id).then(resp => {
      return Object.assign({}, result, resp)
    })
  })
  .then(result => {
    console.log(`Age is: ${result.age}, name is ${result.name} and looks ${result.looks}`);
    // ​​​​​Age is: 18, name is Howie and looks handsome​​​​​
  })

// 2. Declarative method: Using merge helper
// Makes it clearer when we say merge we are snowballing a promise return with the previous object
// Using sideffects here as well makes it clear what we are doing

fetchAll()
  .then(sideEffect(o => console.log(`Name returned: ${o.name}`)))
  .then(merge(postAPI, o => o.id))
  .then(sideEffect(({status, id}) => console.log({status, id})))
  .then(merge(fetchAge))
  .then(result => {
    console.log(`Age is: ${result.age}, name is ${result.name} and looks ${result.looks}`)
    // ​​​​​Age is: 18, name is Howie and looks handsome​​​​​
  })
