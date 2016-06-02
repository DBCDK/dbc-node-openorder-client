'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.checkOrderPolicy = checkOrderPolicy;
exports.placeOrder = placeOrder;
exports['default'] = OpenOrderClient;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _request = require('request');

var _request2 = _interopRequireDefault(_request);

/**
 * Retrieves data from the webservice based on the parameters given
 *
 * @param {Object} params Parameters for the request
 * @return {Promise}
 */
var maxRetries = 5;
function sendOpenOrderRequest(endpoint, params) {
  var retries = arguments.length <= 2 || arguments[2] === undefined ? 0 : arguments[2];

  return new Promise(function (resolve, reject) {
    var options = {
      url: endpoint,
      qs: params
    };
    (0, _request2['default'])(options, function (error, response) {
      if (error || !response) {
        return reject(error);
      }

      var resp = JSON.parse(response.body);
      if (resp.checkOrderPolicyResponse && resp.checkOrderPolicyResponse.checkOrderPolicyError && resp.checkOrderPolicyResponse.checkOrderPolicyError.$ === 'service_unavailable') {
        reject('service_unavailable');
      }

      return resolve(resp);
    });
  })['catch'](function (err) {
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

function checkOrderPolicy(endpoint, defaults, values) {
  var params = {
    action: 'checkOrderPolicy',
    outputType: 'json',
    pickUpAgencyId: values.agencyId,
    pid: values.pids,
    groupIdAut: defaults.groupIdAut,
    passwordAut: defaults.passwordAut,
    userIdAut: defaults.userIdAut,
    serviceRequester: defaults.serviceRequester
  };

  var response = Promise.resolve({
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

function placeOrder(endpoint, defaults, values) {
  var params = {
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

function OpenOrderClient(config) {

  var defaults = {
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