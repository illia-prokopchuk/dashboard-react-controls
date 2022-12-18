"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _lodash = _interopRequireWildcard(require("lodash"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _FormChipCellView = _interopRequireDefault(require("./FormChipCellView"));

var _common = require("../../utils/common.util");

var _generateChipsList = require("../../utils/generateChipsList.util");

var _validation = require("../../utils/validation.util");

var _formChipCell = require("./formChipCell.util");

var _types = require("../../types");

var _constants = require("../../constants");

require("./formChipCell.scss");

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

var FormChipCell = function FormChipCell(_ref) {
  var chipOptions = _ref.chipOptions,
      delimiter = _ref.delimiter,
      formState = _ref.formState,
      initialValues = _ref.initialValues,
      isEditMode = _ref.isEditMode,
      label = _ref.label,
      name = _ref.name,
      onClick = _ref.onClick,
      shortChips = _ref.shortChips,
      validationRules = _ref.validationRules,
      validator = _ref.validator,
      visibleChipsMaxLength = _ref.visibleChipsMaxLength;

  var _useState = (0, _react.useState)({}),
      _useState2 = _slicedToArray(_useState, 2),
      chipsSizes = _useState2[0],
      setChipsSizes = _useState2[1];

  var _useState3 = (0, _react.useState)(false),
      _useState4 = _slicedToArray(_useState3, 2),
      showHiddenChips = _useState4[0],
      setShowHiddenChips = _useState4[1];

  var _useState5 = (0, _react.useState)({
    chipIndex: null,
    isEdit: false,
    isKeyFocused: false,
    isValueFocused: false,
    isNewChip: false
  }),
      _useState6 = _slicedToArray(_useState5, 2),
      editConfig = _useState6[0],
      setEditConfig = _useState6[1];

  var _useState7 = (0, _react.useState)(false),
      _useState8 = _slicedToArray(_useState7, 2),
      showChips = _useState8[0],
      setShowChips = _useState8[1];

  var _useState9 = (0, _react.useState)(8),
      _useState10 = _slicedToArray(_useState9, 2),
      visibleChipsCount = _useState10[0],
      setVisibleChipsCount = _useState10[1];

  var chipsCellRef = (0, _react.useRef)();
  var chipsWrapperRef = (0, _react.useRef)();
  var handleShowElements = (0, _react.useCallback)(function () {
    if (!isEditMode || isEditMode && visibleChipsMaxLength) {
      setShowHiddenChips(function (state) {
        return !state;
      });
    }
  }, [isEditMode, visibleChipsMaxLength]);
  var chips = (0, _react.useMemo)(function () {
    return isEditMode || visibleChipsMaxLength === 'all' ? {
      visibleChips: (0, _lodash.get)(formState.values, name),
      hiddenChips: []
    } : (0, _generateChipsList.generateChipsList)((0, _lodash.get)(formState.values, name), visibleChipsMaxLength ? visibleChipsMaxLength : visibleChipsCount);
  }, [visibleChipsMaxLength, isEditMode, visibleChipsCount, formState.values, name]);
  var handleResize = (0, _react.useCallback)(function () {
    if (!isEditMode && !(0, _common.isEveryObjectValueEmpty)(chipsSizes)) {
      var _chipsCellRef$current;

      var parentSize = (_chipsCellRef$current = chipsCellRef.current) === null || _chipsCellRef$current === void 0 ? void 0 : _chipsCellRef$current.getBoundingClientRect().width;
      var maxLength = 0;
      var chipIndex = 0;
      var padding = 65;
      Object.values(chipsSizes).every(function (chipSize, index) {
        if (maxLength + chipSize > parentSize || Object.values(chipsSizes).length > 1 && maxLength + chipSize + padding > parentSize) {
          chipIndex = index;
          return false;
        } else {
          maxLength += chipSize;

          if (index === Object.values(chipsSizes).length - 1) {
            chipIndex = 8;
          }

          return true;
        }
      });
      setVisibleChipsCount(chipIndex);
      setShowChips(true);
    }
  }, [chipsSizes, isEditMode]);
  (0, _react.useEffect)(function () {
    handleResize();
  }, [handleResize, showChips]);
  (0, _react.useEffect)(function () {
    if (!isEditMode) {
      window.addEventListener('resize', handleResize);
      return function () {
        return window.removeEventListener('resize', handleResize);
      };
    }
  }, [handleResize, isEditMode]);
  (0, _react.useEffect)(function () {
    window.addEventListener('mainResize', handleResize);
    return function () {
      return window.removeEventListener('mainResize', handleResize);
    };
  }, [handleResize]);
  (0, _react.useEffect)(function () {
    if (showHiddenChips) {
      window.addEventListener('click', handleShowElements);
      return function () {
        return window.removeEventListener('click', handleShowElements);
      };
    }
  }, [showHiddenChips, handleShowElements]);
  var checkChipsList = (0, _react.useCallback)(function (currentChipsList) {
    if ((0, _common.areArraysEqual)((0, _lodash.get)(initialValues, name), currentChipsList, ['id'])) {
      (0, _lodash.set)(formState.initialValues, name, currentChipsList);
    }

    formState.form.mutators.setFieldState(name, {
      modified: true
    });
    formState.form.mutators.setFieldState(name, {
      touched: true
    });
  }, [initialValues, name, formState]);
  var handleAddNewChip = (0, _react.useCallback)(function (event, fields) {
    if (!editConfig.isEdit && !editConfig.chipIndex) {
      formState.form.mutators.push(name, {
        id: fields.value.length + new Date(),
        key: '',
        value: '',
        delimiter: delimiter
      });
    }

    if (showHiddenChips) {
      setShowHiddenChips(false);
    }

    setEditConfig({
      chipIndex: fields.value.length,
      isEdit: true,
      isKeyFocused: true,
      isValueFocused: false,
      isNewChip: true
    });
    event && event.preventDefault();
  }, [editConfig.isEdit, editConfig.chipIndex, showHiddenChips, formState, name, delimiter]);
  var handleRemoveChip = (0, _react.useCallback)(function (event, fields, chipIndex) {
    checkChipsList(_lodash.default.chain(formState).get(['values', name]).filter(function (_, index) {
      return index !== chipIndex;
    }).value());
    fields.remove(chipIndex);
    event && event.stopPropagation();
  }, [checkChipsList, formState, name]);
  var handleEditChip = (0, _react.useCallback)(function (event, fields, nameEvent) {
    var _fields$value$editCon = fields.value[editConfig.chipIndex],
        key = _fields$value$editCon.key,
        value = _fields$value$editCon.value;
    var isChipNotEmpty = !!(key !== null && key !== void 0 && key.trim() && value !== null && value !== void 0 && value.trim());

    if (nameEvent === _constants.CLICK) {
      if (!isChipNotEmpty) {
        handleRemoveChip(event, fields, editConfig.chipIndex);
      }

      setEditConfig({
        chipIndex: null,
        isEdit: false,
        isKeyFocused: false,
        isValueFocused: false,
        isNewChip: false
      });
    } else if (nameEvent === _constants.TAB) {
      if (!isChipNotEmpty) {
        handleRemoveChip(event, fields, editConfig.chipIndex);
      }

      setEditConfig(function (prevState) {
        var lastChipSelected = prevState.chipIndex + 1 > fields.value.length - 1;
        return {
          chipIndex: lastChipSelected ? null : prevState.chipIndex + 1,
          isEdit: !lastChipSelected,
          isKeyFocused: true,
          isValueFocused: false,
          isNewChip: false
        };
      });
    } else if (nameEvent === _constants.TAB_SHIFT) {
      if (!isChipNotEmpty) {
        handleRemoveChip(event, fields, editConfig.chipIndex);
      }

      setEditConfig(function (prevState) {
        var isPrevChipIndexExists = prevState.chipIndex - 1 < 0;
        return {
          chipIndex: isPrevChipIndexExists ? null : prevState.chipIndex - 1,
          isEdit: !isPrevChipIndexExists,
          isKeyFocused: isPrevChipIndexExists,
          isValueFocused: !isPrevChipIndexExists,
          isNewChip: false
        };
      });
    }

    checkChipsList((0, _lodash.get)(formState.values, name));
    event && event.preventDefault();
  }, [editConfig.chipIndex, handleRemoveChip, checkChipsList, formState.values, name]);
  var handleToEditMode = (0, _react.useCallback)(function (event, index) {
    if (isEditMode) {
      event.stopPropagation();
      setEditConfig(function (preState) {
        return _objectSpread(_objectSpread({}, preState), {}, {
          chipIndex: index,
          isEdit: true,
          isKeyFocused: true,
          isValueFocused: false
        });
      });
    }

    onClick && onClick();
  }, [isEditMode, onClick]);

  var validateFields = function validateFields(fieldsArray) {
    var uniquenessValidator = function uniquenessValidator(newValue, idx) {
      return !fieldsArray.some(function (_ref2, index) {
        var key = _ref2.key;
        return newValue === key && index !== idx;
      });
    };

    var errorData = [];
    if (!fieldsArray) return [];

    if (!(0, _lodash.isEmpty)(validationRules)) {
      errorData = fieldsArray.map(function (chip) {
        var _validateChip = validateChip(chip),
            _validateChip2 = _slicedToArray(_validateChip, 2),
            keyValidation = _validateChip2[0],
            valueValidation = _validateChip2[1];

        if (keyValidation && valueValidation) return {
          key: keyValidation,
          value: valueValidation
        };
        if (keyValidation) return {
          key: keyValidation
        };
        if (valueValidation) return {
          value: valueValidation
        };
        return null;
      });
    } // uniqueness


    fieldsArray.forEach(function (chip, index) {
      var isUnique = uniquenessValidator(chip.key, index);

      if (!isUnique) {
        if ((0, _lodash.get)(errorData, [index, 'key'], false)) {
          errorData.at(index).key.push(_formChipCell.uniquenessError);
        } else {
          (0, _lodash.set)(errorData, [index, 'key'], [_formChipCell.uniquenessError]);
        }
      }
    });

    if (!errorData && validator) {
      errorData = validator(fieldsArray);
    }

    if (errorData.every(function (label) {
      return (0, _lodash.isNil)(label);
    })) {
      return [];
    }

    return errorData;
  };

  var validateChip = function validateChip(_ref3) {
    var key = _ref3.key,
        value = _ref3.value;

    var validateField = function validateField(value, field) {
      var _checkPatternsValidit = (0, _validation.checkPatternsValidity)(validationRules[field].filter(function (rule) {
        return rule.pattern;
      }), value),
          _checkPatternsValidit2 = _slicedToArray(_checkPatternsValidit, 2),
          newRules = _checkPatternsValidit2[0],
          isValidField = _checkPatternsValidit2[1];

      if (isValidField) return null;
      var invalidRules = newRules.filter(function (rule) {
        return !rule.isValid;
      });
      return invalidRules.map(function (rule) {
        return {
          name: rule.name,
          label: rule.label
        };
      });
    };

    return [validateField(key, 'key'), validateField(value, 'value')];
  };

  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    className: "chips",
    children: [label && /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
      className: "chips__label",
      children: label
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
      className: label ? 'chips__wrapper' : '',
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_FormChipCellView.default, {
        chipOptions: chipOptions,
        chips: chips,
        editConfig: editConfig,
        handleAddNewChip: handleAddNewChip,
        handleEditChip: handleEditChip,
        handleRemoveChip: handleRemoveChip,
        handleShowElements: handleShowElements,
        handleToEditMode: handleToEditMode,
        isEditMode: isEditMode,
        name: name,
        ref: {
          chipsCellRef: chipsCellRef,
          chipsWrapperRef: chipsWrapperRef
        },
        setChipsSizes: setChipsSizes,
        setEditConfig: setEditConfig,
        shortChips: shortChips,
        showChips: showChips,
        showHiddenChips: showHiddenChips,
        validateFields: validateFields,
        validationRules: validationRules
      })
    })]
  });
};

FormChipCell.defaultProps = {
  chipOptions: {
    background: 'purple',
    boldValue: false,
    borderRadius: 'primary',
    borderColor: 'transparent',
    density: 'dense',
    font: 'purple'
  },
  delimiter: null,
  isEditMode: false,
  label: null,
  onClick: function onClick() {},
  shortChips: false,
  validationRules: {},
  validator: function validator() {},
  visibleChipsMaxLength: 'all'
};
FormChipCell.propTypes = {
  chipOptions: _types.CHIP_OPTIONS,
  delimiter: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.element]),
  formState: _propTypes.default.shape({}).isRequired,
  initialValues: _propTypes.default.object.isRequired,
  isEditMode: _propTypes.default.bool,
  label: _propTypes.default.string,
  name: _propTypes.default.string.isRequired,
  onClick: _propTypes.default.func,
  shortChips: _propTypes.default.bool,
  validationRules: _propTypes.default.object,
  validator: _propTypes.default.func,
  visibleChipsMaxLength: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.number])
};

var _default = /*#__PURE__*/_react.default.memo(FormChipCell);

exports.default = _default;