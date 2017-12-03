// Reservation booking system
// Logic 
// User can Reserve a spot and can either make payment or cancel their reservation
// Once Paid a user can ask for a refund or Redeem
// Once Redeemed a user can no longer ask for refund

let Booking = function() {
  this.state = new Reserved()  // Set the initial state
  // Calls the next state and caches its value into this.state
  this.nextState = function() {
    this.state = this.state.next()
  }
  this.exitState = function() {
    this.state = this.state.exit()
  }
}

// Forward progression
let Reserved = function() {
  this.status = 'reservation made'
  this.next = function() {
    return new Paid()
  }
  this.exit = function(){
    return new ReservedCancel()
  }
}

let Paid = function() {
  this.status = 'paid confirmation'
  this.next = function() {
    return new Redeemed()
  }
  this.exit = function() {
    return new PaidRefund()
  }
}

let Redeemed = function() {
  this.status = 'redeemed complete'
  this.next = function() {
    return this
  }
}

// Exit states
let ReservedCancel = function() {
  this.status = 'cancel reservation'
  this.next = function () {
    return this
  }  
}

let PaidRefund = function() {
  this.status = 'refund processed'
  this.next = function () {
    return this
  }  
}

// let booking = new Booking()
// console.log(booking.state.status); // reservation made
// booking.nextState()
// console.log(booking.state.status); // paid confirmation
// booking.nextState()
// console.log(booking.state.status); // redeemed complete

// let booking2 = new Booking()
// console.log(booking2.state.status); // reservation made
// booking2.exitState()
// console.log(booking2.state.status); // cancel reservation
// booking2.nextState()
// console.log(booking2.state.status); // cancel reservation

// let booking3 = new Booking()
// console.log(booking3.state.status); // reservation made
// booking3.nextState()
// console.log(booking3.state.status); // paid confirmation
// booking3.exitState()
// console.log(booking3.state.status); // refund processed
// booking3.nextState()
// console.log(booking3.state.status); // refund processed

module.exports = Booking