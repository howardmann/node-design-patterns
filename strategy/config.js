const fs = require('fs');

// Using ES6 classes
// class Config {
//   constructor(strategy) {
//     this.data = {};
//     this.strategy = strategy
//   }
//   get(prop) {
//     return this.data[prop]
//   }
//   set(prop, value) {
//     return this.data[prop] = value
//   }
//   read(file) {
//     console.log(`Deserializing from ${file}`);
//     this.data = this.strategy.deserialize(fs.readFileSync(file, 'utf-8'))
//     console.log(this.data);
//   }
//   save(file) {
//     console.log(`Serializing to ${file}`);
//     fs.writeFileSync(file, this.strategy.serialize(this.data))
//     console.log(this.data);
//   }
// }

// Using function returning object
// let Config = function(strategy){
//   let data = {}
//   return {
//     get: prop => data[prop],
//     set: (prop, value) => data[prop] = value,
//     read: file => {
//       console.log(`Deserializing from ${file}`);
//       data = strategy.deserialize(fs.readFileSync(file, 'utf-8'))
//       console.log(data);
//     },
//     save: file => {
//       console.log(`Serializing to ${file}`);
//       fs.writeFileSync(file, strategy.serialize(data))
//       console.log(data);
//     }
//   }
// }

// Using constructor function
let Config = function(strategy){
  this.data = {}
  this.strategy = strategy
  this.get = (prop) => this.data[prop]
  this.set = (prop, value) => this.data[prop] = value
  this.read = (file) => {
    console.log(`Deserializing from ${file}`);
    this.data = this.strategy.deserialize(fs.readFileSync(file, 'utf-8'))
    console.log(this.data);    
  }
  this.save = (file) => {
    console.log(`Serializing to ${file}`);
    fs.writeFileSync(file, this.strategy.serialize(this.data))
    console.log(this.data);
  }
}

module.exports = Config;
