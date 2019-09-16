const { ObjectId } = require('mongoprime')

module.exports = {
  'transactions.hist.crytr.btceur': require('./fixtures/transactions.hist.crytr.btceur'),
  'modulations': [ {
    timestamp: new Date('2017-10-12T15:27:37.000Z'),
    results: { outReal: [1, 2] },
    collection: '10day.btcusd',
    fn: 'foo',
    parameters: { endIdx: 50, optInTimePeriod: 9 }
  }, {
    timestamp: new Date('2017-10-11T15:27:37.000Z'),
    results: { outReal: [1, 2] },
    collection: '10day.btcusd',
    fn: 'foo',
    parameters: { endIdx: 50, optInTimePeriod: 9 }
  }, {
    timestamp: new Date('2017-11-12T15:27:37.000Z'),
    results: { outReal: [1, 2] },
    collection: '1day.btcusd',
    fn: 'foo',
    parameters: { endIdx: 50, optInTimePeriod: 9 }
  }],
  'historical.btceur': [{
    '_id': ObjectId('5a36a0be452eec124dc0ded6'),
    'timestamp': new Date('2017-12-05T04:43:49.000Z'),
    'price': 40,
    'amount': 1
  },
  {
    '_id': ObjectId('5a36a0be452eec124dc0ded7'),
    'timestamp': new Date('2017-12-05T04:03:01.000Z'),
    'price': 56,
    'amount': 1
  },
  {
    '_id': ObjectId('5a36a0be452eec124dc0ded8'),
    'timestamp': new Date('2017-12-05T05:44:04.000Z'),
    'price': 45,
    'amount': 1
  },
  {
    '_id': ObjectId('5a36a0be452eec124dc0ded9'),
    'timestamp': new Date('2017-12-05T06:12:07.000Z'),
    'price': 45,
    'amount': 1
  },
  {
    '_id': ObjectId('5a36a0be452eec124dc0deda'),
    'timestamp': new Date('2017-12-05T06:43:00.000Z'),
    'price': 45,
    'amount': 1
  },
  {
    '_id': ObjectId('5a36a0be452eec124dc0dedb'),
    'timestamp': new Date('2017-12-05T07:43:20.000Z'),
    'price': 42,
    'amount': 1
  },
  {
    '_id': ObjectId('5a36a0be452eec124dc0dedc'),
    'timestamp': new Date('2017-12-05T07:43:50.000Z'),
    'price': 55,
    'amount': 1
  },
  {
    '_id': ObjectId('5a36a0be452eec124dc0dedd'),
    'timestamp': new Date('2017-12-05T07:44:00.000Z'),
    'price': 41,
    'amount': 1
  },
  {
    '_id': ObjectId('5a36a0be452eec124dc0dede'),
    'timestamp': new Date('2017-12-05T07:44:20.000Z'),
    'price': 53,
    'amount': 1
  },
  {
    '_id': ObjectId('5a36a0be452eec124dc0dedf'),
    'timestamp': new Date('2017-12-06T04:11:30.000Z'),
    'price': 45,
    'amount': 1
  },
  {
    '_id': ObjectId('5a36a0be452eec124dc0dee0'),
    'timestamp': new Date('2017-12-06T07:55:37.000Z'),
    'price': 42,
    'amount': 1
  },
  {
    '_id': ObjectId('5a36a0be452eec124dc0dee1'),
    'timestamp': new Date('2017-12-06T08:45:38.000Z'),
    'price': 33,
    'amount': 1
  },
  {
    '_id': ObjectId('5a36a0be452eec124dc0dee2'),
    'timestamp': new Date('2017-12-06T08:44:38.000Z'),
    'price': 34,
    'amount': 1
  },
  {
    '_id': ObjectId('5a36a0be452eec124dc0dee3'),
    'timestamp': new Date('2017-12-06T12:33:45.000Z'),
    'price': 36,
    'amount': 1
  },
  {
    '_id': ObjectId('5a36a0be452eec124dc0dee4'),
    'timestamp': new Date('2017-12-06T14:22:46.000Z'),
    'price': 44,
    'amount': 1
  },
  {
    '_id': ObjectId('5a36a0be452eec124dc0dee5'),
    'timestamp': new Date('2017-12-07T02:41:46.000Z'),
    'price': 46,
    'amount': 1
  },
  {
    '_id': ObjectId('5a36a0be452eec124dc0dee6'),
    'timestamp': new Date('2017-12-07T03:32:47.000Z'),
    'price': 45,
    'amount': 1
  },
  {
    '_id': ObjectId('5a36a0be452eec124dc0dee7'),
    'timestamp': new Date('2017-12-07T04:56:47.000Z'),
    'price': 56,
    'amount': 1
  },
  {
    '_id': ObjectId('5a36a0be452eec124dc0dee8'),
    'timestamp': new Date('2017-12-07T05:13:50.000Z'),
    'price': 55,
    'amount': 1
  },
  {
    '_id': ObjectId('5a36a0be452eec124dc0dee9'),
    'timestamp': new Date('2017-12-07T06:29:50.000Z'),
    'price': 45,
    'amount': 1
  },
  {
    '_id': ObjectId('5a36a0be452eec124dc0deea'),
    'timestamp': new Date('2017-12-07T09:44:50.000Z'),
    'price': 22,
    'amount': 1
  },
  {
    '_id': ObjectId('5a36a0be452eec124dc0deeb'),
    'timestamp': new Date('2017-12-08T14:29:50.000Z'),
    'price': 44,
    'amount': 1
  },
  {
    '_id': ObjectId('5a36a0be452eec124dc0deec'),
    'timestamp': new Date('2017-12-08T15:25:50.000Z'),
    'price': 45,
    'amount': 1
  },
  {
    '_id': ObjectId('5a36a0be452eec124dc0deed'),
    'timestamp': new Date('2017-12-08T16:04:51.000Z'),
    'price': 77,
    'amount': 1
  },
  {
    '_id': ObjectId('5a36a0be452eec124dc0deee'),
    'timestamp': new Date('2017-12-08T18:14:52.000Z'),
    'price': 46,
    'amount': 1
  },
  {
    '_id': ObjectId('5a36a0be452eec124dc0deef'),
    'timestamp': new Date('2017-12-08T19:02:53.000Z'),
    'price': 67,
    'amount': 1
  },
  {
    '_id': ObjectId('5a36a0be452eec124dc0def0'),
    'timestamp': new Date('2017-12-08T20:44:53.000Z'),
    'price': 64,
    'amount': 1
  },
  {
    '_id': ObjectId('5a36a0be452eec124dc0def1'),
    'timestamp': new Date('2017-12-08T20:10:53.000Z'),
    'price': 45,
    'amount': 1
  },
  {
    '_id': ObjectId('5a36a0be452eec124dc0def2'),
    'timestamp': new Date('2017-12-08T21:12:53.000Z'),
    'price': 63,
    'amount': 1
  },
  {
    '_id': ObjectId('5a36a0be452eec124dc0def3'),
    'timestamp': new Date('2017-12-08T22:23:54.000Z'),
    'price': 45,
    'amount': 1
  }
  ],
  'transactions.btcusd': [{
    timestamp: new Date('2017-09-12T15:27:38.000Z'),
    price: '16933.38',
    amount: '0.07573473'
  }, {
    timestamp: new Date('2017-10-12T15:27:37.000Z'),
    price: '16977.30',
    amount: '0.07629062'
  }, {
    timestamp: new Date('2017-11-12T15:27:37.000Z'),
    price: '16977.30',
    amount: '0.07629062'
  }],
  '1day.btcusd': [{
    timestamp: new Date('2017-09-08T00:00:00.000Z'),
    high: '6',
    low: '1',
    close: '2',
    open: '3',
    volume: '15'
  }, {
    timestamp: new Date('2017-09-10T00:00:00.000Z'),
    high: '4',
    low: '2',
    close: '2',
    open: '3',
    volume: '11'
  }],

  '1day.btceur': [{
    timestamp: new Date('2017-08-01T00:00:00.000Z'),
    'open': 444.47,
    'high': 444.47,
    'low': 444.47,
    'close': 444.47,
    'volume': 0
  }, {
    timestamp: new Date('2017-08-01T00:00:00.000Z'),
    'open': 444.5,
    'high': 444.67,
    'low': 444.36,
    'close': 444.63,
    'volume': 70774
  }, {
    timestamp: new Date('2017-08-02T00:00:00.000Z'),
    'open': 444.52,
    'high': 444.55,
    'low': 444.45,
    'close': 444.5,
    'volume': 44352
  }, {
    timestamp: new Date('2017-08-03T00:00:00.000Z'),
    'open': 444.5,
    'high': 444.56,
    'low': 444.45,
    'close': 444.52,
    'volume': 44677
  }, {
    timestamp: new Date('2017-08-04T00:00:00.000Z'),
    'open': 444.29,
    'high': 444.5,
    'low': 444.2799,
    'close': 444.48,
    'volume': 93237
  }, {
    timestamp: new Date('2017-08-05T00:00:00.000Z'),
    'open': 444.12,
    'high': 444.28,
    'low': 444.12,
    'close': 444.28,
    'volume': 47773
  }, {
    timestamp: new Date('2017-08-06T00:00:00.000Z'),
    'open': 444.2,
    'high': 444.25,
    'low': 444.11,
    'close': 444.13,
    'volume': 38031
  }, {
    timestamp: new Date('2017-08-07T00:00:00.000Z'),
    'open': 444.18,
    'high': 444.25,
    'low': 444.1,
    'close': 444.17,
    'volume': 22060
  }, {
    timestamp: new Date('2017-08-08T00:00:00.000Z'),
    'open': 444.2,
    'high': 444.25,
    'low': 444.18,
    'close': 444.23,
    'volume': 19309
  }, {
    timestamp: new Date('2017-08-09T00:00:00.000Z'),
    'open': 444.2,
    'high': 444.28,
    'low': 444.12,
    'close': 444.2,
    'volume': 23789
  }, {
    timestamp: new Date('2017-08-10T00:00:00.000Z'),
    'open': 444.2,
    'high': 444.23,
    'low': 444.13,
    'close': 444.22,
    'volume': 26616
  }, {
    timestamp: new Date('2017-08-11T00:00:00.000Z'),
    'open': 444.14,
    'high': 444.24,
    'low': 444.14,
    'close': 444.1608,
    'volume': 42259
  }, {
    timestamp: new Date('2017-08-13T00:00:00.000Z'),
    'open': 444.02,
    'high': 444.14,
    'low': 443.98,
    'close': 444.06,
    'volume': 36980
  }, {
    timestamp: new Date('2017-08-12T00:00:00.000Z'),
    'open': 444.11,
    'high': 444.17,
    'low': 444.06,
    'close': 444.1599,
    'volume': 25929
  }, {
    timestamp: new Date('2017-08-14T00:00:00.000Z'),
    'open': 444.12,
    'high': 444.17,
    'low': 443.9427,
    'close': 444.01,
    'volume': 20824
  }, {
    timestamp: new Date('2017-08-15T00:00:00.000Z'),
    'open': 444.021,
    'high': 444.19,
    'low': 444.021,
    'close': 444.14,
    'volume': 39399
  }, {
    timestamp: new Date('2017-08-17T00:00:00.000Z'),
    'open': 444.17,
    'high': 444.17,
    'low': 444,
    'close': 444.02,
    'volume': 32193
  }, {
    timestamp: new Date('2017-08-18T00:00:00.000Z'),
    'open': 444.158,
    'high': 444.19,
    'low': 444.05,
    'close': 444.17,
    'volume': 21202
  }, {
    timestamp: new Date('2017-08-16T00:00:00.000Z'),
    'open': 444.08,
    'high': 444.14,
    'low': 443.9422,
    'close': 444.05,
    'volume': 30008
  }, {
    timestamp: new Date('2017-08-19T00:00:00.000Z'),
    'open': 444.085,
    'high': 444.25,
    'low': 444.08,
    'close': 444.178,
    'volume': 27587
  }, {
    timestamp: new Date('2017-08-20T00:00:00.000Z'),
    'open': 443.9,
    'high': 444.16,
    'low': 443.87,
    'close': 444.08,
    'volume': 40590
  }, {
    timestamp: new Date('2017-08-21T00:00:00.000Z'),
    'open': 443.7727,
    'high': 444,
    'low': 443.7,
    'close': 443.9,
    'volume': 47052
  }, {
    timestamp: new Date('2017-08-22T00:00:00.000Z'),
    'open': 443.73,
    'high': 443.79,
    'low': 443.65,
    'close': 443.76,
    'volume': 24919
  }, {
    timestamp: new Date('2017-08-23T00:00:00.000Z'),
    'open': 443.57,
    'high': 443.8,
    'low': 443.5,
    'close': 443.782,
    'volume': 32408
  }, {
    timestamp: new Date('2017-08-24T00:00:00.000Z'),
    'open': 443.55,
    'high': 443.76,
    'low': 443.47,
    'close': 443.5,
    'volume': 39059
  }, {
    timestamp: new Date('2017-08-25T00:00:00.000Z'),
    'open': 443.5,
    'high': 443.55,
    'low': 443.42,
    'close': 443.516,
    'volume': 28409
  }, {
    timestamp: new Date('2017-08-26T00:00:00.000Z'),
    'open': 443.58,
    'high': 443.64,
    'low': 443.48,
    'close': 443.5,
    'volume': 16105
  }, {
    timestamp: new Date('2017-08-27T00:00:00.000Z'),
    'open': 443.71,
    'high': 443.75,
    'low': 443.522,
    'close': 443.58,
    'volume': 13441
  }, {
    timestamp: new Date('2017-08-28T00:00:00.000Z'),
    'open': 443.43,
    'high': 443.78,
    'low': 443.41,
    'close': 443.68,
    'volume': 46567
  }, {
    timestamp: new Date('2017-08-29T00:00:00.000Z'),
    'open': 443.4,
    'high': 443.51,
    'low': 443.37,
    'close': 443.37,
    'volume': 32064
  }, {
    timestamp: new Date('2017-08-30T00:00:00.000Z'),
    'open': 443.25,
    'high': 443.44,
    'low': 443.22,
    'close': 443.41,
    'volume': 45429
  }, {
    timestamp: new Date('2017-08-31T00:00:00.000Z'),
    'open': 443.56,
    'high': 443.56,
    'low': 443.14,
    'close': 443.22,
    'volume': 70972
  }, {
    timestamp: new Date('2017-09-01T00:00:00.000Z'),
    'open': 444.47,
    'high': 444.47,
    'low': 444.47,
    'close': 444.47,
    'volume': 0
  }, {
    timestamp: new Date('2017-09-01T00:00:00.000Z'),
    'open': 444.5,
    'high': 444.67,
    'low': 444.36,
    'close': 444.63,
    'volume': 70774
  }, {
    timestamp: new Date('2017-09-02T00:00:00.000Z'),
    'open': 444.52,
    'high': 444.55,
    'low': 444.45,
    'close': 444.5,
    'volume': 44352
  }, {
    timestamp: new Date('2017-09-03T00:00:00.000Z'),
    'open': 444.5,
    'high': 444.56,
    'low': 444.45,
    'close': 444.52,
    'volume': 44677
  }, {
    timestamp: new Date('2017-09-04T00:00:00.000Z'),
    'open': 444.29,
    'high': 444.5,
    'low': 444.2799,
    'close': 444.48,
    'volume': 93237
  }, {
    timestamp: new Date('2017-09-05T00:00:00.000Z'),
    'open': 444.12,
    'high': 444.28,
    'low': 444.12,
    'close': 444.28,
    'volume': 47773
  }, {
    timestamp: new Date('2017-09-06T00:00:00.000Z'),
    'open': 444.2,
    'high': 444.25,
    'low': 444.11,
    'close': 444.13,
    'volume': 38031
  }, {
    timestamp: new Date('2017-09-07T00:00:00.000Z'),
    'open': 444.18,
    'high': 444.25,
    'low': 444.1,
    'close': 444.17,
    'volume': 22060
  }, {
    timestamp: new Date('2017-09-08T00:00:00.000Z'),
    'open': 444.2,
    'high': 444.25,
    'low': 444.18,
    'close': 444.23,
    'volume': 19309
  }, {
    timestamp: new Date('2017-09-09T00:00:00.000Z'),
    'open': 444.2,
    'high': 444.28,
    'low': 444.12,
    'close': 444.2,
    'volume': 23789
  }, {
    timestamp: new Date('2017-09-10T00:00:00.000Z'),
    'open': 444.2,
    'high': 444.23,
    'low': 444.13,
    'close': 444.22,
    'volume': 26616
  }, {
    timestamp: new Date('2017-09-11T00:00:00.000Z'),
    'open': 444.14,
    'high': 444.24,
    'low': 444.14,
    'close': 444.1608,
    'volume': 42259
  }, {
    timestamp: new Date('2017-09-12T00:00:00.000Z'),
    'open': 444.11,
    'high': 444.17,
    'low': 444.06,
    'close': 444.1599,
    'volume': 25929
  }, {
    timestamp: new Date('2017-09-13T00:00:00.000Z'),
    'open': 444.02,
    'high': 444.14,
    'low': 443.98,
    'close': 444.06,
    'volume': 36980
  }, {
    timestamp: new Date('2017-09-14T00:00:00.000Z'),
    'open': 444.12,
    'high': 444.17,
    'low': 443.9427,
    'close': 444.01,
    'volume': 20824
  }, {
    timestamp: new Date('2017-09-15T00:00:00.000Z'),
    'open': 444.021,
    'high': 444.19,
    'low': 444.021,
    'close': 444.14,
    'volume': 39399
  }, {
    timestamp: new Date('2017-09-16T00:00:00.000Z'),
    'open': 444.08,
    'high': 444.14,
    'low': 443.9422,
    'close': 444.05,
    'volume': 30008
  }, {
    timestamp: new Date('2017-09-17T00:00:00.000Z'),
    'open': 444.17,
    'high': 444.17,
    'low': 444,
    'close': 444.02,
    'volume': 32193
  }, {
    timestamp: new Date('2017-09-18T00:00:00.000Z'),
    'open': 444.158,
    'high': 444.19,
    'low': 444.05,
    'close': 444.17,
    'volume': 21202
  }, {
    timestamp: new Date('2017-09-19T00:00:00.000Z'),
    'open': 444.085,
    'high': 444.25,
    'low': 444.08,
    'close': 444.178,
    'volume': 27587
  }, {
    timestamp: new Date('2017-09-20T00:00:00.000Z'),
    'open': 443.9,
    'high': 444.16,
    'low': 443.87,
    'close': 444.08,
    'volume': 40590
  }, {
    timestamp: new Date('2017-09-21T00:00:00.000Z'),
    'open': 443.7727,
    'high': 444,
    'low': 443.7,
    'close': 443.9,
    'volume': 47052
  }, {
    timestamp: new Date('2017-09-22T00:00:00.000Z'),
    'open': 443.73,
    'high': 443.79,
    'low': 443.65,
    'close': 443.76,
    'volume': 24919
  }, {
    timestamp: new Date('2017-09-23T00:00:00.000Z'),
    'open': 443.57,
    'high': 443.8,
    'low': 443.5,
    'close': 443.782,
    'volume': 32408
  }, {
    timestamp: new Date('2017-09-24T00:00:00.000Z'),
    'open': 443.55,
    'high': 443.76,
    'low': 443.47,
    'close': 443.5,
    'volume': 39059
  }, {
    timestamp: new Date('2017-09-25T00:00:00.000Z'),
    'open': 443.5,
    'high': 443.55,
    'low': 443.42,
    'close': 443.516,
    'volume': 28409
  }, {
    timestamp: new Date('2017-09-26T00:00:00.000Z'),
    'open': 443.58,
    'high': 443.64,
    'low': 443.48,
    'close': 443.5,
    'volume': 16105
  }, {
    timestamp: new Date('2017-09-27T00:00:00.000Z'),
    'open': 443.71,
    'high': 443.75,
    'low': 443.522,
    'close': 443.58,
    'volume': 13441
  }, {
    timestamp: new Date('2017-09-28T00:00:00.000Z'),
    'open': 443.43,
    'high': 443.78,
    'low': 443.41,
    'close': 443.68,
    'volume': 46567
  }, {
    timestamp: new Date('2017-09-30T00:00:00.000Z'),
    'open': 443.25,
    'high': 443.44,
    'low': 443.22,
    'close': 443.41,
    'volume': 45429
  }, {
    timestamp: new Date('2017-09-29T00:00:00.000Z'),
    'open': 443.4,
    'high': 443.51,
    'low': 443.37,
    'close': 443.37,
    'volume': 32064
  }]
}
