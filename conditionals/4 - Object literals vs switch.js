// 4. Use object literals over switch statement

// Normal switch base to find fruits in color
let findFruit = (color) => {
  // use switch case to find fruits in color
  switch (color) {
    case 'red':
      return ['apple', 'strawberry'];
    case 'yellow':
      return ['banana', 'pineapple'];
    case 'purple':
      return ['grape', 'plum'];
    default:
      return [];
  }
}

findFruit('red') // ['apple', 'strawberry']

// Use object literal
let findFruit2 = (color) => {
  const colors = {
    red:  ['apple', 'strawberry'],
    yellow: ['banana', 'pineapple'],
    purple: ['grape', 'plum']
  }
  return colors[color] || []
}

findFruit2('red') // ['apple', 'strawberry']

// Refactor into object literal and filter
let findFruit3 = (color) => {
  const fruits = [
    { name: 'apple', color: 'red' }, 
    { name: 'strawberry', color: 'red' }, 
    { name: 'banana', color: 'yellow' }, 
    { name: 'pineapple', color: 'yellow' }, 
    { name: 'grape', color: 'purple' }, 
    { name: 'plum', color: 'purple' }
  ];

  return fruits
    .filter(o => o.color === color)
    .map(o => o.name)
}

findFruit3('red') // ['apple', 'strawberry']
