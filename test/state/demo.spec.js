let expect = require('chai').expect
let Booking = require('../../state/booking')

describe('#Booking', function () {
  it('should exist', () => expect(Booking).to.not.be.undefined)
  it('should switch states when nextState is called', () => {
    let booking = new Booking()

    let first = booking.state.status
    expect(first).to.equal('reservation made')

    booking.nextState()
    let second = booking.state.status
    expect(second).to.equal('paid confirmation')

    booking.nextState()
    let final = booking.state.status
    expect(final).to.equal('redeemed complete')
  })

  it('should be able to cancel reservation after reservation is made', () => {
    let booking = new Booking()

    let first = booking.state.status
    expect(first).to.equal('reservation made')

    booking.exitState()
    let second = booking.state.status
    expect(second).to.equal('cancel reservation')

    booking.nextState()    
    let final = booking.state.status
    expect(final).to.equal('cancel reservation')
  })

  it('should refund payment after payment is made', () => {
    let booking = new Booking()

    let first = booking.state.status
    expect(first).to.equal('reservation made')

    booking.nextState()
    let second = booking.state.status
    expect(second).to.equal('paid confirmation')

    booking.exitState()
    let final = booking.state.status
    expect(final).to.equal('refund processed')
  })
})