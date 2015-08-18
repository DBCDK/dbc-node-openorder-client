'use strict';

import {Promise} from 'es6-promise';
import request from 'request';
import {parseString} from 'xml2js';

let endpoint = null;

let defaults = {};

/**
 * Retrieves data from the webservice based on the parameters given
 *
 * @param {Object} params Parameters for the request
 * @return {Promise}
 */
function sendOpenOrderRequest(params) {
  return new Promise((resolve, reject) => {
    let options = {
      url: endpoint,
      qs: params
    };
    request(options, function (error, response) {
      if (response.statusCode === 200) {
        parseString(response.body, function (err, res) {
          if (!err) {
            resolve(res);
          }
        });
      } else {
        reject({
          type: 'Error',
          statusCode: response.statusCode,
          statusMessage: response.statusMessage,
          response: response
        });
      }
    });
  });
}

/**
 * Constructs the object of parameters for OpenOrder check order policy request.
 *
 * @param {Object} values Object with the necessary parameters
 * @return {Promise}
 */
export function checkOrderPolicy(values) {
  const params = {
    action: 'checkOrderPolicy',
    outputType: 'xml',
    pickUpAgencyId: values.pickUpAgencyId,
    pid: values.pid,
    groupIdAut: defaults.groupIdAut,
    passwordAut: defaults.passwordAut,
    userIdAut: defaults.userIdAut,
    serviceRequester: defaults.serviceRequester
  };
  return sendOpenOrderRequest(params);
}

/**
 * Constructs the object of parameters for OpenOrder place order request.
 *
 * @param {Object} values Object with the necessary parameters
 * @return {Promise}
 */
export function placeOrder(values) {
  const params = {
    action: 'placeOrder',
    outputType: 'xml',
    pickUpAgencyId: values.pickUpAgencyId,
    pid: values.pid,
    userId: values.userId,
    groupIdAut: defaults.groupIdAut,
    passwordAut: defaults.passwordAut,
    userIdAut: defaults.userIdAut,
    serviceRequester: defaults.serviceRequester,
    orderSystem: defaults.orderSystem
  };
  return sendOpenOrderRequest(params);
}

export const METHODS = {
  checkOrderPolicy: checkOrderPolicy,
  placeOrder: placeOrder
};

/**
 * Setting the necessary paramerters for the client to be usable.
 * The endpoint is only set if endpoint is null to allow setting it through
 * environment variables.
 *
 * @param {Object} config Config object with the necessary parameters to use
 * the webservice
 */
export function init(config) {
  if (!endpoint) {
    endpoint = config.endpoint;
  }

  defaults = {
    groupIdAut: config.group,
    passwordAut: config.password,
    userIdAut: config.user,
    serviceRequester: config.serviceRequester,
    orderSystem: config.orderSystem
  };

  return METHODS;
}
