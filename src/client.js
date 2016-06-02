'use strict';

import request from 'request';
import {parseString} from 'xml2js';

/**
 * Retrieves data from the webservice based on the parameters given
 *
 * @param {Object} params Parameters for the request
 * @return {Promise}
 */
const maxRetries = 5;
function sendOpenOrderRequest(endpoint, params, retries = 0) {
  return new Promise((resolve, reject) => {
    let options = {
      url: endpoint,
      qs: params
    };
    request(options, function (error, response) {
      if (error || !response) {
        return reject(error);
      }

      const resp = JSON.parse(response.body);
      if (resp.checkOrderPolicyResponse && resp.checkOrderPolicyResponse.checkOrderPolicyError && resp.checkOrderPolicyResponse.checkOrderPolicyError.$ === 'service_unavailable') {
        reject('service_unavailable');
      }

      return resolve(resp);
    });
  }).catch((err) => {
    if (err === 'service_unavailable' && retries <= maxRetries) {
      return sendOpenOrderRequest(endpoint, params, retries + 1);
    }

    return Promise.reject(err);
  });
}

/**
 * Constructs the object of parameters for OpenOrder check order policy request.
 *
 * @param {Object} values Object with the necessary parameters
 * @return {Promise}
 */
export function checkOrderPolicy(endpoint, defaults, values) {
  const params = {
    action: 'checkOrderPolicy',
    outputType: 'json',
    pickUpAgencyId: values.agencyId,
    pid: values.pids,
    groupIdAut: defaults.groupIdAut,
    passwordAut: defaults.passwordAut,
    userIdAut: defaults.userIdAut,
    serviceRequester: defaults.serviceRequester
  };

  let response = Promise.resolve({
    checkOrderPolicyResponse: {
      orderPossible: ['true']
    },
    pids: values.pids
  });

  if (values.loggedIn === true) {
    response = sendOpenOrderRequest(endpoint, params);
  }

  return response;
}

/**
 * Constructs the object of parameters for OpenOrder place order request.
 *
 * @param {Object} values Object with the necessary parameters
 * @return {Promise}
 */
export function placeOrder(endpoint, defaults, values) {
  const params = {
    action: 'placeOrder',
    outputType: 'json',
    pickUpAgencyId: values.agencyId,
    pid: values.pids,
    userId: values.userId,
    needBeforeDate: values.needBeforeDate,
    groupIdAut: defaults.groupIdAut,
    passwordAut: defaults.passwordAut,
    userIdAut: defaults.userIdAut,
    serviceRequester: defaults.serviceRequester,
    orderSystem: defaults.orderSystem
  };
  return sendOpenOrderRequest(endpoint, params);
}

/**
 * Setting the necessary paramerters for the client to be usable.
 * The endpoint is only set if endpoint is null to allow setting it through
 * environment variables.
 *
 * @param {Object} config Config object with the necessary parameters to use
 * the webservice
 */
export default function OpenOrderClient(config) {

  const defaults = {
    groupIdAut: config.group,
    passwordAut: config.password,
    userIdAut: config.user,
    serviceRequester: config.serviceRequester,
    orderSystem: config.orderSystem
  };

  return {
    checkOrderPolicy: checkOrderPolicy.bind(null, config.endpoint, defaults),
    placeOrder: placeOrder.bind(null, config.endpoint, defaults)
  };
}
