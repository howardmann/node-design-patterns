// Basic composition: combining small functions that do small things

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

let text = "The quick brown fox jumped the fox brown fence";

// 1. Breaking down task into steps. Find words from string then return unique
let wordsFound = words(text);
let wordsUsed = unique(wordsFound);

wordsUsed; // [ 'the', 'quick', 'brown', 'fox', 'jumped', 'fence' ]​​​​​

// 2. We can skip the step by wraping the functions together
let wordsUsed2 = unique(words(text))
wordsUsed2 // [ 'the', 'quick', 'brown', 'fox', 'jumped', 'fence' ]​

// 3. Function composition using these two small functions to create a larger
let uniqueWords = (str) => unique(words(text))
let wordsUsed3 = uniqueWords(text)
wordsUsed3 // [ 'the', 'quick', 'brown', 'fox', 'jumped', 'fence' ]​