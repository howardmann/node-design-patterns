const Config = require('./config')
const strategies = require('./strategies')

const jsonConfig = new Config(strategies.json)
jsonConfig.read('samples/conf.json')
jsonConfig.set('title', 'design patterns')
jsonConfig.save('samples/conf_mod.json')

const textConfig = new Config(strategies.transform)
textConfig.read('samples/loud.txt')
textConfig.set('title', 'contrived example')
textConfig.save('samples/loud_mod.txt')