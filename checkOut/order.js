let order = {
  customer: 'howie',
  currency: 'AUD',
  lineItems: [
    {product: 'book', price: 1.50, quantity: 2, discount: 0.05},
    {product: 'shirt', price: 21.50, quantity: 1},
    {product: 'underwear', price: 5.50, quantity: 3},
    {product: 'shoes', price: 55.50, quantity: 1, discount: 0.1}
  ],
  address: '123 fake street',
  shippingZone: 'A'
}

module.exports = order