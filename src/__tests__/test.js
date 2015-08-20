'use strict';

import {assert} from 'chai';
import * as OpenOrder from '../client.js';

describe('Test Open Order checkOrderPolicy', () => {

  it('Assert a positive result', function(done) {
    this.timeout(5000);
    setTimeout(done, 5000);
    const config = {
      endpoint: 'https://openorder.addi.dk/2.6.next',
      user: '',
      group: '',
      password: '',
      serviceRequester: 'PallesGavebod'
    };

    OpenOrder.init(config);
    let result = OpenOrder.checkOrderPolicy({
      pids: ['870970-basis:28183488'],
      pickUpAgencyId: '710100'
    });

    result.then(function (policyResult) {
      assert.equal(policyResult.checkOrderPolicyResponse.orderPossible[0], 'true');
      done();
    });
  });

  it('Assert a positive result two pids', function(done) {
    this.timeout(5000);
    setTimeout(done, 5000);
    const config = {
      endpoint: 'https://openorder.addi.dk/2.6.next',
      user: '',
      group: '',
      password: '',
      serviceRequester: 'PallesGavebod'
    };

    OpenOrder.init(config);
    let result = OpenOrder.checkOrderPolicy({
      pids: ['870970-basis:29253153', '870970-basis:27986404'],
      pickUpAgencyId: '710100'
    });

    result.then(function (policyResult) {
      assert.equal(policyResult.checkOrderPolicyResponse.orderPossible[0], 'true');
      done();
    });
  });

  it('Assert a negative result', function(done) {
    this.timeout(5000);
    setTimeout(done, 5000);
    const config = {
      endpoint: 'https://openorder.addi.dk/2.6.next',
      user: '',
      group: '',
      password: '',
      serviceRequester: 'PallesGavebod'
    };

    OpenOrder.init(config);
    let result = OpenOrder.checkOrderPolicy({
      pids: ['870970-basis:28183488'],
      pickUpAgencyId: '772700'
    });

    result.then(function (policyResult) {
      assert.equal(policyResult.checkOrderPolicyResponse.orderPossible[0], 'false');
      done();
    });
  });

});
