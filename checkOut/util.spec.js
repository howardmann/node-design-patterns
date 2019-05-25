let expect = require('chai').expect
let util = require('./util.js')


describe('#util', function () {
  describe('#calcSubTotal', () => {
    it('should calculate the subTotal amount', () => {
      let lineItems =  [
        {product: 'book', price: 1.50, quantity: 2},
        {product: 'shirt', price: 21.50, quantity: 1},
        {product: 'underwear', price: 5.50, quantity: 3},
        {product: 'shoes', price: 55.50, quantity: 1}
      ]

      let input = util.calcSubTotal(lineItems)
      let actual = 96.5
      expect(input).to.eql(actual)
    })
  })

  describe('#calcSubTotalWithDiscount', () => {
    it('should calculate the subTotal amount adjusting for discount', () => {
      let lineItems = [{
          product: 'book',
          price: 1.50,
          quantity: 2,
          discount: 0.05
        },
        {
          product: 'shirt',
          price: 21.50,
          quantity: 1
        },
        {
          product: 'underwear',
          price: 5.50,
          quantity: 3
        },
        {
          product: 'shoes',
          price: 55.50,
          quantity: 1,
          discount: 0.1
        }
      ]

      let input = util.calcSubTotalWithDiscount(lineItems)
      let actual = 90.80
      expect(input).to.eql(actual)
    })
  })

  describe('#checkTax', () => {
    it('should return 10% for AUD', () => {
      let input = util.checkTax('AUD')
      let actual = 0.1
      expect(input).to.equal(actual)
    })
    it('should return 5% for EUR', () => {
      let input = util.checkTax('EUR')
      let actual = 0.05
      expect(input).to.equal(actual)
    })
    it('should return 0% for unknown currency', () => {
      let input = util.checkTax('MYR')
      let actual = 0
      expect(input).to.equal(actual)
    })
    it('should return 0% for invalid values', () => {
      let invalidArr = [null, undefined, 1, {}, []]
      invalidArr.forEach(invalid => {
        let input = util.checkTax(invalid)
        let actual = 0
        expect(input).to.equal(actual)
      })
    })

  })
  
  describe('#checkShipping', () => {
    it('should return correct fare by zone', () => {
      let shipping = {
        A: 5,
        B: 10,
        C: 15,
        D: 25
      }
      let zones = Object.keys(shipping)
      zones.forEach(zone => {
        let input = util.checkShipping(zone)
        let actual = shipping[zone]
        expect(input).to.equal(actual)
      })
    })
    it('should fallback to $5', () => {
      let invalidArr = [null, undefined, 1, 'Q', [], {}]
      invalidArr.forEach(invalid => {
        let input = util.checkShipping(invalid)
        let actual = 5
        expect(input).to.equal(actual)
      })
    })

  })

  describe('#toCurrency', () => {
    it('should convert to currency at 2 dp', () => {
      let input = util.toCurrency(2.1)
      let actual = '$2.10'
      expect(input).to.equal(actual)
    })
  })

  describe('#toPercent', () => {
    it('should convert to percentage at 2 dp', () => {
      let input = util.toPercent(0.05)
      let actual = '5.00%'
      expect(input).to.equal(actual)
    })
  })

})