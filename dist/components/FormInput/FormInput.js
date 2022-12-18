"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _lodash = require("lodash");

var _reactFinalForm = require("react-final-form");

var _InputNumberButtons = _interopRequireDefault(require("./InputNumberButtons/InputNumberButtons"));

var _OptionsMenu = _interopRequireDefault(require("../../elements/OptionsMenu/OptionsMenu"));

var _TextTooltipTemplate = _interopRequireDefault(require("../TooltipTemplate/TextTooltipTemplate"));

var _Tip = _interopRequireDefault(require("../Tip/Tip"));

var _Tooltip = _interopRequireDefault(require("../Tooltip/Tooltip"));

var _ValidationTemplate = _interopRequireDefault(require("../../elements/ValidationTemplate/ValidationTemplate"));

var _validation = require("../../utils/validation.util");

var _useDetectOutsideClick = require("../../hooks/useDetectOutsideClick");

var _types = require("../../types");

var _invalid = require("../../images/invalid.svg");

var _popout = require("../../images/popout.svg");

var _warning = require("../../images/warning.svg");

require("./formInput.scss");

var _jsxRuntime = require("react/jsx-runtime");

var _excluded = ["className", "density", "disabled", "focused", "iconClass", "inputIcon", "invalidText", "label", "link", "name", "onBlur", "onChange", "pattern", "required", "suggestionList", "tip", "validationRules", "validator", "withoutBorder"];

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

var FormInput = /*#__PURE__*/_react.default.forwardRef(function (_ref, ref) {
  var _ref2;

  var className = _ref.className,
      density = _ref.density,
      disabled = _ref.disabled,
      focused = _ref.focused,
      iconClass = _ref.iconClass,
      inputIcon = _ref.inputIcon,
      invalidText = _ref.invalidText,
      label = _ref.label,
      link = _ref.link,
      name = _ref.name,
      onBlur = _ref.onBlur,
      onChange = _ref.onChange,
      pattern = _ref.pattern,
      required = _ref.required,
      suggestionList = _ref.suggestionList,
      tip = _ref.tip,
      rules = _ref.validationRules,
      validator = _ref.validator,
      withoutBorder = _ref.withoutBorder,
      inputProps = _objectWithoutProperties(_ref, _excluded);

  var _useField = (0, _reactFinalForm.useField)(name),
      input = _useField.input,
      meta = _useField.meta;

  var _useState = (0, _react.useState)(false),
      _useState2 = _slicedToArray(_useState, 2),
      isInvalid = _useState2[0],
      setIsInvalid = _useState2[1];

  var _useState3 = (0, _react.useState)(false),
      _useState4 = _slicedToArray(_useState3, 2),
      isFocused = _useState4[0],
      setIsFocused = _useState4[1];

  var _useState5 = (0, _react.useState)(''),
      _useState6 = _slicedToArray(_useState5, 2),
      typedValue = _useState6[0],
      setTypedValue = _useState6[1];

  var _useState7 = (0, _react.useState)(RegExp(pattern)),
      _useState8 = _slicedToArray(_useState7, 1),
      validationPattern = _useState8[0];

  var _useState9 = (0, _react.useState)(rules),
      _useState10 = _slicedToArray(_useState9, 2),
      validationRules = _useState10[0],
      setValidationRules = _useState10[1];

  var _useState11 = (0, _react.useState)(false),
      _useState12 = _slicedToArray(_useState11, 2),
      showValidationRules = _useState12[0],
      setShowValidationRules = _useState12[1];

  var wrapperRef = (0, _react.useRef)();
  (_ref2 = ref) !== null && _ref2 !== void 0 ? _ref2 : ref = wrapperRef;
  var inputRef = (0, _react.useRef)();
  (0, _useDetectOutsideClick.useDetectOutsideClick)(ref, function () {
    return setShowValidationRules(false);
  });
  var formFieldClassNames = (0, _classnames.default)('form-field-input', className);
  var inputWrapperClassNames = (0, _classnames.default)('form-field__wrapper', "form-field__wrapper-".concat(density), disabled && 'form-field__wrapper-disabled', isInvalid && 'form-field__wrapper-invalid', withoutBorder && 'without-border');
  var labelClassNames = (0, _classnames.default)('form-field__label', disabled && 'form-field__label-disabled');
  (0, _react.useEffect)(function () {
    setTypedValue(String(input.value)); // convert from number to string
  }, [input.value]);
  (0, _react.useEffect)(function () {
    setIsInvalid(meta.invalid && (meta.validating || meta.modified || meta.submitFailed && meta.touched));
  }, [meta.invalid, meta.modified, meta.submitFailed, meta.touched, meta.validating]);
  (0, _react.useEffect)(function () {
    if (meta.valid && showValidationRules) {
      setShowValidationRules(false);
    }
  }, [meta.valid, showValidationRules]);
  (0, _react.useEffect)(function () {
    if (showValidationRules) {
      window.addEventListener('scroll', handleScroll, true);
    }

    return function () {
      window.removeEventListener('scroll', handleScroll, true);
    };
  }, [showValidationRules]);
  (0, _react.useEffect)(function () {
    if (focused) {
      inputRef.current.focus();
    }
  }, [focused]);

  var getValidationRules = function getValidationRules() {
    return validationRules.map(function (_ref3) {
      var _ref3$isValid = _ref3.isValid,
          isValid = _ref3$isValid === void 0 ? false : _ref3$isValid,
          label = _ref3.label,
          name = _ref3.name;
      return /*#__PURE__*/(0, _jsxRuntime.jsx)(_ValidationTemplate.default, {
        valid: isValid,
        validationMessage: label
      }, name);
    });
  };

  var handleInputBlur = function handleInputBlur(event) {
    var _event$relatedTarget;

    input.onBlur && input.onBlur(event);

    if (!event.relatedTarget || !((_event$relatedTarget = event.relatedTarget) !== null && _event$relatedTarget !== void 0 && _event$relatedTarget.closest('.form-field__suggestion-list'))) {
      setIsFocused(false);
      onBlur && onBlur(event);
    }
  };

  var handleInputFocus = function handleInputFocus(event) {
    input.onFocus && input.onFocus(event);
    setIsFocused(true);
  };

  var handleScroll = function handleScroll(event) {
    if (inputRef.current.contains(event.target)) return;

    if (!event.target.closest('.options-menu') && !event.target.classList.contains('form-field-input')) {
      setShowValidationRules(false);
    }
  };

  var handleSuggestionClick = function handleSuggestionClick(item) {
    input.onChange && input.onChange(item);
    setIsFocused(false);
    onBlur();
  };

  var toggleValidationRulesMenu = function toggleValidationRulesMenu() {
    inputRef.current.focus();
    setShowValidationRules(function (state) {
      return !state;
    });
  };

  (0, _react.useEffect)(function () {
    setValidationRules(function (prevState) {
      return prevState.map(function (rule) {
        return _objectSpread(_objectSpread({}, rule), {}, {
          isValid: !meta.error || !Array.isArray(meta.error) ? true : !meta.error.some(function (err) {
            return err.name === rule.name;
          })
        });
      });
    });
  }, [meta.error]);

  var validateField = function validateField(value) {
    var valueToValidate = (0, _lodash.isNil)(value) ? '' : String(value);
    if (!valueToValidate && !required || disabled) return;
    var validationError = null;

    if (!(0, _lodash.isEmpty)(rules)) {
      var _checkPatternsValidit = (0, _validation.checkPatternsValidity)(rules, valueToValidate),
          _checkPatternsValidit2 = _slicedToArray(_checkPatternsValidit, 2),
          newRules = _checkPatternsValidit2[0],
          isValidField = _checkPatternsValidit2[1];

      var invalidRules = newRules.filter(function (rule) {
        return !rule.isValid;
      });

      if (!isValidField) {
        validationError = invalidRules.map(function (rule) {
          return {
            name: rule.name,
            label: rule.label
          };
        });
      }
    }

    if ((0, _lodash.isEmpty)(validationError)) {
      if (inputProps.type === 'number') {
        if (inputProps.max && +valueToValidate > +inputProps.max) {
          validationError = {
            name: 'maxValue',
            label: "Max value is ".concat(inputProps.max)
          };
        }

        if (inputProps.min && +valueToValidate < +inputProps.min) {
          validationError = {
            name: 'minValue',
            label: "Min value is ".concat(inputProps.min)
          };
        }
      }

      if (pattern && !validationPattern.test(valueToValidate)) {
        validationError = {
          name: 'pattern',
          label: invalidText
        };
      } else if (valueToValidate.startsWith(' ')) {
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
    }

    if (!validationError && validator) {
      validationError = validator(value);
    }

    return validationError;
  };

  var parseField = function parseField(val) {
    if (!val) return;
    return inputProps.type === 'number' ? +val : val;
  };

  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactFinalForm.Field, {
    validate: validateField,
    name: name,
    parse: parseField,
    children: function children(_ref4) {
      var _inputProps$autocompl, _meta$error$label, _meta$error;

      var input = _ref4.input,
          meta = _ref4.meta;
      return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
        ref: ref,
        className: formFieldClassNames,
        children: [label && /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
          className: labelClassNames,
          children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)("label", {
            "data-testid": "label",
            htmlFor: input.name,
            children: [label, (required || validationRules.find(function (rule) {
              return rule.name === 'required';
            })) && /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
              className: "form-field__label-mandatory",
              children: " *"
            })]
          }), link && link.show && typedValue.trim() && /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
            className: "form-field__label-icon",
            children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_Tooltip.default, {
              template: /*#__PURE__*/(0, _jsxRuntime.jsx)(_TextTooltipTemplate.default, {
                text: link.url || typedValue
              }),
              children: /*#__PURE__*/(0, _jsxRuntime.jsx)("a", {
                href: link.url || typedValue,
                onClick: function onClick(event) {
                  return event.stopPropagation();
                },
                target: "_blank",
                rel: "noreferrer",
                children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_popout.ReactComponent, {})
              })
            })
          })]
        }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
          className: inputWrapperClassNames,
          children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
            className: "form-field__control",
            children: /*#__PURE__*/(0, _jsxRuntime.jsx)("input", _objectSpread(_objectSpread({
              "data-testid": "input",
              id: input.name,
              ref: inputRef,
              required: isInvalid || required
            }, _objectSpread(_objectSpread({
              disabled: disabled,
              pattern: pattern
            }, inputProps), input)), {}, {
              autoComplete: (_inputProps$autocompl = inputProps.autocomplete) !== null && _inputProps$autocompl !== void 0 ? _inputProps$autocompl : 'off',
              onBlur: handleInputBlur,
              onFocus: handleInputFocus
            }))
          }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
            className: "form-field__icons",
            children: [isInvalid && !Array.isArray(meta.error) && /*#__PURE__*/(0, _jsxRuntime.jsx)(_Tooltip.default, {
              className: "form-field__warning",
              template: /*#__PURE__*/(0, _jsxRuntime.jsx)(_TextTooltipTemplate.default, {
                text: (_meta$error$label = (_meta$error = meta.error) === null || _meta$error === void 0 ? void 0 : _meta$error.label) !== null && _meta$error$label !== void 0 ? _meta$error$label : invalidText,
                warning: true
              }),
              children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_invalid.ReactComponent, {})
            }), isInvalid && Array.isArray(meta.error) && /*#__PURE__*/(0, _jsxRuntime.jsx)("button", {
              className: "form-field__warning",
              onClick: toggleValidationRulesMenu,
              children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_warning.ReactComponent, {})
            }), tip && /*#__PURE__*/(0, _jsxRuntime.jsx)(_Tip.default, {
              text: tip,
              className: "form-field__tip"
            }), inputIcon && /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
              "data-testid": "input-icon",
              className: iconClass,
              children: inputIcon
            })]
          }), inputProps.type === 'number' && /*#__PURE__*/(0, _jsxRuntime.jsx)(_InputNumberButtons.default, _objectSpread({}, _objectSpread(_objectSpread(_objectSpread({}, inputProps), input), {}, {
            disabled: disabled
          })))]
        }), (suggestionList === null || suggestionList === void 0 ? void 0 : suggestionList.length) > 0 && isFocused && /*#__PURE__*/(0, _jsxRuntime.jsx)("ul", {
          className: "form-field__suggestion-list",
          children: suggestionList.map(function (item, index) {
            return /*#__PURE__*/(0, _jsxRuntime.jsx)("li", {
              className: "suggestion-item",
              onClick: function onClick() {
                handleSuggestionClick(item);
              },
              tabIndex: index,
              dangerouslySetInnerHTML: {
                __html: item.replace(new RegExp(typedValue, 'gi'), function (match) {
                  return match ? "<b>".concat(match, "</b>") : match;
                })
              }
            }, "".concat(item).concat(index));
          })
        }), !(0, _lodash.isEmpty)(validationRules) && /*#__PURE__*/(0, _jsxRuntime.jsx)(_OptionsMenu.default, {
          show: showValidationRules,
          ref: ref,
          children: getValidationRules()
        })]
      });
    }
  });
});

FormInput.defaultProps = {
  className: '',
  density: 'normal',
  disabled: false,
  focused: false,
  iconClass: '',
  inputIcon: null,
  invalidText: 'This field is invalid',
  label: '',
  link: {
    show: '',
    value: ''
  },
  min: null,
  max: null,
  onBlur: function onBlur() {},
  onChange: function onChange() {},
  onKeyDown: function onKeyDown() {},
  pattern: null,
  placeholder: '',
  required: false,
  step: '1',
  suggestionList: [],
  tip: '',
  type: 'text',
  validationRules: [],
  validator: function validator() {},
  value: '',
  withoutBorder: false
};
FormInput.propTypes = {
  className: _propTypes.default.string,
  density: _propTypes.default.oneOf(['dense', 'normal', 'medium', 'chunky']),
  disabled: _propTypes.default.bool,
  focused: _propTypes.default.bool,
  iconClass: _propTypes.default.string,
  inputIcon: _propTypes.default.element,
  invalidText: _propTypes.default.string,
  label: _propTypes.default.string,
  link: _types.INPUT_LINK,
  min: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.number]),
  max: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.number]),
  name: _propTypes.default.string.isRequired,
  onBlur: _propTypes.default.func,
  onChange: _propTypes.default.func,
  onKeyDown: _propTypes.default.func,
  pattern: _propTypes.default.string,
  placeholder: _propTypes.default.string,
  required: _propTypes.default.bool,
  step: _propTypes.default.string,
  suggestionList: _propTypes.default.arrayOf(_propTypes.default.string),
  tip: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.element]),
  type: _propTypes.default.string,
  validationRules: _types.INPUT_VALIDATION_RULES,
  validator: _propTypes.default.func,
  value: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.number]),
  withoutBorder: _propTypes.default.bool
};

var _default = /*#__PURE__*/_react.default.memo(FormInput);

exports.default = _default;