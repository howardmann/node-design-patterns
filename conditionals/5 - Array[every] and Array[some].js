// Use Array.every and Array.some for all/ partial criteria

const fruits = [
  { name: 'apple', color: 'red' },
  { name: 'banana', color: 'yellow' },
  { name: 'grape', color: 'purple' }
];

// Check if all fruits are red

// Normal, set outside variables
let checkFruits = (fruits)   => {
  let isAllRed = true;

  // condition: all fruits must be red
  fruits.forEach(o => {
    if (!isAllRed) return false
    isAllRed = o.color === 'red'
  })
  return isAllRed
}

checkFruits(fruits) // false

// Array.every
let checkFruits2 = (fruits) => {
  return fruits.every(o => o.color === 'red')
}

checkFruits2(fruits) // false


// Array.some to check if at least one is red
let checkFruits3 = (fruits) => {
  return fruits.some(o => o.color === 'red')
}

checkFruits3(fruits) // true