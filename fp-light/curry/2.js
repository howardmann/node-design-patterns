// Using curry and partial to pre-fill a unit converter function
// The custom function takes 4 args, the first 3 are used to calculate the unit conversion, measurement and any offsets required
// The final input arg takes the first three pre-filled args to convert the metric
// We demonstrate how we can use curry and regular partial left to pre-fill the args to create custom unit converters
// We will create a milesToKm, poundsToKg and farenheitToCelsius converter

// 1. Curry: takes the arguments one by one to pre-fill in a chain
// 2. Partial: takes all the pre-filled arguments at once
// 3. Simple function: wrap the converter in a simple function

// Conclusion: I prefer using option 3, it's simpler and easier to understand. But it is good to understand how partial and curry can help

// Custom unit coverter
let converter = function (toUnit, factor, offset, input) {
  let result = ((offset + input) * factor).toFixed(2)
  return `${result} ${toUnit}`
}

// Curry partial util
let curry = function (fn, arity = fn.length) {
  return (function nextCurried(prevArgs) {
    return function curried(nextArg) {
      var args = [...prevArgs, nextArg];

      if (args.length >= arity) {
        return fn(...args);
      } else {
        return nextCurried(args);
      }
    };
  })([]);
}

// Using curry to prefill args
let milesToKm = curry(converter)('km')(1.60936)(0)
let poundsToKg = curry(converter)('kg')(0.45460)(0)
let farenheitToCelsius = curry(converter)('degrees C')(0.5556)(-32)

milesToKm(10); // returns "16.09 km"
poundsToKg(2.5); // returns "1.14 kg"
farenheitToCelsius(98); // returns "36.67 degrees C"


// Using a partial util
let partial = function (fn, ...presetArgs) {
  return function partiallyApplied(...laterArgs) {
    return fn(...presetArgs, ...laterArgs);
  };
}

// Same thing but using a traditional partial, just for the sake of it
let milesToKm2 = partial(converter, 'km', 1.60936, 0)
let poundsToKg2 = partial(converter, 'kg', 0.45460, 0)
let farenheitToCelsius2 = partial(converter, 'degrees C', 0.5556, -32)

milesToKm2(10); // returns "16.09 km"
poundsToKg2(2.5); // returns "1.14 kg"
farenheitToCelsius2(98); // returns "36.67 degrees C"

// Remember: Use the right tool for the right job. 
// Wrapping the convert in a simple fn delivers the same outcome as using curry
// Personally I find this easier to understand, test and reason about
// It is clear how many args the converter function takes
let milesToKm3 = input => converter('km', 1.60936, 0, input)
let poundsToKg3 = input => converter('kg', 0.45460, 0, input)
let farenheitToCelsius3 = input => converter('degrees C', 0.5556, -32, input)

milesToKm3(10); // returns "16.09 km"
poundsToKg3(2.5); // returns "1.14 kg"
farenheitToCelsius3(98); // returns "36.67 degrees C"


