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

var _NewChipInput = _interopRequireDefault(require("../NewChipInput/NewChipInput"));

var _OptionsMenu = _interopRequireDefault(require("../../../elements/OptionsMenu/OptionsMenu"));

var _ValidationTemplate = _interopRequireDefault(require("../../../elements/ValidationTemplate/ValidationTemplate"));

var _types = require("../../../types");

var _constants = require("../../../constants");

var _close = require("../../../images/close.svg");

require("./newChipForm.scss");

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

var NewChipForm = /*#__PURE__*/_react.default.forwardRef(function (_ref, ref) {
  var chip = _ref.chip,
      chipIndex = _ref.chipIndex,
      chipOptions = _ref.chipOptions,
      className = _ref.className,
      editConfig = _ref.editConfig,
      handleRemoveChip = _ref.handleRemoveChip,
      isEditMode = _ref.isEditMode,
      keyName = _ref.keyName,
      meta = _ref.meta,
      onChange = _ref.onChange,
      setEditConfig = _ref.setEditConfig,
      rules = _ref.validationRules,
      valueName = _ref.valueName;

  var _useState = (0, _react.useState)({
    key: chip.key,
    value: chip.value,
    keyFieldWidth: 0,
    valueFieldWidth: 0
  }),
      _useState2 = _slicedToArray(_useState, 2),
      chipData = _useState2[0],
      setChipData = _useState2[1];

  var _useState3 = (0, _react.useState)('key'),
      _useState4 = _slicedToArray(_useState3, 2),
      selectedInput = _useState4[0],
      setSelectedInput = _useState4[1];

  var _useState5 = (0, _react.useState)(rules),
      _useState6 = _slicedToArray(_useState5, 2),
      validationRules = _useState6[0],
      setValidationRules = _useState6[1];

  var _useState7 = (0, _react.useState)(false),
      _useState8 = _slicedToArray(_useState7, 2),
      showValidationRules = _useState8[0],
      setShowValidationRules = _useState8[1];

  var maxWidthInput = (0, _react.useMemo)(function () {
    var _ref$current;

    return ((_ref$current = ref.current) === null || _ref$current === void 0 ? void 0 : _ref$current.clientWidth) - 50;
  }, [ref]);
  var background = chipOptions.background,
      borderColor = chipOptions.borderColor,
      borderRadius = chipOptions.borderRadius,
      density = chipOptions.density,
      font = chipOptions.font;
  var minWidthInput = 25;
  var minWidthValueInput = 35;

  var refInputKey = _react.default.useRef();

  var refInputValue = _react.default.useRef();

  var refInputContainer = _react.default.useRef();

  var labelKeyClassName = (0, _classnames.default)(className, !editConfig.isKeyFocused && 'item_edited', !(0, _lodash.isEmpty)((0, _lodash.get)(meta, ['error', chipIndex, 'key'], [])) && !(0, _lodash.isEmpty)(chipData.key) && 'item_edited_invalid');
  var labelContainerClassName = (0, _classnames.default)('edit-chip-container', background && "edit-chip-container-background_".concat(background), borderColor && "edit-chip-container-border_".concat(borderColor), font && "edit-chip-container-font_".concat(font), density && "edit-chip-container-density_".concat(density), borderRadius && "edit-chip-container-border_".concat(borderRadius), (editConfig.isEdit || editConfig.isNewChip) && 'edit-chip-container_edited');
  var labelValueClassName = (0, _classnames.default)('input-label-value', !editConfig.isValueFocused && 'item_edited', !(0, _lodash.isEmpty)((0, _lodash.get)(meta, ['error', chipIndex, 'value'], [])) && !(0, _lodash.isEmpty)(chipData.value) && 'item_edited_invalid');
  (0, _react.useLayoutEffect)(function () {
    if (!chipData.keyFieldWidth && !chipData.valueFieldWidth) {
      var currentWidthKeyInput = refInputKey.current.scrollWidth + 1;
      var currentWidthValueInput = refInputValue.current.scrollWidth + 1;

      if (chipData.key && chipData.value) {
        setChipData(function (prevState) {
          return _objectSpread(_objectSpread({}, prevState), {}, {
            keyFieldWidth: currentWidthKeyInput >= maxWidthInput ? maxWidthInput : currentWidthKeyInput <= minWidthInput ? minWidthInput : currentWidthKeyInput,
            valueFieldWidth: currentWidthValueInput >= maxWidthInput ? maxWidthInput : currentWidthValueInput <= minWidthValueInput ? minWidthValueInput : currentWidthValueInput
          });
        });
      } else {
        setChipData(function (prevState) {
          return _objectSpread(_objectSpread({}, prevState), {}, {
            keyFieldWidth: minWidthInput,
            valueFieldWidth: minWidthValueInput
          });
        });
      }
    }
  }, [chipData.key, chipData.value, chipData.keyFieldWidth, chipData.valueFieldWidth, maxWidthInput, refInputKey, refInputValue]);

  var handleScroll = function handleScroll() {
    setShowValidationRules(false);
  };

  (0, _react.useEffect)(function () {
    if (showValidationRules) {
      window.addEventListener('scroll', handleScroll, true);
    }

    return function () {
      window.removeEventListener('scroll', handleScroll, true);
    };
  }, [showValidationRules]);
  (0, _react.useEffect)(function () {
    if (editConfig.chipIndex === chipIndex) {
      if (editConfig.isKeyFocused) {
        refInputKey.current.focus();
      } else if (editConfig.isValueFocused) {
        refInputValue.current.focus();
      }
    }
  }, [editConfig.isKeyFocused, editConfig.isValueFocused, refInputKey, refInputValue, chipIndex, editConfig.chipIndex]);
  var outsideClick = (0, _react.useCallback)(function (event) {
    if (editConfig.chipIndex === chipIndex) {
      var _event$path, _event$composedPath;

      var elementPath = (_event$path = event.path) !== null && _event$path !== void 0 ? _event$path : (_event$composedPath = event.composedPath) === null || _event$composedPath === void 0 ? void 0 : _event$composedPath.call(event);

      if (!elementPath.includes(refInputContainer.current)) {
        onChange(event, _constants.CLICK);
        window.getSelection().removeAllRanges();
      } else {
        event.stopPropagation();
      }
    }
  }, [onChange, refInputContainer, chipIndex, editConfig.chipIndex]);
  (0, _react.useEffect)(function () {
    if (editConfig.isEdit) {
      document.addEventListener('click', outsideClick, true);
      return function () {
        document.removeEventListener('click', outsideClick, true);
      };
    }
  }, [outsideClick, editConfig.isEdit]);
  var focusChip = (0, _react.useCallback)(function (event) {
    event.stopPropagation();

    if (editConfig.chipIndex === chipIndex && isEditMode) {
      if (!event.shiftKey && event.key === _constants.TAB && editConfig.isValueFocused) {
        onChange(event, _constants.TAB);
      } else if (event.shiftKey && event.key === _constants.TAB && editConfig.isKeyFocused) {
        onChange(event, _constants.TAB_SHIFT);
      }

      if (event.key === _constants.BACKSPACE || event.key === _constants.DELETE) {
        setChipData(function (prevState) {
          return {
            keyFieldWidth: editConfig.isKeyFocused ? minWidthInput : prevState.keyFieldWidth,
            valueFieldWidth: editConfig.isValueFocused ? minWidthValueInput : prevState.valueFieldWidth
          };
        });
      }
    }
  }, [editConfig, onChange, chipIndex, isEditMode]);
  var handleOnFocus = (0, _react.useCallback)(function (event) {
    if (editConfig.chipIndex === chipIndex) {
      if (event.target.name === keyName) {
        refInputKey.current.selectionStart = refInputKey.current.selectionEnd;
        setEditConfig(function (prevConfig) {
          return _objectSpread(_objectSpread({}, prevConfig), {}, {
            isKeyFocused: true,
            isValueFocused: false
          });
        });
      } else {
        refInputValue.current.selectionStart = refInputValue.current.selectionEnd;
        setEditConfig(function (prevConfig) {
          return _objectSpread(_objectSpread({}, prevConfig), {}, {
            isKeyFocused: false,
            isValueFocused: true
          });
        });
      }

      event && event.stopPropagation();
    }
  }, [keyName, refInputKey, refInputValue, setEditConfig, editConfig.chipIndex, chipIndex]);
  var handleOnChange = (0, _react.useCallback)(function (event) {
    event.preventDefault();

    if (event.target.name === keyName) {
      var currentWidthKeyInput = refInputKey.current.scrollWidth;
      setChipData(function (prevState) {
        return _objectSpread(_objectSpread({}, prevState), {}, {
          key: refInputKey.current.value,
          keyFieldWidth: refInputKey.current.value.length <= 1 ? minWidthInput : currentWidthKeyInput >= maxWidthInput ? maxWidthInput : currentWidthKeyInput > minWidthInput ? currentWidthKeyInput + 2 : minWidthInput
        });
      });
    } else {
      var currentWidthValueInput = refInputValue.current.scrollWidth;
      setChipData(function (prevState) {
        return _objectSpread(_objectSpread({}, prevState), {}, {
          value: refInputValue.current.value,
          valueFieldWidth: refInputValue.current.value.length <= 1 ? minWidthValueInput : currentWidthValueInput >= maxWidthInput ? maxWidthInput : currentWidthValueInput > minWidthValueInput ? currentWidthValueInput + 2 : minWidthValueInput
        });
      });
    }
  }, [maxWidthInput, refInputKey, refInputValue, keyName]);
  (0, _react.useEffect)(function () {
    if (editConfig.chipIndex === chipIndex) {
      setSelectedInput(editConfig.isKeyFocused ? 'key' : editConfig.isValueFocused ? 'value' : null);
    }
  }, [editConfig.isKeyFocused, editConfig.isValueFocused, editConfig.chipIndex, chipIndex]);
  (0, _react.useEffect)(function () {
    if (meta.valid && showValidationRules) {
      setShowValidationRules(false);
    }
  }, [meta.valid, showValidationRules]);
  (0, _react.useEffect)(function () {
    if (meta.error) {
      setValidationRules(function (prevState) {
        return _objectSpread(_objectSpread({}, prevState), {}, _defineProperty({}, selectedInput, prevState[selectedInput].map(function (rule) {
          return _objectSpread(_objectSpread({}, rule), {}, {
            isValid: (0, _lodash.isEmpty)((0, _lodash.get)(meta, ['error', editConfig.chipIndex, selectedInput], [])) ? true : !meta.error[editConfig.chipIndex][selectedInput].some(function (err) {
              return err && err.name === rule.name;
            })
          });
        })));
      });
      !showValidationRules && setShowValidationRules(true);
    }
  }, [meta, showValidationRules, selectedInput, editConfig.chipIndex]);
  var getValidationRules = (0, _react.useCallback)(function () {
    return validationRules[selectedInput].map(function (_ref2) {
      var _ref2$isValid = _ref2.isValid,
          isValid = _ref2$isValid === void 0 ? false : _ref2$isValid,
          label = _ref2.label,
          name = _ref2.name;
      return /*#__PURE__*/(0, _jsxRuntime.jsx)(_ValidationTemplate.default, {
        valid: isValid,
        validationMessage: label
      }, name);
    });
  }, [selectedInput, validationRules]);
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    className: labelContainerClassName,
    onKeyDown: function onKeyDown(event) {
      return editConfig.isEdit && focusChip(event);
    },
    ref: refInputContainer,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_NewChipInput.default, {
      className: labelKeyClassName,
      disabled: !isEditMode || editConfig.chipIndex !== chipIndex,
      name: keyName,
      onChange: handleOnChange,
      onFocus: handleOnFocus,
      placeholder: "key",
      ref: refInputKey,
      style: {
        width: chipData.keyFieldWidth
      }
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
      className: "edit-chip-separator",
      children: ":"
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_NewChipInput.default, {
      className: labelValueClassName,
      disabled: !isEditMode || editConfig.chipIndex !== chipIndex,
      name: valueName,
      onChange: handleOnChange,
      onFocus: handleOnFocus,
      placeholder: "value",
      ref: refInputValue,
      style: {
        width: chipData.valueFieldWidth
      }
    }), editConfig.chipIndex !== chipIndex && isEditMode && /*#__PURE__*/(0, _jsxRuntime.jsx)("button", {
      className: "edit-chip__icon-close",
      onClick: function onClick(event) {
        return handleRemoveChip(event, chipIndex);
      },
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_close.ReactComponent, {})
    }), (editConfig.isKeyFocused ? !(0, _lodash.isEmpty)(chipData.key) : !(0, _lodash.isEmpty)(chipData.value)) && editConfig.chipIndex === chipIndex && !(0, _lodash.isEmpty)((0, _lodash.get)(meta, ['error', editConfig.chipIndex, selectedInput], [])) && /*#__PURE__*/(0, _jsxRuntime.jsx)(_OptionsMenu.default, {
      show: showValidationRules,
      ref: ref,
      children: getValidationRules()
    })]
  });
});

NewChipForm.defaultProps = {
  className: '',
  validationRules: {}
};
NewChipForm.propTypes = {
  chip: _propTypes.default.object.isRequired,
  chipIndex: _propTypes.default.number.isRequired,
  chipOptions: _types.CHIP_OPTIONS.isRequired,
  className: _propTypes.default.string,
  editConfig: _propTypes.default.shape({}).isRequired,
  handleRemoveChip: _propTypes.default.func.isRequired,
  isEditMode: _propTypes.default.bool.isRequired,
  keyName: _propTypes.default.string.isRequired,
  meta: _propTypes.default.object.isRequired,
  onChange: _propTypes.default.func.isRequired,
  setEditConfig: _propTypes.default.func.isRequired,
  validationRules: _propTypes.default.object,
  valueName: _propTypes.default.string.isRequired
};
var _default = NewChipForm;
exports.default = _default;