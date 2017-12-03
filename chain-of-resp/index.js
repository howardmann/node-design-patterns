// Delegate responsibility to next function down the line
// Chain of responsiblity is useful when there are a cumulative series of methods
// In this example we have a discount calculator which is cumulative based on various 
// conditions the products basket satisfies e.g. > 3 items add 10% discount, > $100 spend add 20% discount
// To calculate discount we first check if it satisfies number discount, then add that result to the price discount
// before finalling adding a no discount end condition. If number and price discount aren't satisfied then we return 0 discount (the end condition)
// Note: see below for comparison using imperative programming
// Advantage of chain-of-resp pattern is we can choose which types of discounts we want to apply
// we could easily add more discount methods

// Setup a simple products array which we will use to calc discounts
let Products = function() {
  this.products = []
  this.addProduct = (product) => {
    this.products.push(product)
  }
}

// Entry point function
let Discount = function() {
  this.calculate = (products) => {
    // Instantiate each of the discount calculators
    let ndiscount = new NumberDiscount()
    let pdiscount = new PriceDiscount()
    let none = new NoDiscount()
    
    ndiscount.setNext(pdiscount) // Add price discount to number discount
    pdiscount.setNext(none) // Add no discount to price discount
    return ndiscount.exec(products).toFixed(2) // Execute and round to 2 dp
  }
}

let NumberDiscount = function() {
  // PATTERN CODE
  // Cache the next instantiated function into next property 
  this.next = null
  this.setNext = function(fn) {
    this.next = fn
  }
  
  // Execute by calcuating own result and then append results by calling next
  this.exec = function(products){
    let result = null
    if (products.length > 3) {
      result = 0.10
    }
    return result + this.next.exec(products)
  }
}

let PriceDiscount = function() {
  this.next = null
  this.setNext = function (fn) {
    this.next = fn
  }
  this.exec = function(products) {
    let total = products.reduce((el, tally) => {
      return el + tally
    }, 0)
    let result = null
    if (total > 100) {
      result = 0.20
    }
    return result + this.next.exec(products)
  }
}

let NoDiscount = function() {
  // End of the line returns 0
  this.exec = function(){
    return 0
  }
}

// // Imperative method as a comparison
// // Note the code here is not a lot but it does not scale as complexity grows
// let Discount = function() {
//   this.calculate = function(products) {
//     // Number discount
//     let ndiscount = null
//     if (products.length > 3) {
//       ndiscount = 0.10
//     }
//     // Price discount
//     let pdiscount = null
//     let total = products.reduce((el, tally) => {
//       return el + tally
//     }, 0)
//     if(total > 100) {
//       pdiscount = 0.20
//     }
//     // Result
//     let result = ndiscount + pdiscount
//     return result.toFixed(2)
//   }
// }

module.exports = {Products, Discount}