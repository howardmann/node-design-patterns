let checkout = module.exports = {}
let util = require('./util.js')
let order = require('./order.js')


// Objective calculate key receipt data info from order. Transform order to receipt

// order input => 
// let order = {
//   customer: 'howie',
//   currency: 'AUD',
//   lineItems: [
//     {product: 'book', price: 1.50, quantity: 2, discount: 0.05},
//     {product: 'shirt', price: 21.50, quantity: 1},
//     {product: 'underwear', price: 5.50, quantity: 3},
//     {product: 'shoes', price: 55.50, quantity: 1, discount: 0.1}
//   ],
//   address: '123 fake street',
//   shippingZone: 'A'
// }


// checkout.getReceipt(order) result =>
//  {
//    subTotal: '$96.50',
//    subTotalWithDiscount: '$90.80',
//    tax: '10.00%',
//    shipping: '$5.00',
//    totalCost: '$104.88'
//  }

checkout.getReceipt = (order) => {
  let subTotal = util.calcSubTotal(order.lineItems)
  let subTotalWithDiscount = util.calcSubTotalWithDiscount(order.lineItems)
  let tax = util.checkTax(order.currency)
  let shipping = util.checkShipping(order.shippingZone)
  let totalCost = Number(((subTotalWithDiscount * (1+ tax)) + shipping).toFixed(2))

  return {
    subTotal: util.toCurrency(subTotal),
    subTotalWithDiscount: util.toCurrency(subTotalWithDiscount),
    tax: util.toPercent(tax),
    shipping: util.toCurrency(shipping),
    totalCost: util.toCurrency(totalCost)
  }
}

