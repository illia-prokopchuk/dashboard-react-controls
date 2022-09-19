"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _classnames = _interopRequireDefault(require("classnames"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _reactFinalForm = require("react-final-form");

var _TextTooltipTemplate = _interopRequireDefault(require("../TooltipTemplate/TextTooltipTemplate"));

var _Tip = _interopRequireDefault(require("../Tip/Tip"));

var _Tooltip = _interopRequireDefault(require("../Tooltip/Tooltip"));

var _invalid = require("../../images/invalid.svg");

require("./formTextarea.scss");

var _jsxRuntime = require("react/jsx-runtime");

var _excluded = ["className", "disabled", "focused", "iconClass", "invalidText", "label", "maxLength", "name", "onBlur", "onChange", "required", "textAreaIcon", "tip", "withoutBorder"];

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

var FormTextarea = /*#__PURE__*/_react.default.forwardRef(function (_ref, ref) {
  var className = _ref.className,
      disabled = _ref.disabled,
      focused = _ref.focused,
      iconClass = _ref.iconClass,
      invalidText = _ref.invalidText,
      label = _ref.label,
      maxLength = _ref.maxLength,
      name = _ref.name,
      onBlur = _ref.onBlur,
      onChange = _ref.onChange,
      required = _ref.required,
      textAreaIcon = _ref.textAreaIcon,
      tip = _ref.tip,
      withoutBorder = _ref.withoutBorder,
      textareaProps = _objectWithoutProperties(_ref, _excluded);

  var _useField = (0, _reactFinalForm.useField)(name),
      input = _useField.input,
      meta = _useField.meta;

  var _useState = (0, _react.useState)(false),
      _useState2 = _slicedToArray(_useState, 2),
      isInvalid = _useState2[0],
      setIsInvalid = _useState2[1];

  var _useState3 = (0, _react.useState)(input.value.length),
      _useState4 = _slicedToArray(_useState3, 2),
      textAreaCount = _useState4[0],
      setTextAreaCount = _useState4[1];

  var textAreaRef = /*#__PURE__*/_react.default.createRef();

  var formFieldClassNames = (0, _classnames.default)('form-field-textarea', className);
  var labelClassNames = (0, _classnames.default)('form-field__label', disabled && 'form-field__label-disabled');
  var textAreaClassNames = (0, _classnames.default)('form-field__wrapper', disabled && 'form-field__wrapper-disabled', isInvalid && 'form-field__wrapper-invalid', withoutBorder && 'without-border');
  (0, _react.useEffect)(function () {
    if (focused) {
      textAreaRef.current.focus();
    }
  }, [focused, textAreaRef]);
  (0, _react.useEffect)(function () {
    setIsInvalid(meta.invalid && (meta.validating || meta.modified || meta.submitFailed && meta.touched));
  }, [meta.invalid, meta.modified, meta.submitFailed, meta.touched, meta.validating]);

  var handleInputBlur = function handleInputBlur(event) {
    input.onBlur(event);
    onBlur && onBlur(event);
  };

  var handleInputChange = function handleInputChange(event) {
    input.onChange(event);
    setTextAreaCount(event.target.value.length);
    onChange && onChange(event.target.value);
  };

  var handleInputFocus = function handleInputFocus(event) {
    input.onFocus(event);
  };

  var validateField = function validateField(value) {
    var valueToValidate = value !== null && value !== void 0 ? value : '';
    var validationError = null;

    if (valueToValidate.startsWith(' ')) {
      validationError = {
        name: 'empty',
        label: invalidText
      };
    } else if (required && valueToValidate.trim().length === 0) {
      validationError = {
        name: 'required',
        label: 'This field is required'
      };
    }

    return validationError;
  };

  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactFinalForm.Field, {
    validate: validateField,
    name: name,
    children: function children(_ref2) {
      var _meta$error$label, _meta$error;

      var input = _ref2.input,
          meta = _ref2.meta;
      return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
        ref: ref,
        className: formFieldClassNames,
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
          className: labelClassNames,
          children: label && /*#__PURE__*/(0, _jsxRuntime.jsxs)("label", {
            "data-testid": "label",
            htmlFor: input.name,
            children: [label, required && /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
              className: "form-field__label-mandatory",
              children: " *"
            })]
          })
        }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
          className: textAreaClassNames,
          children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
            className: "form-field__control",
            children: /*#__PURE__*/(0, _jsxRuntime.jsx)("textarea", _objectSpread(_objectSpread({
              "data-testid": "textarea",
              id: input.name,
              maxLength: maxLength,
              ref: textAreaRef,
              required: isInvalid || required
            }, _objectSpread(_objectSpread({
              disabled: disabled
            }, textareaProps), input)), {}, {
              onBlur: handleInputBlur,
              onChange: handleInputChange,
              onFocus: handleInputFocus
            }))
          }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
            className: "form-field__icons",
            children: [isInvalid && /*#__PURE__*/(0, _jsxRuntime.jsx)(_Tooltip.default, {
              className: "form-field__warning",
              template: /*#__PURE__*/(0, _jsxRuntime.jsx)(_TextTooltipTemplate.default, {
                text: (_meta$error$label = (_meta$error = meta.error) === null || _meta$error === void 0 ? void 0 : _meta$error.label) !== null && _meta$error$label !== void 0 ? _meta$error$label : invalidText,
                warning: true
              }),
              children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_invalid.ReactComponent, {})
            }), tip && !required && /*#__PURE__*/(0, _jsxRuntime.jsx)(_Tip.default, {
              text: tip,
              className: "form-field__tip"
            }), textAreaIcon && /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
              "data-testid": "textarea__icon",
              className: iconClass,
              children: textAreaIcon
            })]
          })]
        }), maxLength && /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
          className: "form-field__counter",
          children: "".concat(maxLength - textAreaCount, " ").concat(maxLength - textAreaCount !== 1 ? 'characters' : 'character', " left")
        })]
      });
    }
  });
});

FormTextarea.defaultProps = {
  className: '',
  disabled: false,
  focused: false,
  iconClass: '',
  textAreaIcon: null,
  invalidText: 'This field is invalid',
  label: '',
  maxLength: null,
  onBlur: function onBlur() {},
  onChange: function onChange() {},
  placeholder: '',
  required: false,
  rows: 3,
  tip: ''
};
FormTextarea.propTypes = {
  className: _propTypes.default.string,
  disabled: _propTypes.default.bool,
  focused: _propTypes.default.bool,
  iconClass: _propTypes.default.string,
  textAreaIcon: _propTypes.default.element,
  invalidText: _propTypes.default.string,
  label: _propTypes.default.string,
  maxLength: _propTypes.default.number,
  name: _propTypes.default.string.isRequired,
  onBlur: _propTypes.default.func,
  onChange: _propTypes.default.func,
  placeholder: _propTypes.default.string,
  required: _propTypes.default.bool,
  tip: _propTypes.default.string
};

var _default = /*#__PURE__*/_react.default.memo(FormTextarea);

exports.default = _default;