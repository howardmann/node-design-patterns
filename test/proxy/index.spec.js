let expect = require('chai').expect
let { CarProxy, Driver } = require('../../proxy/index.js')

describe('#CarProxy', function () {
  it('should run if driver is adult', () => {
    let adult = new Driver(21)
    let adultCar = new CarProxy(adult)
    let input = adultCar.drive()
    let actual = 'vroom vroom'
    expect(input).to.equal(actual)
  })
  it('should stall if driver is underage', () => {
    let child = new Driver(12)
    let childCar = new CarProxy(child)
    let input = childCar.drive()
    let actual = 'nar mate underage'
    expect(input).to.equal(actual)
  })
})
