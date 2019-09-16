const { test, nock } = require('../../bootstrap')

const config = require('config')

test('fetchData()', async t => {
  const { fetchData } = require('../../lib/harvest/harvester')

  nock('https://www.alphavantage.co:443', {'encodedQueryParams': true})
  .get('/query')
  .query({'function': 'DIGITAL_CURRENCY_INTRADAY', 'symbol': 'BTC', 'market': 'USD', 'apikey': 'C9HYZIFC3JKT3I1X'})
  .reply(200, {'Meta Data': {'1. Information': 'Intraday Prices and Volumes for Digital Currency', '2. Digital Currency Code': 'BTC', '3. Digital Currency Name': 'Bitcoin', '4. Market Code': 'USD', '5. Market Name': 'United States Dollar', '6. Interval': '5min', '7. Last Refreshed': '2017-12-09 22:10:00', '8. Time Zone': 'UTC'}, 'Time Series (Digital Currency Intraday)': {'2017-12-09 22:10:00': {'1a. price (USD)': '14598.44846250', '1b. price (USD)': '14598.44846250', '2. volume': '171380.31676405', '3. market cap (USD)': '2501886721.76660013'}, '2017-12-09 22:05:00': {'1a. price (USD)': '14578.25583912', '1b. price (USD)': '14578.25583912', '2. volume': '171799.36936821', '3. market cap (USD)': '2504535159.65010023'}}})

  const entries = await fetchData({
    transport: 'alphavantage',
    currency: 'BTC',
    market: 'USD',
    interval: 'intraday'
  }, { apikey: config.alphavantage.key })

  t.is(entries.length, 2)
  t.deepEqual(entries[0], { source: 'alphavantage',
    interval: 'intraday',
    currency: 'BTC',
    market: 'USD',
    timestamp: '2017-12-10T05:10:00.000Z',
    high: '14598.44846250',
    low: '14598.44846250',
    close: '14598.44846250',
    open: '14598.44846250',
    volume: '171380.31676405',
    cap: '2501886721.76660013' })
})

test.only('storeData()', async t => {
  const { storeData } = require('../../lib/harvest/harvester')

  const res = await storeData([ { 
    source: 'alphavantage',
    interval: 'intraday',
    currency: 'BTC',
    market: 'USD',
    timestamp: '2017-12-10T05:10:00.000Z',
    high: '14598.44846250',
    low: '14598.44846250',
    close: '14598.44846250',
    open: '14598.44846250',
    volume: '171380.31676405',
    cap: '2501886721.76660013' },
  { source: 'alphavantage',
    interval: 'intraday',
    currency: 'BTC',
    market: 'USD',
    timestamp: '2017-01-10T05:05:00.000Z',
    high: '14578.25583912',
    low: '14578.25583912',
    close: '14578.25583912',
    open: '14578.25583912',
    volume: '171799.36936821',
    cap: '2504535159.65010023' } ], {
      transport: 'alphavantage',
      currency: 'BTC',
      market: 'USD',
      interval: 'intraday'
    })

    t.deepEqual(res, { count: 1, success: true })
})
