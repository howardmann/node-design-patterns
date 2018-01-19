let expect = require('chai').expect
let sinon = require('sinon')
let { Timer, Light, Color } = require('../../chain-of-resp/trafficLights.js')

describe.only('#TrafficLights', function () {
  let NS;
  let EW;
  beforeEach(function(){
    this.clock = sinon.useFakeTimers()
    NS = new Light('North South')
    EW = new Light('East West')
    NS.setNext(EW)
    EW.setNext(NS)
    // // Comment out, only purpose is to log the seconds passed
    // let timer = new Timer()
    // timer.init()
  })
  afterEach(function(){
    this.clock.restore()
  })
  it('should be red for both NS and EW before it runs', function() {
    this.clock.tick(0)
    expect(NS.state.color).to.equal('red')
    expect(EW.state.color).to.equal('red')
  })
  it('should be green for NS and red EW as soon as it runs', function() {
    NS.exec()
    this.clock.tick(0)
    expect(NS.state.color).to.equal('green')
    expect(EW.state.color).to.equal('red')
  })
  it('should turn NS yellow after 10 seconds and EW should stay red', function() {
    NS.exec()
    this.clock.tick(10000)
    expect(NS.state.color).to.equal('yellow')
    expect(EW.state.color).to.equal('red')
  })
  it('should stay NS yellow after 10 seconds for 5 seconds and EW should stay red', function() {
    NS.exec()
    this.clock.tick(14000)
    expect(NS.state.color).to.equal('yellow')
    expect(EW.state.color).to.equal('red')
  })
  it('should turn NS red after 16 seconds and turn EW green', function() {
    NS.exec()
    this.clock.tick(16000)
    expect(NS.state.color).to.equal('red')
    expect(EW.state.color).to.equal('green')
  })
  it('should turn EW red after 31 seconds and turn NS green', function() {
    NS.exec()
    this.clock.tick(31000)
    expect(NS.state.color).to.equal('green')
    expect(EW.state.color).to.equal('red')
  })
})
