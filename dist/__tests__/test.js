'use strict';

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

var _chai = require('chai');

var _clientJs = require('../client.js');

var OpenOrder = _interopRequireWildcard(_clientJs);

describe('Test Open Order checkOrderPolicy', function () {

  it('Assert a positive result', function (done) {
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
      agencyId: '710100'
    });

    result.then(function (policyResult) {
      _chai.assert.equal(policyResult.checkOrderPolicyResponse.orderPossible[0], 'true');
      done();
    });
  });

  it('Assert a positive result two pids', function (done) {
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
      agencyId: '710100'
    });

    result.then(function (policyResult) {
      _chai.assert.equal(policyResult.checkOrderPolicyResponse.orderPossible[0], 'true');
      done();
    });
  });

  it('Assert a negative result', function (done) {
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
      agencyId: '772700'
    });

    result.then(function (policyResult) {
      _chai.assert.equal(policyResult.checkOrderPolicyResponse.orderPossible[0], 'false');
      done();
    });
  });
});