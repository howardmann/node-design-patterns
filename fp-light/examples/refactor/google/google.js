let google = module.exports = {}

// Dependencies
let config = require('../../config.js');
let dbClient = require('./dbClient.js')
let get = require('lodash/get')
let googleClient = config.googleClient

google.analyze = (text, client = googleClient) => {
  let document = {
    content: text,
    type: 'PLAIN_TEXT',
  }
  return client.analyzeSentiment({
    document: document
  })
}

/**
 * @function {analyzes a single document post title for sentiment and updates document}
 * @param  {Object} doc {full document object}
 * @return {Promise} {dbClient.updateThread put Promise}
 */
google.postUpdateSentiment = (doc) => {
  let title = get(doc, 'post.title')
  let id = doc._id
  return new Promise((resolve, reject) => {
    if (doc.documentSentiment) {
      console.log('Sentiment already exists for: ', title);
      resolve('Sentiment already exists')
    } else {
      google.analyze(title)
        .then(result => {
          console.log(`New sentiment analyzed: score of ${result[0].documentSentiment.score} for ${title}`);

          resolve(dbClient.updateSentimentScore(id, result[0].documentSentiment.score))
        })
    }
  })
}

/**
 * @function {takes array of documents and analyzes post title for sentiment and updates document}
 * @param  {Array} array {array of documents}
 * @return {Promise} {Promise array of updated docs}
 */
google.arrayPostUpdateSentiment = (array) => {
  let promiseArr = array.map(doc => {
    return google.postUpdateSentiment(doc);
  })
  return Promise.all(promiseArr)
}

/**
 * @function {queries db based on topicsArr and analyzes sentiment and updates docs}
 * @return {Promise} {Promise array of updated docs}
 */
google.pollSentiment = () => {
  return new Promise(resolve => {
    dbClient.getAll().then(payload => {
        let array = payload.data
        google.arrayPostUpdateSentiment(array).then(results => {
          resolve(`No more results, totalResults: ${results.length}`)
        })
      })
      .catch(err => {
        console.log(err);
      })
  })
}