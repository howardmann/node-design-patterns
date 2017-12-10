// Using ES5 bindings for this to get around lexical scope
var Adder = function() {
  this.sum = 0,
  this.add = function(numbers){
    numbers.forEach(function(n) {
      this.sum += n
    }, this)
  }
  this.calc = function(numbers){
    return this.nested.multiplyBy(numbers, 3)
  }  
  this.nested = {
    multiplyBy: function (numbers, multiple) {
      let result = numbers.map(function(n){
        return n * multiple
      })
      this.sum = result
    }.bind(this)
  }
}

var adder = new Adder()
adder.add([1,2,3,4,5])
var x = adder.sum // 15

adder.calc([1,2,3])
var y = adder.sum // [3, 6, 9]


// Same as above using ES6 arrow functions to get around lexical this scope
var AdderES6 = function () {
  this.sum = 0,
    this.add = function (numbers) {
      numbers.forEach(n => this.sum +=n)
    }
  this.calc = function (numbers) {
    return this.nested.multiplyBy(numbers, 3)
  }
  this.nested = {
    multiplyBy: (numbers, multiple) => {
      let result = numbers.map(n => n * multiple)
      this.sum = result
    }
  }
}

var adder = new AdderES6()
adder.add([1, 2, 3, 4, 5])
var x = adder.sum // 15

adder.calc([1, 2, 3])
var y = adder.sum // [3, 6, 9]
