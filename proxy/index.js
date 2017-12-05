// Proxy design pattern
// Wrap the original factory function in a proxy with the same method name
// Add any additional logic you need on top of the original logic

let Car = function(){
  this.drive = () => 'vroom vroom'
}

let CarProxy = function(driver){
  this.driver = driver

  this.drive = () => {
    if (this.driver.age > 16)
      return new Car().drive()

    return 'nar mate underage'
  }
}

let Driver = function(age) {
  this.age = age
}

module.exports = {CarProxy, Driver}

// let adult = new Driver(21)
// let child = new Driver(12)

// let adultCar = new CarProxy(adult)
// let childCar = new CarProxy(child)

// adultCar.drive() // vroom vroom

// childCar.drive() // nar mate underage
