let expect = require('chai').expect
let Booking = require('../../state/booking2')
let strategies = require('../../state/strategies')

describe('#Booking', function () {
  it('should exist', () => expect(Booking).to.not.be.undefined)
  it('should use the relevant strategy for payment options', () => {
    let sendle = strategies.sendle
    let booking = new Booking(sendle)

    let first = booking.state.status
    expect(first).to.equal('reservation made')

    booking.nextState()
    let second = booking.state.status
    let actual = {
      msg: 'paid confirmation',
      provider: 'sendle',
      cost: 15,
      days: 3,
      pickup: true
    }
    expect(second).to.eql(actual)
    booking.nextState()
  })
  it('should show different payment options when using different strategy', () => {
    let ausPost = strategies.ausPost
    let booking = new Booking(ausPost)

    let first = booking.state.status
    expect(first).to.equal('reservation made')

    booking.nextState()
    let second = booking.state.status
    let actual = {
      msg: 'paid confirmation',
      provider: 'ausPost',
      cost: 30,
      days: 1,
      pickup: false
    }
    expect(second).to.eql(actual)
    booking.nextState()
  })


})