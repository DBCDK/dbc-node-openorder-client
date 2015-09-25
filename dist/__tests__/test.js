'use strict';

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

var _chai = require('chai');

var _clientJs = require('../client.js');

var OpenOrder = _interopRequireWildcard(_clientJs);

describe('Test Open Order checkOrderPolicy', function () {

  it('Assert a positive result on checkOrderPolicy request', function (done) {
    this.timeout(5000);
    setTimeout(done, 5000);
    var config = {
      endpoint: 'https://openorder.addi.dk/2.6.next',
      user: '',
      group: '',
      password: '',
      serviceRequester: 'PallesGavebod'
    };

    OpenOrder.init(config);
    var result = OpenOrder.checkOrderPolicy({
      pids: ['870970-basis:28183488'],
      agencyId: '710100',
      loggedIn: true
    });

    result.then(function (policyResult) {
      _chai.assert.equal(policyResult.checkOrderPolicyResponse.orderPossible[0], 'true');
      done();
    });
  });

  it('Assert a positive result two pids from checkOrderPolicy request', function (done) {
    this.timeout(5000);
    setTimeout(done, 5000);
    var config = {
      endpoint: 'https://openorder.addi.dk/2.6.next',
      user: '',
      group: '',
      password: '',
      serviceRequester: 'PallesGavebod'
    };

    OpenOrder.init(config);
    var result = OpenOrder.checkOrderPolicy({
      pids: ['870970-basis:29253153', '870970-basis:27986404'],
      agencyId: '710100',
      loggedIn: true
    });

    result.then(function (policyResult) {
      _chai.assert.equal(policyResult.checkOrderPolicyResponse.orderPossible[0], 'true');
      done();
    });
  });

  it('Assert a negative result on checkOrderPolicy request', function (done) {
    this.timeout(5000);
    setTimeout(done, 5000);
    var config = {
      endpoint: 'https://openorder.addi.dk/2.6.next',
      user: '',
      group: '',
      password: '',
      serviceRequester: 'PallesGavebod'
    };

    OpenOrder.init(config);
    var result = OpenOrder.checkOrderPolicy({
      pids: ['870970-basis:28183488'],
      agencyId: '772700',
      loggedIn: true
    });

    result.then(function (policyResult) {
      _chai.assert.equal(policyResult.checkOrderPolicyResponse.orderPossible[0], 'false');
      done();
    });
  });
});

/* As this test is run against a live (test) service, and requests
  will be placed every time the test is run, it has only been added for
  development purposes.
  */

describe('Test Open Order placeOrder', function () {

  /* it('Assert a positive result on placeOrder request', function(done) {
    this.timeout(5000);
    setTimeout(done, 5000);
    const config = {
      endpoint: 'https://openorder.addi.dk/2.6.next',
      user: '',
      group: '',
      password: '',
      serviceRequester: 'PallesGavebod',
      orderSystem: 'pallesgavebod'
    };
     OpenOrder.init(config);
    let result = OpenOrder.placeOrder({
      pids: ['870970-basis:28183488'],
      agencyId: '710100',
      userId: '1231231230',
      needBeforeDate: '2016-02-06T00:00:00.000+01:00'
    });
    result.then(function (orderResult) {
      assert.property(orderResult.placeOrderResponse, 'orderPlaced');
      done();
    });
  });
   it('Assert a negative result on placeOrder request', function(done) {
    this.timeout(5000);
    setTimeout(done, 5000);
    const config = {
      endpoint: 'https://openorder.addi.dk/2.6.next',
      user: '',
      group: '',
      password: '',
      serviceRequester: 'PallesGavebod',
      orderSystem: 'pallesgavebod'
    };
     OpenOrder.init(config);
    let result = OpenOrder.placeOrder({
      pids: ['870970-basis:28183481'],
      agencyId: '710100',
      userId: '1231231230',
      needBeforeDate: '2016-02-06T00:00:00.000+01:00'
    });
    result.then(function (orderResult) {
      assert.notProperty(orderResult.placeOrderResponse, 'orderPlaced');
      assert.property(orderResult.placeOrderResponse, 'orderNotPlaced');
      done();
    });
  }); */

});