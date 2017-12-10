// PubSub pattern, single function that acts as a central control tower for events
// In this example we have an email price alert system for products
// The emailAlert subscribes to a product and passes it a function it wants executed when the product is emitted
// The Product simply decides when to publish the event name and passes it the product object
// The EventEmitter's job is to listen for and execute functions based on a unique eventName both pub and sub agreed to


let EventEmitter = function(){
  this.events = {}

  this.on = function (eventName, fn) {
    // If event does not exist create a new property with the eventName and an empty array
    this.events[eventName] = this.events[eventName] || [];
    // If event does not exist push the function into the array. An event can have multple listeners
    this.events[eventName].push(fn);
  }
  
  this.emit = function (eventName, param) {
    // If eventName exists trigger all functions within the array with the data passed in
    if (this.events[eventName]) {
      this.events[eventName].forEach(function (fn) {
        fn(param);
      });
    }
  }
}

// Create a new instance
let events = new EventEmitter()

let Product = function(name, price){
  this.product = {
    name,
    price
  }
  this.setPrice = (num) => {
    this.product.price = num
    events.emit(this.product.name, this.product)
  }
}

let EmailAlert = function(email){
  this.email = email
  this.msg = null
  this.priceAlert = null
  
  this.setAlert = (price, product) => {
    this.priceAlert = price
    events.on(product, this.calculate)
  }
  this.calculate = (product) => {
    let {price, name} = product
    if (price < this.priceAlert) {
      this.msg = `Email to ${this.email}: ${name} price below ${this.priceAlert} now at ${price}`
    }
  }
}

module.exports = {Product, EmailAlert}

// let book = new Product('book', 30)
// let johnAlert = new EmailAlert('john@email.com')
// let billAlert = new EmailAlert('bill@email.com')
// let kateAlert = new EmailAlert('kate@email.com')
// let mindyAlert = new EmailAlert('mindy@email.com')
// johnAlert.setAlert(20, 'book')
// billAlert.setAlert(25, 'book')
// kateAlert.setAlert(17, 'book')
// mindyAlert.setAlert(5, 'book')

// // Trigger event
// book.setPrice(15)

// let input = [
//   johnAlert.msg,
//   billAlert.msg,
//   kateAlert.msg,
//   mindyAlert.msg
// ]
// let actual = [
//   'Email to john@email.com: book price below 20 now at 15',
//   'Email to bill@email.com: book price below 25 now at 15',
//   'Email to kate@email.com: book price below 17 now at 15',
//   null
// ]
// expect(input).to.eql(actual)
