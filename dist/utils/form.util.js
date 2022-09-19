"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setFieldState = exports.isEqualValues = void 0;

var _lodash = require("lodash");

/*
Copyright 2022 Iguazio Systems Ltd.
Licensed under the Apache License, Version 2.0 (the "License") with
an addition restriction as set forth herein. You may not use this
file except in compliance with the License. You may obtain a copy of
the License at http://www.apache.org/licenses/LICENSE-2.0.
Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or
implied. See the License for the specific language governing
permissions and limitations under the License.
In addition, you may not use the software for any purposes that are
illegal under applicable law, and the grant of the foregoing license
under the Apache 2.0 license is conditioned upon your compliance with
such restriction.
*/
var setFieldState = function setFieldState(args, state) {
  var fieldName = args[0];
  var states = args[1];
  var field = state.fields[fieldName];

  if (field) {
    for (var stateName in states) {
      (0, _lodash.set)(field, stateName, states[stateName]);
    }
  }
};

exports.setFieldState = setFieldState;

var isEqualValues = function isEqualValues(initialValues, values) {
  var replacer = function replacer(key, value) {
    if (value === '') {
      return undefined;
    }

    return value;
  };

  return (0, _lodash.isEqual)(JSON.stringify(initialValues, replacer), JSON.stringify(values, replacer));
};

exports.isEqualValues = isEqualValues;