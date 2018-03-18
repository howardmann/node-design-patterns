// Create a Person constructor that asks for name and strategy and then speaks

// Example of two simple strategies
let strategyUpper = {
  convert: (word) => word.toUpperCase()
}

let strategyLower = {
  convert: (word) => word.toLowerCase()
}


// #Constructor example
let PersonConstructor = function(name, strategy) {
  this.name = name
  this.strategy = strategy
  this.speak = () => this.strategy.convert(this.name)
}

let howie = new PersonConstructor('Howie', strategyUpper)
howie.speak() // HOWIE

let felix = new PersonConstructor('Felix', strategyLower)
felix.speak() // felix

// #Class example
class PersonClass {
  constructor(name, strategy) {
    this.name = name
    this.strategy = strategy
  }
  speak(){
    return this.strategy.convert(this.name)
  }
}

let hela = new PersonClass('Hela', strategyUpper)
hela.speak() // HELA

let felicity = new PersonClass('Felicity', strategyLower)
felicity.speak() // felicity
