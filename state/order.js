let Order = function(){
  this.state = new WaitingForPayment()  // Set the initial state
  // Calls the next state and caches its value into this.state
  this.nextState = function(){
    this.state = this.state.next()
  }
}

let WaitingForPayment = function(){
  // Code logic goes here
  this.name = 'waiting for payment'
  // Returns the next state which gets cached by the Order object above
  this.next = function(){
    return new Shipping()
  }
}

let Shipping = function(){
  this.name = 'shipping in progress'
  this.next = function(){
    return new Delivered()
  }
}

let Delivered = function(){
  this.name = 'goods delivered'
  // Last in line returns itself
  this.next = function(){
    return this
  }
}

// let order = new Order()
// console.log(order.state.name); // waiting for payment
// order.nextState()
// console.log(order.state.name); // shipping in progress
// order.nextState()
// console.log(order.state.name); // goods delivered

module.exports = Order