"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _lodash = require("lodash");

var _rangeArrowSmall = require("../../../images/range-arrow-small.svg");

require("./InputNumberButtons.scss");

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
var InputNumberButtons = function InputNumberButtons(_ref) {
  var disabled = _ref.disabled,
      min = _ref.min,
      max = _ref.max,
      onChange = _ref.onChange,
      step = _ref.step,
      value = _ref.value;

  var handleIncrease = function handleIncrease(event) {
    event.preventDefault();
    if (max && +value >= +max) return;
    var currentValue = isCurrentValueEmpty() ? +step : +value + +step;
    var nextValue = isInteger(currentValue) ? currentValue : currentValue.toFixed(3);
    onChange(nextValue);
  };

  var handleDecrease = function handleDecrease(event) {
    event.preventDefault();
    if (value <= 0 || +value <= +min) return;
    var currentValue = isCurrentValueEmpty() ? -step : +value - +step;
    var nextValue = isInteger(currentValue) ? currentValue : currentValue.toFixed(3);
    onChange(nextValue);
  };

  var isCurrentValueEmpty = function isCurrentValueEmpty() {
    return (0, _lodash.isNil)(value) || value === '';
  };

  var isInteger = function isInteger(number) {
    return Number(number) === number && number % 1 === 0;
  };

  return /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
    "data-testid": "range-input-container",
    className: "form-field-range",
    children: /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
      className: "range__buttons",
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("button", {
        "data-testid": "btn-increase",
        className: "range__button range__button-increase",
        disabled: disabled,
        onClick: handleIncrease,
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_rangeArrowSmall.ReactComponent, {
          className: "increase"
        })
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)("button", {
        "data-testid": "btn-decrease",
        className: "range__button range__button-decrease",
        disabled: disabled,
        onClick: handleDecrease,
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_rangeArrowSmall.ReactComponent, {
          className: "decrease"
        })
      })]
    })
  });
};

InputNumberButtons.defaultProps = {
  disabled: false,
  min: null,
  max: null,
  step: '1'
};
InputNumberButtons.propTypes = {
  disabled: _propTypes.default.bool,
  min: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.number]),
  max: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.number]),
  onChange: _propTypes.default.func.isRequired,
  step: _propTypes.default.string,
  value: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.number]).isRequired
};

var _default = /*#__PURE__*/_react.default.memo(InputNumberButtons);

exports.default = _default;