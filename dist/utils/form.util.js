"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setFieldState = exports.parseObjectToKeyValue = exports.isEqualValues = exports.generateObjectFromKeyValue = void 0;

var _lodash = require("lodash");

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

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

var generateObjectFromKeyValue = function generateObjectFromKeyValue() {
  var keyValueList = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  return keyValueList.reduce(function (acc, keyValue) {
    acc[keyValue.data.key] = keyValue.data.value;
    return acc;
  }, {});
};

exports.generateObjectFromKeyValue = generateObjectFromKeyValue;

var parseObjectToKeyValue = function parseObjectToKeyValue() {
  var object = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  return Object.entries(object).map(function (_ref) {
    var _ref2 = _slicedToArray(_ref, 2),
        key = _ref2[0],
        value = _ref2[1];

    return {
      data: {
        key: key,
        value: value
      }
    };
  });
};

exports.parseObjectToKeyValue = parseObjectToKeyValue;