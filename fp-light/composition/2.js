// Example 2: we want to sum the total seats that are not success managed

let data = [
  {success: true, seats: 100},
  {success: false, seats: 30},
  {success: false, seats: 20},
  {success: false, seats: 30},
  {success: true, seats: 80},
  {success: false, seats: 20},
  {success: true, seats: 10},
  {success: false, seats: 30}
]

// We will break this task into three smaller functions
let filterSuccess = (arr, boolean = true) => {
  return arr.filter( el => boolean ? el.success : !el.success)
}

let getProperty = (arr, prop) => {
  return arr.map( el => el[prop])
}

let sum = (arr) => {
  return arr.reduce((el, tally) => {
    return el + tally
  }, 0)
}


// 1. Answer it using variables
let notSuccess = filterSuccess(data, false)
let seatsNotSuccess = getProperty(notSuccess, 'seats')
let total = sum(seatsNotSuccess)
total // 130

// 2. Answer it in one go (start from inside and then go out)
let total2 = sum(getProperty(filterSuccess(data, false), 'seats'))
total2 // 130

// 3. Compose a new function: same as above, but makes it cleaner with one fn
let totalNonSuccess = (arr) => {
  return sum(getProperty(filterSuccess(arr, false), 'seats'))
}
let total3 = totalNonSuccess(data)
total3 //130


