// Create a simple calculator function that takes two numbers

// #Constructor function example
let CalculatorConstructor = function (){
  // Save results in memory. Note: do this to show that it creates a new instance of calculator
  this.cache = null
  this.save = (num) => {
    this.cache = num
    return `Saved ${this.cache}`
  }

  // Logic
  this.add = (a,b) => a + b
  this.subtract = (a,b) => a - b
}

let calc1 = new CalculatorConstructor()
let result1 = calc1.add(40,2)
calc1.save(result1)
calc1.cache // 42

let calc2 = new CalculatorConstructor()
let result2 = calc1.subtract(40, 2)
calc2.save(result2)
calc2.cache // 38

// calc1 result does not get mutated as they are new instances
calc1.cache // 42

// #Class example
// Note similar to constructor function example, really only syntax sugar, put any `this` properties into the constructor, which will also instantiate any initial params. Methods have a slightly different syntax without `this` and cannot use arrow functions
class CalculatorClass {
  constructor(){
    this.cache = null    
  }

  save(num) {
    this.cache = num
    return `Saved ${this.cache}`
  }
  
  add(a,b) {
    return a + b
  }
  subtract(a,b) {
    return a - b
  }
}

// Class works same as above
let calc3 = new CalculatorClass()
let result3 = calc3.add(40,2) // 42
calc3.save(result3)
calc3.cache // 42

let calc4 = new CalculatorClass()
let result4 = calc4.subtract(40,2) // 38
calc4.save(result4)
calc4.cache // 38

