const config = require('config')
const Twitter = require('twitter')
const sentiment = require('sentiment')

const getTweets = async ({ query, limit = 100, max = 1000 }) => {
  var client = new Twitter({
    consumer_key: config.twitter.app_key,
    consumer_secret: config.twitter.app_secret,
    access_token_key: config.twitter.access_token,
    access_token_secret: config.twitter.access_token_secret
  })

  let params = {
    count: limit,
    q: query,
    include_entities: false
  }

  async function doFetch (results, id) {
    if (id) { params.max_id = id }
    const response = await client.get('search/tweets', params)

    if (id) { response.statuses.shift() }
    results = results.concat(response.statuses)

    const len = results.length
    if (response.search_metadata.count === limit && len < max) {
      return doFetch(results, results[len - 1].id)
    }

    return results
  }

  let results = await doFetch([])
  return results.slice(0, max) // We can return more results than max w last fetch
}

const getTweetsSentiment = (tweets) => {
  return tweets.reduce((total, tweet) => {
    let { score } = sentiment(tweet.text)
    total += score
    return total
  }, 0)
}

const getTwitterSentiment = async ({ query, limit, max }) => {
  const tweets = await getTweets({ query, limit, max })

  const score = getTweetsSentiment(tweets)
  return { count: tweets.length, score }
}
exports.getTwitterSentiment = getTwitterSentiment
exports.getTweetsSentiment = getTweetsSentiment
exports.getTweets = getTweets
