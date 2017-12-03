let strategies = require('./strategies')

// Extension of booking using strategy
let Booking = function (strategy) {
  this.strategy = strategy
  this.state = new Reserved() 
  
  this.nextState = function () {
    this.state = this.state.next(this.strategy)
  }
}

// Forward progression
let Reserved = function () {
  this.status = 'reservation made'
  this.next = function (strategy) {
    return new Paid(strategy)
  }
}

let Paid = function (strategy) {
  this.strategy = strategy
  this.status = Object.assign({msg: 'paid confirmation'}, this.strategy)
  this.next = function () {
    return new Redeemed()
  }
}

let Redeemed = function () {
  this.status = 'redeemed complete'
  this.next = function () {
    return this
  }
}

module.exports = Booking