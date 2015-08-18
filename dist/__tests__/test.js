'use strict';

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

var _chai = require('chai');

var _clientJs = require('../client.js');

var OpenOrder = _interopRequireWildcard(_clientJs);

describe('Dummy test', function () {

  it('makes a dummy test', function () {
    _chai.assert.equal(true, true);
  });

  it('Assert positive result', function (done) {
    this.timeout(3000);
    setTimeout(done, 3000);
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
      pickUpAgencyId: '710100'
    });

    result.then(function (policyResult) {
      _chai.assert.equal(policyResult.checkOrderPolicyResponse.orderPossible[0], 'true');
      done();
    });
  });

  it('Assert positive result two pids', function (done) {
    this.timeout(3000);
    setTimeout(done, 3000);
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
      pickUpAgencyId: '710100'
    });

    result.then(function (policyResult) {
      _chai.assert.equal(policyResult.checkOrderPolicyResponse.orderPossible[0], 'true');
      done();
    });
  });

  it('Assert negative result', function (done) {
    this.timeout(3000);
    setTimeout(done, 3000);
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
      pickUpAgencyId: '772700'
    });

    result.then(function (policyResult) {
      _chai.assert.equal(policyResult.checkOrderPolicyResponse.orderPossible[0], 'false');
      done();
    });
  });
});