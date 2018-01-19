
let Light = function (direction) {
  this.state = {
    color: 'green',
    direction
  }

  this.next = null
  this.setNext = function (fn) {
    this.next = fn
  }

  this.exec = function () {
    let green = new Green(this.state)
    let yellow = new Yellow(this.state)
    let red = new Red(this.state)
    green.setNext(yellow)
    yellow.setNext(red)
    red.setNext(this.next)
    green.exec()
  }
}

let Green = function(state){
  this.state = state

  this.next = null
  this.setNext = function (fn) {
    this.next = fn
  }
  
  this.exec = function () {
    this.state.color = 'green'    
    setTimeout(() => {
      console.log(this.state.color, this.state.direction)
      this.next.exec()
    }, 500)    
  }
}

let Yellow = function(state){
  this.state = state

  this.next = null
  this.setNext = function (fn) {
    this.next = fn
  }
  
  this.exec = function () {
    this.state.color = 'yellow'
    setTimeout(() => {
      console.log(this.state.color, this.state.direction)
      this.next.exec()      
    }, 500)
  }
}

let Red = function(state){
  this.state = state

  this.next = null
  this.setNext = function (fn) {
    this.next = fn
  }
  
  this.exec = function () {
    this.state.color = 'red'
    setTimeout( () => {
      console.log(this.state.color, this.state.direction)
      this.next.exec()      
    }, 500)
  }
}

let NS = new Light('North South')
let EW = new Light('East West')
NS.setNext(EW)
EW.setNext(NS)
NS.exec()