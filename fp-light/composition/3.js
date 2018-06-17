// Compose function utility which takes two functions and makes one function
let compose2 = (fn2, fn1) => {
  return function composed(origValue) {
    return fn2(fn1(origValue));
  };
}

// Example from 1.js
let words = str => {
  return String(str)
    .toLowerCase()
    .split(/\s|\b/)
    .filter(function alpha(v) {
      return /^[\w]+$/.test(v);
    });
}

let unique = list => {
  var uniqList = [];

  for (let v of list) {
    // value not yet in the new list?
    if (uniqList.indexOf(v) === -1) {
      uniqList.push(v);
    }
  }

  return uniqList;
}

// Additional function
let capitalize = list => {
  return list.map(el => el.toUpperCase())
}

let text = "The quick brown fox jumped the fox brown fence";

// Manually using compose
let uniqueWords = (str) => unique(words(str)) 
let result = uniqueWords(text)
result // [ 'the', 'quick', 'brown', 'fox', 'jumped', 'fence' ]​​​​​


// 1. Let's use our compose2 function to replicate the above
let uniqueWords2 = compose2(unique, words)
let result2 = uniqueWords2(text)
result2 // [ 'the', 'quick', 'brown', 'fox', 'jumped', 'fence' ]​​​​​

// 2. We can use our same compose2 function to combine two different functions
let uppercaseWords = compose2(capitalize, words)
let result3 = uppercaseWords(text)
result3 // ['THE',​​ 'QUICK', ​​​​​​​​​​'BROWN', ​​​​​​​​​​'FOX', ​​​​​​​​​​'JUMPED', ​​​​​​​​​​'THE', ​​​​​​​​​​'FOX', ​​​​​​​​​​'BROWN', ​​​​​​​​​​'FENCE']​​​​​

// Under the hood of 2. above is doing
let uppercaseWords2 = (str) => capitalize(words(str))