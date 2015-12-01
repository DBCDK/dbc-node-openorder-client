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

var _xml2js = require('xml2js');

/**
 * Retrieves data from the webservice based on the parameters given
 *
 * @param {Object} params Parameters for the request
 * @return {Promise}
 */
function sendOpenOrderRequest(endpoint, params) {
  return new Promise(function (resolve, reject) {
    var options = {
      url: endpoint,
      qs: params
    };
    (0, _request2['default'])(options, function (error, response) {
      if (response.statusCode === 200) {
        (0, _xml2js.parseString)(response.body, function (err, res) {
          if (!err) {
            res.pids = params.pid;
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

function checkOrderPolicy(endpoint, defaults, values) {
  var params = {
    action: 'checkOrderPolicy',
    outputType: 'xml',
    pickUpAgencyId: values.agencyId,
    pid: values.pids,
    groupIdAut: defaults.groupIdAut,
    passwordAut: defaults.passwordAut,
    userIdAut: defaults.userIdAut,
    serviceRequester: defaults.serviceRequester
  };
  var response = new Promise(function (resolve) {
    var res = {
      checkOrderPolicyResponse: {
        orderPossible: ['true']
      },
      pids: values.pids
    };
    resolve(res);
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
    outputType: 'xml',
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
  return sendOpenOrderRequest(params);
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