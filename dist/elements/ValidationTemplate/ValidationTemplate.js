"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _success_done = require("../../images/success_done.svg");

var _close = require("../../images/close.svg");

require("./ValidationTemplate.scss");

var _jsxRuntime = require("react/jsx-runtime");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
var ValidationTemplate = function ValidationTemplate(_ref) {
  var valid = _ref.valid,
      validationMessage = _ref.validationMessage;
  var validationClasses = (0, _classnames.default)('validation-option', valid && 'text-muted');
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("li", {
    className: validationClasses,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("i", {
      className: "validation-option__icon",
      children: valid ? /*#__PURE__*/(0, _jsxRuntime.jsx)(_success_done.ReactComponent, {
        className: "validation-option__icon_valid"
      }) : /*#__PURE__*/(0, _jsxRuntime.jsx)(_close.ReactComponent, {
        className: "validation-option__icon_invalid"
      })
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
      children: validationMessage
    })]
  });
};

ValidationTemplate.propTypes = {
  valid: _propTypes.default.bool.isRequired,
  validationMessage: _propTypes.default.string.isRequired
};
var _default = ValidationTemplate;
exports.default = _default;