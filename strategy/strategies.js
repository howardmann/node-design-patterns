let strategies = module.exports = {}

strategies.json = {
  deserialize: data => JSON.parse(data),
  serialize: data => JSON.stringify(data, null, ' ')
}

strategies.transform = {
  deserialize: data => data.toLowerCase(),
  serialize: data => data.toUpperCase() + ' timestamp: 42'
}