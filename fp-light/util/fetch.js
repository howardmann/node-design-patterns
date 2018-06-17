let fetch = module.exports = {}

let request = require('request')

fetch = (url) => {
  return new Promise((resolve, reject) => {
    request(url, function (err, resp, body) {
      if (err) {
        reject(err)
      }
      resolve(JSON.parse(body))
    })
  })
}
