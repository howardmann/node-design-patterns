// 1. Use Array.includes for multiple criteria

// Check if fruit is red

// Normal
let checkFruit = (fruit) => {
  if (fruit === 'apple' || fruit === 'strawberry' || fruit === 'rasberry') {
    return 'red'
  } else {
    return 'not red'
  }
}

checkFruit('strawberry') // red
checkFruit('poo') // not red


// Use Array.includes
let checkFruit2 = (fruit) => {
  let redFruits = ['apple', 'strawberry', 'rasberry', 'pomegranite', 'cherry']
  return redFruits.includes(fruit) ? 'red' : 'not red'
}

checkFruit2('cherry') // red
checkFruit2('poo') // not red