'use strict';

import {assert} from 'chai';
import * as OpenOrder from '../client.js';

describe('Dummy test', () => {

  it('makes a dummy test', () => {
    assert.equal(true, true);
  });

  it('Assert positive result', function(done) {
    this.timeout(3000);
    setTimeout(done, 3000);
    const config = {
			endpoint: 'https://openorder.addi.dk/2.6.next',
			user: '',
      group: '',
      password: '',
      serviceRequester: 'PallesGavebod'
		};

    OpenOrder.init(config);
    let result = OpenOrder.checkOrderPolicy({
			pid: '870970-basis:28183488',
			pickUpAgencyId: '710100'
		});

    result.then(function (policyResult) {
      assert.equal(policyResult.checkOrderPolicyResponse.orderPossible[0], 'true');
      done();
    });
  });

  it('Assert negative result', function(done) {
    this.timeout(3000);
    setTimeout(done, 3000);
    const config = {
			endpoint: 'https://openorder.addi.dk/2.6.next',
			user: '',
      group: '',
      password: '',
      serviceRequester: 'PallesGavebod'
		};

    OpenOrder.init(config);
    let result = OpenOrder.checkOrderPolicy({
			pid: '870970-basis:28183488',
			pickUpAgencyId: '772700'
		});

    result.then(function (policyResult) {
      assert.equal(policyResult.checkOrderPolicyResponse.orderPossible[0], 'false');
      done();
    });
  });

});
