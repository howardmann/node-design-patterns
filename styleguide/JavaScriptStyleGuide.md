# JavaScript Styleguide - Notable mentions

## Objects
* Use ES6 object spread operator over `Object.assign` to copy objects
```javascript
// bad
const original = {a: 1, b:2}
const copy = Object.assign(original, {c:3}) // this mutates original
original // => {a:1, b:2, c:3}
copy // => {a:1, b:2, c:3}

// good
const original = {a: 1, b:2}
const copy = Object.assign({}, original, {c:3})
original // => {a:1, b:2}
copy // => {a:1, b:2, c:3}

// better
const original = {a: 1, b:2}
const copy = {...original, c: 3}
original // => {a:1, b:2}
copy // => {a:1, b:2, c:3}

// better when copying object with multiple properties
const original = {a:1, b:2}
const add = {c: 3, d: 4}
const copy = {...original, ...add}
original // => {a:1, b:2}
add // => {c:3, d:4}
copy // => {a:1, b:2, c:3, d:4}

```

* Use the rest operator to get a new object with certain properties omitted
```javascript
// bad
const original = {a: 1, b:2}
const copy = {...original, c: 3}
delete copy.a // this mutates the copy
original // => {a:1, b:2}
copy // => {b:2, c:3}

// good
const original = {a: 1, b:2}
const copy = {...original, c: 3}
const {a, ...noA} = copy // no mutation. copies value of a into a variable and rest into new noA variable
original // => {a:1, b:2}
copy // => {a:1, b:2, c:3}
noA // => {b:2, c:3}
a // => 1
```