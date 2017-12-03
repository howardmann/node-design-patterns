let expect = require('chai').expect
let Order = require('../../state/app')

describe('#Order', function(){
  it('should exists', () => expect(Order).to.not.be.undefined)
  it('should switch states when nextState is called', () => {
    let order = new Order()

    let first = order.state.name
    expect(first).to.equal('waiting for payment')
    
    order.nextState()    
    let second = order.state.name
    expect(second).to.equal('shipping in progress')

    order.nextState()    
    let final = order.state.name
    expect(final).to.equal('goods delivered')
  })
})