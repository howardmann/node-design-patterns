let expect = require('chai').expect
let { Product, EmailAlert } = require('../../pubsub/index.js')


describe('#pubsub', function () {
  it('should alert when there is a price drop', () => {
    let book = new Product('book', 30)
    let johnAlert = new EmailAlert('john@email.com')
    johnAlert.setAlert(20, 'book')
    book.setPrice(15)
    
    let input = johnAlert.msg
    let actual = 'Email to john@email.com: book price below 20 now at 15'
    expect(input).to.equal(actual)
  })
  it('should alert to multiple emails when there is a price drop for single product', () => {
    let book = new Product('book', 30)
    let johnAlert = new EmailAlert('john@email.com')
    let billAlert = new EmailAlert('bill@email.com')
    let kateAlert = new EmailAlert('kate@email.com')
    let mindyAlert = new EmailAlert('mindy@email.com')
    johnAlert.setAlert(20, 'book')
    billAlert.setAlert(25, 'book')
    kateAlert.setAlert(17, 'book')
    mindyAlert.setAlert(5, 'book')
    
    // Trigger event
    book.setPrice(15)
    
    let input = [
      johnAlert.msg, 
      billAlert.msg,
      kateAlert.msg,
      mindyAlert.msg
    ]
    let actual = [
      'Email to john@email.com: book price below 20 now at 15', 
      'Email to bill@email.com: book price below 25 now at 15',
      'Email to kate@email.com: book price below 17 now at 15',
      null
    ]
    expect(input).to.eql(actual)
  })
})
