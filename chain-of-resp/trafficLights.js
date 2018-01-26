
let Light = function (direction, timer) {
  // Initial state e.g. NS, EW traffic light
  this.state = {
    color: 'red',
    direction
  }

  // Chain-of-resp design pattern. Set next function to be other light
  this.next = null
  this.setNext = function (fn) {
    this.next = fn
  }

  // Chain-of-resp, instantiate the colors and set order and time interval they are to be called
  // For last color red set the next light that is to be called
  this.exec = function () {
    let green = new Color(this.state, 'green', 10)
    let yellow = new Color(this.state, 'yellow', 5)
    let red = new Color(this.state, 'red', 0)
    green.setNext(yellow)
    yellow.setNext(red)
    red.setNext(this.next)
    green.exec()
  }
}

let Color = function(light, color, seconds){
  // Pass the light state to the color
  this.light = light

  // Chain-of-resp design pattern cache next function to be called
  this.next = null
  this.setNext = function (fn) {
    this.next = fn
  }
  
  // Change state color and call next function after a set second interval period
  this.exec = function () {
    // Call logic here -> change the state color and log the result
    this.light.color = color
    console.log(this.light.color, this.light.direction)
    
    // Call next fn after n seconds
    setTimeout(() => {
      this.next.exec()
    }, seconds * 1000)
  }
}

// Simple timer which logs seconds passed. Not really needed for logic
let Timer = function () {
  this.seconds = 0
  this.init = () => {
    setInterval(() => {
      this.seconds += 1
      console.log(this.seconds)
    }, 1000)
  }
}

// // Setup the lights with given direction, set next ones to be called to be each other (infinite loop), then call NS first
// let NS = new Light('North South')
// let EW = new Light('East West')
// NS.setNext(EW)
// EW.setNext(NS)
// NS.exec()

// let timer = new Timer()
// timer.init()

module.exports = {Timer, Light, Color}