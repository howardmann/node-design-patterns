// # Classes using extends to create sub classes
// Classes can inherit from other classes by using extends, this is the same as using .call(this) with constructor functions to inherit from other factory functions
// NOTE: in general when writing your custom logic it is a bad idea to use inheritence (either class or constructor functions)
// Attempt to use functional composition as it easier to test and reuse
// However; you will notice sub classes a lot in other JS libraries that inherit from master components e.g. React [class Square extends React.Component] 

// 1. Start with a simple person class
class Person {
  constructor(name){
    this.name = name
  }
  speak() {
    return `My name is ${this.name}`
  }
}

let howie = new Person('howie')
howie.speak() // My name is howie

// 2. Extend the Person class to a subclass of Worker
class Worker extends Person {
  constructor(name, profession) {
    // Call super(name) to call on the parent class and instantiate the Person constructor with the name
    // Super must be called before this can be used
    super(name)
    this.profession =  profession
  }
  // This speak method overrides the parent class
  speak() {
    return `My name is ${this.name} and my profession is ${this.profession}`
  }
}

let bob = new Worker('Bob', 'Builder')
bob.speak() // My name is Bob and my profession is Builder

// # Constructor function using inheritence with .call(this) to do same thing
let PersonConstructor = function (name) {
  this.name = name
  this.speak = () => `My name is ${this.name}`
}

let WorkerConstructor = function (name, profession) {
  PersonConstructor.call(this, name)
  this.profession = profession
  this.speak = () => `My name is ${this.name} and my profession is ${this.profession}`
}

let hela = new PersonConstructor('hela')
hela.speak() // My name is hela

let felix = new WorkerConstructor('felix', 'unemployed')
felix.speak() // My name is felix and my profession is unemployed
