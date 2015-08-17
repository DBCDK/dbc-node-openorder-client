'use strict';

import {Promise} from 'es6-promise';
import request from 'request';

let endpoint = null;

let defaults = {};

function sendOpenOrderRequest(params) {
  return new Promise((resolve) => {
    let options = {
      url: endpoint,
      qs: params
    };
    request(options, function (error, response) {
      resolve(response);
    });
  });
}

export function checkOrderPolicy(values) {
  const params = {
    action: 'checkOrderPolicy',
    pickUpAgencyId: values.pickUpAgencyId,
    pid: values.pid,
    groupIdAut: defaults.groupIdAut,
    passwordAut: defaults.passwordAut,
    userIdAut: defaults.userIdAut,
    serviceRequester: defaults.serviceRequester
  };
  return sendOpenOrderRequest(params);
}

export function placeOrder(values) {
  const params = {
    action: 'placeOrder',
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
