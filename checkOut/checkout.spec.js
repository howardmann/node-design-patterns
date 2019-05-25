let expect = require('chai').expect
let checkout = require('./checkout.js')
let order = require('./order.js')

describe('#checkout', function () {
  describe('#getReceipt', () => {
    it('should calculate breakdown of checkout items', () => {
      let input = checkout.getReceipt(order)
      let actual = {
        subTotal: '$96.50',
        subTotalWithDiscount: '$90.80',
        tax: '10.00%',
        shipping: '$5.00',
        totalCost: '$104.88'
      }
      expect(input).to.eql(actual)
    })
  })
})