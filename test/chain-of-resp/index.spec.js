let expect = require('chai').expect
let {Products, Discount} = require('../../chain-of-resp/index.js')

describe('#Products', function () {
  it('should add and sore prices', () => {
    let products = new Products()
    products.addProduct(10)
    products.addProduct(50)
    products.addProduct(100)
    products.addProduct(20)
    let input = products.products
    let actual = [10, 50, 100, 20]
    expect(input).to.eql(actual)
  })
})
describe('#Discount', function(){
  it('calculate 10% discount if > 3 items', () => {
    let products = new Products()
    products.addProduct(10)
    products.addProduct(10)
    products.addProduct(4)
    products.addProduct(20)
    let discount = new Discount()
    let input = discount.calculate(products.products)
    let actual = '0.10'
    expect(input).to.equal(actual)    
  })
  it('calculate 20% discount if total > $100', () => {
    let products = new Products()
    products.addProduct(120)
    let discount = new Discount()
    let input = discount.calculate(products.products)
    let actual = '0.20'
    expect(input).to.equal(actual)    
  })
  it('calculate 30% discount if total > $100 plus > 3 items', () => {
    let products = new Products()
    products.addProduct(50)
    products.addProduct(40)
    products.addProduct(5)
    products.addProduct(50)
    let discount = new Discount()
    let input = discount.calculate(products.products)
    let actual = '0.30'
    expect(input).to.equal(actual)    
  })
  it('calculate 0% discount if total < $100 or < 3 items', () => {
    let products = new Products()
    products.addProduct(50)
    products.addProduct(40)
    let discount = new Discount()
    let input = discount.calculate(products.products)
    let actual = '0.00'
    expect(input).to.equal(actual)    
  })
})