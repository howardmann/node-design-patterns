// 2. Less nesting return early

// Fruit must be String, check if just red or red and berry 

// Normal
let checkFruit = (fruit) => {
  let redFruits = ['apple', 'strawberry', 'rasberry', 'pomegranite', 'cherry']
  let isBerry = (str) => /berry/.test(str)
  if (typeof fruit === 'string') {
    if (redFruits.includes(fruit)) {
      if (isBerry(fruit)){
        return 'red berry'
      } else {
        return 'red fruit'
      }
    } else {
      return 'not red fruit'
    }
  } else {
    return 'not a string'
  }
}

checkFruit('strawberry') // red berry

// Return early less nesting
let checkFruit2 = (fruit) => {
  let redFruits = ['apple', 'strawberry', 'rasberry', 'pomegranite', 'cherry']
  let isBerry = (str) => /berry/.test(str)
  
  // condition 1: return early
  if (typeof fruit !== 'string') return 'not a string'

  // condition 2: check if red and berry
  if (redFruits.includes(fruit) && isBerry(fruit)) return 'red berry'

  // condition 3: check if red fruit or not
  return (redFruits.includes(fruit)) ? 'red fruit' : 'not red fruit'
}

checkFruit2(42) // not a string
checkFruit2('apple') // red berry
checkFruit2('strawberry') // red berry
checkFruit2('halleberry') // not red fruit