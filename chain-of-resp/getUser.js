// Chain of resp boilerplate
let Foo = function() {
  this.next = null
  this.setNext = (fn) => this.next = fn
  this.exec = () => {
    return 'I do magic foo stuff here' + this.next.exec()
  }
}

// Example getUser background
let howie = {
  profile: {
    position: 'Senior Director',
    experience: 3
  },
  company: {
    name: 'ACME Inc',
    staff: 300
  },
  account: {
    type: 'premium',
    active: true,
    users: 1
  }
}

let fetchUser = () => {
  return Promise.resolve(howie)
}

let CheckProfile = function() {
  this.next = null
  this.setNext = (fn) => this.next = fn
  this.exec = (user) => {
    let {position, experience} = user.profile
    let result = {
      checkProfile: {
        pass: false,
        position,
        experience
      }
    }

    if (experience > 5) {
      result.checkProfile.pass = true
    }
    return Object.assign(result, this.next.exec(user))
  }
}

let CheckCompany = function() {
  this.next = null
  this.setNext = (fn) => this.next = fn
  this.exec = (user) => {
    let {name, staff} = user.company
    let result = {
      checkCompany: {
        pass: false,
        name,
        staff
      }
    }

    if (staff > 100) {
      result.checkCompany.pass = true
    }
    return Object.assign(result, this.next.exec(user))
  }
}

let CheckAccount = function() {
  this.next = null
  this.setNext = (fn) => this.next = fn
  this.exec = (user) => {
    let {type, active, users} = user.account
    let result = {
      checkAccount: {
        pass: false,
        type,
        active,
        users
      }
    }

    if (active) {
      result.checkAccount.pass = true
    }
    return Object.assign(result, this.next.exec(user))
  }
}

let None = function (){
  this.exec = function(){
    return
  }
}

let checkProfile = new CheckProfile()
let checkCompany = new CheckCompany()
let checkAccount = new CheckAccount()
let none = new None()
checkProfile.setNext(checkCompany)
checkCompany.setNext(checkAccount)
checkAccount.setNext(none)


fetchUser()
  .then(user => {
    let result = checkProfile.exec(user)
    return result
    // {
    //   checkProfile: { pass: false, position: 'Senior Director', experience: 3 },
    //   checkCompany: { pass: true, name: 'ACME Inc', staff: 300 },
    //   checkAccount: { pass: true, type: 'premium', active: true, users: 1 }
    // }
  })

