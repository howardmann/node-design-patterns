// Same as example as #1 calculator but using functional composition
// Separate out methods into separate functions that return method objects
// Advantage of this is it creates reusable functions that other constructors can use

let makeAdder = () => {
  return {
    add: (a,b) => a + b
  }
}

// sugar syntax using ({}) to return an object
let makeSubtract = () => ({
  subtract: (a,b) => a - b
})


let Calculator = function () {
  // Save any state into a state object (convention)
  let state = {
    cache: null
  }

  // Separate method for anything affecting state, returns a new object method with public method of `save`
  let makeStateSetter = () => ({
    save: (num) => state.cache = num
  })

  // Publically exposed object with methods attaching to initial state object
  return Object.assign(state,
    makeStateSetter(),
    makeAdder(),
    makeSubtract()
  )
}

let calc = new Calculator()
let result = calc.add(1,2) // 3
calc.save(result)
let p = calc.cache // 3

// Example where we can reuse the adder function in a separate piece of logic
let Cashier = function(){
  let state = {
    total: null,
    tax: 1.1
  }
  let makeStateSetter = () => ({
    checkOut: (num) => state.total = num * state.tax
  })
  
  return Object.assign(state,
    makeAdder(),
    makeStateSetter()
  )
}

let cashier = new Cashier()
let subTotal = cashier.add(40,2) // 42
cashier.checkOut(subTotal)
cashier.total // 46.2