"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactFinalForm = require("react-final-form");

var _lodash = require("lodash");

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _elements = require("../../elements");

var _PopUpDialog = _interopRequireDefault(require("../PopUpDialog/PopUpDialog"));

var _TextTooltipTemplate = _interopRequireDefault(require("../TooltipTemplate/TextTooltipTemplate"));

var _Tooltip = _interopRequireDefault(require("../Tooltip/Tooltip"));

var _validation = require("../../utils/validation.util");

var _hooks = require("../../hooks");

var _types = require("../../types");

var _arrow = require("../../images/arrow.svg");

var _search = require("../../images/search.svg");

var _warning = require("../../images/warning.svg");

var _invalid = require("../../images/invalid.svg");

require("./formCombobox.scss");

var _jsxRuntime = require("react/jsx-runtime");

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

var FormCombobox = function FormCombobox(_ref) {
  var comboboxClassName = _ref.comboboxClassName,
      density = _ref.density,
      disabled = _ref.disabled,
      hideSearchInput = _ref.hideSearchInput,
      inputDefaultValue = _ref.inputDefaultValue,
      inputPlaceholder = _ref.inputPlaceholder,
      invalidText = _ref.invalidText,
      label = _ref.label,
      maxSuggestedMatches = _ref.maxSuggestedMatches,
      name = _ref.name,
      onBlur = _ref.onBlur,
      onChange = _ref.onChange,
      onFocus = _ref.onFocus,
      required = _ref.required,
      rules = _ref.rules,
      selectDefaultValue = _ref.selectDefaultValue,
      selectOptions = _ref.selectOptions,
      selectPlaceholder = _ref.selectPlaceholder,
      suggestionList = _ref.suggestionList,
      validator = _ref.validator,
      withoutBorder = _ref.withoutBorder;

  var _useField = (0, _reactFinalForm.useField)(name),
      input = _useField.input,
      meta = _useField.meta;

  var _useState = (0, _react.useState)(inputDefaultValue),
      _useState2 = _slicedToArray(_useState, 2),
      inputValue = _useState2[0],
      setInputValue = _useState2[1];

  var _useState3 = (0, _react.useState)(selectDefaultValue),
      _useState4 = _slicedToArray(_useState3, 2),
      selectValue = _useState4[0],
      setSelectValue = _useState4[1];

  var _useState5 = (0, _react.useState)({
    left: '0px'
  }),
      _useState6 = _slicedToArray(_useState5, 2),
      dropdownStyle = _useState6[0],
      setDropdownStyle = _useState6[1];

  var _useState7 = (0, _react.useState)(false),
      _useState8 = _slicedToArray(_useState7, 2),
      showSelectDropdown = _useState8[0],
      setShowSelectDropdown = _useState8[1];

  var _useState9 = (0, _react.useState)(false),
      _useState10 = _slicedToArray(_useState9, 2),
      showSuggestionList = _useState10[0],
      setShowSuggestionList = _useState10[1];

  var _useState11 = (0, _react.useState)(suggestionList),
      _useState12 = _slicedToArray(_useState11, 2),
      dropdownList = _useState12[0],
      setDropdownList = _useState12[1];

  var _useState13 = (0, _react.useState)(false),
      _useState14 = _slicedToArray(_useState13, 2),
      searchIsFocused = _useState14[0],
      setSearchIsFocused = _useState14[1];

  var _useState15 = (0, _react.useState)(false),
      _useState16 = _slicedToArray(_useState15, 2),
      isInvalid = _useState16[0],
      setIsInvalid = _useState16[1];

  var _useState17 = (0, _react.useState)(rules),
      _useState18 = _slicedToArray(_useState17, 2),
      validationRules = _useState18[0],
      setValidationRules = _useState18[1];

  var _useState19 = (0, _react.useState)(false),
      _useState20 = _slicedToArray(_useState19, 2),
      showValidationRules = _useState20[0],
      setShowValidationRules = _useState20[1];

  var comboboxRef = (0, _react.useRef)();
  var selectRef = (0, _react.useRef)();
  var inputRef = (0, _react.useRef)();
  var suggestionListRef = (0, _react.useRef)();
  (0, _hooks.useDetectOutsideClick)(comboboxRef, function () {
    return setShowValidationRules(false);
  });
  var labelClassNames = (0, _classnames.default)('form-field__label', disabled && 'form-field__label-disabled');
  var inputClassNames = (0, _classnames.default)('form-field-combobox__input', selectValue.id.length === 0 && 'form-field-combobox__input_hidden');
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
  (0, _react.useEffect)(function () {
    if (!searchIsFocused) {
      if (JSON.stringify(dropdownList) !== JSON.stringify(suggestionList)) {
        setDropdownList(suggestionList);
      }
    }
  }, [dropdownList, suggestionList, searchIsFocused]);
  (0, _react.useEffect)(function () {
    setIsInvalid(meta.invalid && (meta.validating || meta.modified || meta.submitFailed && meta.touched));
  }, [meta.invalid, meta.modified, meta.submitFailed, meta.touched, meta.validating]);
  var handleOutsideClick = (0, _react.useCallback)(function (event) {
    if (comboboxRef.current && !comboboxRef.current.contains(event.target)) {
      setSearchIsFocused(false);
      setShowSelectDropdown(false);
      setShowSuggestionList(false);
      input.onBlur(new Event('blur'));
      onBlur && onBlur(input.value);
    }
  }, [input, onBlur]);

  var handleScroll = function handleScroll(event) {
    if (comboboxRef.current.contains(event.target)) return;

    if (!event.target.closest('.pop-up-dialog') && !event.target.classList.contains('form-field-combobox')) {
      setShowValidationRules(false);
      setShowSelectDropdown(false);
      setShowSuggestionList(false);
      inputRef.current.blur();
    }
  };

  (0, _react.useEffect)(function () {
    window.addEventListener('click', handleOutsideClick);
    return function () {
      window.removeEventListener('click', handleOutsideClick);
    };
  }, [handleOutsideClick]);
  (0, _react.useEffect)(function () {
    if (showValidationRules || showSelectDropdown || showSuggestionList) {
      window.addEventListener('scroll', handleScroll, true);
    }

    return function () {
      window.removeEventListener('scroll', handleScroll, true);
    };
  }, [showSelectDropdown, showSuggestionList, showValidationRules]);

  var getValidationRules = function getValidationRules() {
    return validationRules.map(function (_ref2) {
      var _ref2$isValid = _ref2.isValid,
          isValid = _ref2$isValid === void 0 ? false : _ref2$isValid,
          label = _ref2.label,
          name = _ref2.name;
      return /*#__PURE__*/(0, _jsxRuntime.jsx)(_elements.ValidationTemplate, {
        valid: isValid,
        validationMessage: label
      }, name);
    });
  };

  var handleInputChange = function handleInputChange(event) {
    var target = event.target;
    setDropdownStyle({
      left: "".concat(target.selectionStart < 30 ? target.selectionStart : 30, "ch")
    });

    if (searchIsFocused) {
      setSearchIsFocused(false);
    }

    setInputValue(target.value);
    input.onChange("".concat(selectValue.id).concat(target.value));
    onChange && onChange(selectValue.id, target.value);

    if (dropdownList.length > 0) {
      setShowSuggestionList(true);
    }
  };

  var handleSelectOptionClick = function handleSelectOptionClick(selectedOption, option) {
    if (selectedOption.id !== selectValue.id) {
      setSelectValue(selectedOption);
      input.onChange(selectedOption.id);
      setInputValue('');
      onChange && onChange(selectedOption.id);
      setShowSelectDropdown(false);
      inputRef.current.disabled = false;
      inputRef.current.focus();
    }
  };

  var handleSuggestionListOptionClick = function handleSuggestionListOptionClick(option) {
    var inputValueItems = inputValue.split('/');
    var valueIndex = inputValueItems.length - 1;
    var formattedValue = option.customDelimiter ? inputValueItems[valueIndex].replace(new RegExp("".concat(option.customDelimiter, ".*")), '') + option.id : option.id;
    if (inputValueItems.length <= maxSuggestedMatches - 1) formattedValue += '/';
    inputValueItems[valueIndex] = formattedValue;

    if (searchIsFocused) {
      setSearchIsFocused(false);
    }

    if (inputValueItems.join('/') !== inputValue) {
      setInputValue(inputValueItems.join('/'));
      input.onChange("".concat(selectValue.id).concat(inputValueItems.join('/')));
      onChange && onChange(selectValue.id, inputValueItems.join('/'));
    }

    setShowSuggestionList(false);
    inputRef.current.focus();
    setDropdownStyle({
      left: "".concat(inputRef.current.selectionStart < 30 ? inputRef.current.selectionStart : 30, "ch")
    });
  };

  var inputOnFocus = function inputOnFocus() {
    onFocus && onFocus();
    input.onFocus(new Event('focus'));

    if (showSelectDropdown) {
      setShowSelectDropdown(false);
    }

    setShowSuggestionList(true);
  };

  var suggestionListSearchChange = function suggestionListSearchChange(event) {
    event.persist();
    setDropdownList(function () {
      return suggestionList.filter(function (option) {
        return option.id.startsWith(event.target.value);
      });
    });
  };

  var toggleSelect = (0, _react.useCallback)(function () {
    if (showSelectDropdown) {
      setShowSelectDropdown(false);
      input.onBlur(new Event('blur'));
      onBlur && onBlur(input.value);
    } else {
      setShowSuggestionList(false);
      setShowValidationRules(false);
      setDropdownStyle({
        left: '0px'
      });
      setShowSelectDropdown(true);
      input.onFocus(new Event('focus'));
      onFocus && onFocus(input.value);
    }
  }, [input, onBlur, onFocus, showSelectDropdown]);

  var validateField = function validateField(value, allValues) {
    var _value$split$;

    var valueToValidate = (_value$split$ = value.split(selectValue.id)[1]) !== null && _value$split$ !== void 0 ? _value$split$ : '';
    var validationError = null;

    if (!(0, _lodash.isEmpty)(validationRules)) {
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
    }

    if (!validationError && validator) {
      validationError = validator(value, allValues);
    }

    return validationError;
  };

  var warningIconClick = function warningIconClick() {
    setShowValidationRules(function (state) {
      return !state;
    });
    setShowSelectDropdown(false);
  };

  var comboboxClassNames = (0, _classnames.default)(comboboxClassName, 'form-field-combobox', 'form-field', isInvalid && 'form-field-combobox_invalid');
  var iconClassNames = (0, _classnames.default)(showSelectDropdown && 'form-field-combobox__icon_open', 'form-field-combobox__icon');
  var selectValueClassNames = (0, _classnames.default)(selectValue.className);
  var wrapperClassNames = (0, _classnames.default)('form-field__wrapper', "form-field__wrapper-".concat(density), disabled && 'form-field__wrapper-disabled', isInvalid && 'form-field__wrapper-invalid', withoutBorder && 'without-border');
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactFinalForm.Field, {
    name: name,
    validate: validateField,
    children: function children(_ref3) {
      var _meta$error$label, _meta$error;

      var input = _ref3.input,
          meta = _ref3.meta;
      return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
        className: comboboxClassNames,
        ref: comboboxRef,
        children: [label && /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
          className: labelClassNames,
          children: /*#__PURE__*/(0, _jsxRuntime.jsxs)("label", {
            "data-testid": "label",
            htmlFor: input.name,
            children: [label, (required || validationRules.find(function (rule) {
              return rule.name === 'required';
            })) && /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
              className: "form-field__label-mandatory",
              children: " *"
            })]
          })
        }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
          className: wrapperClassNames,
          children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
            className: "form-field__icons",
            children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_arrow.ReactComponent, {
              className: iconClassNames,
              onClick: toggleSelect
            })
          }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
            className: "form-field-combobox__select form-field__control",
            ref: selectRef,
            children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
              className: "form-field-combobox__select-header",
              onClick: toggleSelect,
              children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
                className: selectValueClassNames,
                children: selectValue.id
              }), selectValue.id.length === 0 && selectPlaceholder && /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
                className: "form-field-combobox__placeholder",
                children: /*#__PURE__*/(0, _jsxRuntime.jsx)("label", {
                  children: selectPlaceholder
                })
              })]
            }), showSelectDropdown && /*#__PURE__*/(0, _jsxRuntime.jsx)(_PopUpDialog.default, {
              headerIsHidden: true,
              customPosition: {
                element: selectRef,
                position: 'bottom-right'
              },
              className: "form-field-combobox__dropdown form-field-combobox__dropdown-select",
              children: /*#__PURE__*/(0, _jsxRuntime.jsx)("ul", {
                className: "form-field-combobox__dropdown-list",
                children: selectOptions.map(function (option) {
                  if (!option.hidden) {
                    var selectOptionClassNames = (0, _classnames.default)('form-field-combobox__dropdown-list-option', option.className);
                    return /*#__PURE__*/(0, _jsxRuntime.jsx)("li", {
                      className: selectOptionClassNames,
                      onClick: function onClick() {
                        return handleSelectOptionClick(option);
                      },
                      children: option.label
                    }, option.id);
                  }
                })
              })
            })]
          }), /*#__PURE__*/(0, _jsxRuntime.jsx)("input", {
            className: inputClassNames,
            id: input.name,
            onChange: handleInputChange,
            onFocus: inputOnFocus,
            placeholder: inputPlaceholder,
            ref: inputRef,
            required: required,
            type: "text",
            value: inputValue
          }), showSuggestionList && (dropdownList.length > 0 || searchIsFocused) && /*#__PURE__*/(0, _jsxRuntime.jsx)(_PopUpDialog.default, {
            headerIsHidden: true,
            customPosition: {
              element: selectRef,
              position: 'bottom-right'
            },
            className: "form-field-combobox__dropdown form-field-combobox__dropdown-suggestions",
            style: _objectSpread({}, dropdownStyle),
            children: /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
              ref: suggestionListRef,
              children: [!hideSearchInput && /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
                className: "form-field-combobox__search-wrapper",
                children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("input", {
                  className: "form-field-combobox__search form-field__control",
                  onChange: suggestionListSearchChange,
                  onFocus: function onFocus() {
                    return setSearchIsFocused(true);
                  },
                  placeholder: "Type to search",
                  type: "text"
                }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_search.ReactComponent, {})]
              }), /*#__PURE__*/(0, _jsxRuntime.jsx)("ul", {
                className: "form-field-combobox__dropdown-list",
                children: searchIsFocused && dropdownList.length === 0 ? /*#__PURE__*/(0, _jsxRuntime.jsx)("li", {
                  className: "form-field-combobox__dropdown-list-option",
                  children: "No data"
                }, "no data") : dropdownList.map(function (value) {
                  return /*#__PURE__*/(0, _jsxRuntime.jsx)("li", {
                    className: "form-field-combobox__dropdown-list-option",
                    onClick: function onClick() {
                      return handleSuggestionListOptionClick(value);
                    },
                    children: value.label
                  }, value.id);
                })
              })]
            })
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
              onClick: warningIconClick,
              children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_warning.ReactComponent, {})
            })]
          }), !(0, _lodash.isEmpty)(validationRules) && /*#__PURE__*/(0, _jsxRuntime.jsx)(_elements.OptionsMenu, {
            show: showValidationRules,
            ref: comboboxRef,
            children: getValidationRules()
          })]
        })]
      });
    }
  });
};

FormCombobox.defaultProps = {
  comboboxClassName: '',
  density: 'normal',
  disabled: false,
  hideSearchInput: false,
  inputDefaultValue: '',
  inputPlaceholder: '',
  label: '',
  maxSuggestedMatches: 1,
  onBlur: null,
  onFocus: null,
  onChange: null,
  required: false,
  rules: [],
  selectDefaultValue: {
    label: '',
    id: '',
    className: ''
  },
  selectPlaceholder: '',
  suggestionList: [],
  validator: null,
  withoutBorder: false
};
FormCombobox.propTypes = {
  comboboxClassName: _propTypes.default.string,
  density: _propTypes.default.oneOf(['dense', 'normal', 'medium', 'chunky']),
  disabled: _propTypes.default.bool,
  hideSearchInput: _propTypes.default.bool,
  inputDefaultValue: _propTypes.default.string,
  inputPlaceholder: _propTypes.default.string,
  invalidText: _propTypes.default.string,
  label: _propTypes.default.string,
  maxSuggestedMatches: _propTypes.default.number,
  name: _propTypes.default.string.isRequired,
  onBlur: _propTypes.default.func,
  onChange: _propTypes.default.func,
  onFocus: _propTypes.default.func,
  required: _propTypes.default.bool,
  rules: _propTypes.default.array,
  selectDefaultValue: _propTypes.default.shape({}),
  selectOptions: _types.COMBOBOX_SELECT_OPTIONS.isRequired,
  selectPlaceholder: _propTypes.default.string,
  suggestionList: _types.COMBOBOX_SUGGESTION_LIST,
  validator: _propTypes.default.func,
  withoutBorder: _propTypes.default.bool
};
var _default = FormCombobox;
exports.default = _default;