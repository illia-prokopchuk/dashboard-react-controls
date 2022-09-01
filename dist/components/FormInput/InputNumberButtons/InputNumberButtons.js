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