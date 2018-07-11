// ## SIDEEFFECT: Calls the function with arg and returns the original arg
// This is helpful when using promises and wanting to call a sideffect but then 
// pass the original result further down the chain

let sideEffect = fn => a => {
  fn(a) // process side-effects with arg
  return a // pass the arg further
}

let fetchAll = () => Promise.resolve({name: 'Howie', looks: 'handsome', id: '123'})
let postAPI = (id) => Promise.resolve({status: 'ok', id:'123'})
let fetchAge = (id) => Promise.resolve({age: 18, id:'123'})

// 1. Before using helper
// Problems. not clear where side effects are occuring
fetchAll()
  .then(result => {
    // There are 2 side effects here but its not clear
    console.log(`Name returned: ${result.name}`)
    return postAPI(result.id)
  })
  .then(result => {    
    let id = result.id
    return fetchAge(id)
  })
  .then(result => {
    console.log(`Age is: ${result.age}`);
  })

// 2. Using helper
// Clearer where sideffects are occuring
fetchAll()
  .then(sideEffect(o => console.log(`Name returned: ${o.name}`)))
  .then(sideEffect(o => postAPI(o.id)))
  .then(o => fetchAge(o.id))
  .then(o => console.log(`Age is: ${o.age}`))
