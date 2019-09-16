 const { test, nock } = require('../../bootstrap')

 test('getTweets()', async t => {
   const { getTweets } = require('../../../../functions/aggregators/sentiment')

   nock('https://api.twitter.com:443', {'encodedQueryParams': true})
  .get('/1.1/search/tweets.json')
  .query({'count': '1', 'q': '%23bitcoin', 'include_entities': 'false'})
  .reply(200, {'statuses': [{'text': 'Hello'}], 'search_metadata': {'count': 1, 'max_id_str': '946791741205745664'}})

   nock('https://api.twitter.com:443', {'encodedQueryParams': true})
  .get('/1.1/search/tweets.json')
  .query({'count': '1', 'q': '%23bitcoin', 'include_entities': 'false', 'since_id': '946791741205745664'})
  .reply(200, {'statuses': [{'text': 'Hello'}], 'search_metadata': {'count': 1, 'max_id_str': '946791741205745664'}})

   nock('https://api.twitter.com:443', {'encodedQueryParams': true})
  .get('/1.1/search/tweets.json')
  .query({'count': '1', 'q': '%23bitcoin', 'include_entities': 'false', 'since_id': '946791738974375936'})
  .reply(200, {'statuses': [{'text': 'World'}], 'search_metadata': {'count': 1, 'max_id_str': '946791741205745664'}})

   const res = await getTweets({
     query: '#bitcoin',
     limit: 1,
     max: 2
   })

   t.is(res.length, 2)
 })

 test('getTweetsSentiment()', t => {
   const { getTweetsSentiment } = require('../../../../functions/aggregators/sentiment')

   const score = getTweetsSentiment([{ text: 'I am allergic to cats' }, { text: 'This is horrible' }])
   t.is(score, -5)
 })

 test.only('getTwitterSentiment()', async t => {
   const { getTwitterSentiment } = require('../../../../functions/aggregators/sentiment')

   nock('https://api.twitter.com:443', {'encodedQueryParams': true})
  .get('/1.1/search/tweets.json')
  .query({'count': '2', 'q': '%23bitcoin', 'include_entities': 'false'})
  .reply(200, {'statuses': [{'created_at': 'Fri Dec 29 18:34:52 +0000 2017', 'id': 946811772866089000, 'id_str': '946811772866088960', 'text': 'I am so happy'}, {'created_at': 'Fri Dec 29 16:43:13 +0000 2017', 'id': 946783676255363100, 'id_str': '946783676255363072', 'text': '#29Dic En detalle: En qué se parecen y diferencian El Petro  del #Bitcoin https://t.co/7JQxcWc1cl https://t.co/AmeEAErQGP'}], 'search_metadata': {'completed_in': 0.022, 'max_id': 946811772866089000, 'max_id_str': '946811772866088960', 'query': '%23bitcoin', 'refresh_url': '?since_id=946811772866088960&q=%23bitcoin', 'count': 2, 'since_id': 0, 'since_id_str': '0'}})

   const { score, count } = await getTwitterSentiment({
     query: '#bitcoin',
     limit: 2,
     max: 2
   })
   t.is(score, 3)
 })
