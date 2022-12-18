"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _reactFinalFormArrays = require("react-final-form-arrays");

var _Tooltip = _interopRequireDefault(require("../Tooltip/Tooltip"));

var _TextTooltipTemplate = _interopRequireDefault(require("../TooltipTemplate/TextTooltipTemplate"));

var _RoundedIcon = _interopRequireDefault(require("../RoundedIcon/RoundedIcon"));

var _FormInput = _interopRequireDefault(require("../FormInput/FormInput"));

var _FormSelect = _interopRequireDefault(require("../FormSelect/FormSelect"));

var _close = require("../../images/close.svg");

var _edit = require("../../images/edit.svg");

var _plus = require("../../images/plus.svg");

var _delete = require("../../images/delete.svg");

var _checkmark = require("../../images/checkmark2.svg");

require("./formKeyValueTable.scss");

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

var FormKeyValueTable = function FormKeyValueTable(_ref) {
  var addNewItemLabel = _ref.addNewItemLabel,
      className = _ref.className,
      disabled = _ref.disabled,
      formState = _ref.formState,
      isKeyRequired = _ref.isKeyRequired,
      isValueRequired = _ref.isValueRequired,
      keyHeader = _ref.keyHeader,
      keyLabel = _ref.keyLabel,
      keyOptions = _ref.keyOptions,
      name = _ref.name,
      valueHeader = _ref.valueHeader,
      valueLabel = _ref.valueLabel;

  var _useState = (0, _react.useState)(false),
      _useState2 = _slicedToArray(_useState, 2),
      isEditMode = _useState2[0],
      setEditMode = _useState2[1];

  var _useState3 = (0, _react.useState)(null),
      _useState4 = _slicedToArray(_useState3, 2),
      selectedItem = _useState4[0],
      setSelectedItem = _useState4[1];

  var tableClassNames = (0, _classnames.default)('form-key-value-table', className);
  var addBtnClassNames = (0, _classnames.default)('add-new-item-btn', disabled && 'disabled');

  var exitEditMode = function exitEditMode() {
    setSelectedItem(null);
    setEditMode(false);
  };

  var enterEditMode = function enterEditMode(event, fields, index) {
    if (!disabled) {
      applyOrDiscardOrDelete(event, fields);
      exitEditMode();
      var editItem = fields.value[index];
      setSelectedItem(_objectSpread(_objectSpread({}, editItem), {}, {
        index: index
      }));
      setEditMode(true);
    }
  };

  var applyChanges = function applyChanges(event, fields, index) {
    var _formState$errors;

    if (!(formState !== null && formState !== void 0 && (_formState$errors = formState.errors) !== null && _formState$errors !== void 0 && _formState$errors[name])) {
      exitEditMode();
    } else {
      formState.form.mutators.setFieldState("".concat(name, "[").concat(index, "].key"), {
        modified: true
      });
      formState.form.mutators.setFieldState("".concat(name, "[").concat(index, "].value"), {
        modified: true
      });
    }
  };

  var discardChanges = function discardChanges(event, fields, index) {
    exitEditMode();
    fields.update(index, {
      key: selectedItem.key,
      value: selectedItem.value
    });
    event && event.stopPropagation();
  };

  var addNewRow = function addNewRow(event, fields) {
    if (!disabled) {
      var _formState$values$nam, _formState$values$nam2;

      applyOrDiscardOrDelete(event, fields);
      formState.form.mutators.push(name, {
        key: '',
        value: ''
      });
      setSelectedItem({
        key: '',
        value: '',
        isNew: true,
        index: (_formState$values$nam = (_formState$values$nam2 = formState.values[name]) === null || _formState$values$nam2 === void 0 ? void 0 : _formState$values$nam2.length) !== null && _formState$values$nam !== void 0 ? _formState$values$nam : 0
      });
      setEditMode(true);
    }
  };

  var deleteRow = function deleteRow(event, fields, index) {
    if (isEditMode && index !== selectedItem.index) {
      applyOrDiscardOrDelete(event, fields);
    }

    exitEditMode();
    fields.remove(index);
    event && event.stopPropagation();
  };

  var applyOrDiscardOrDelete = function applyOrDiscardOrDelete(event, fields) {
    if (isEditMode) {
      var _formState$errors2;

      if (!(formState !== null && formState !== void 0 && (_formState$errors2 = formState.errors) !== null && _formState$errors2 !== void 0 && _formState$errors2[name])) {
        applyChanges(event, fields, selectedItem.index);
      } else {
        discardOrDelete(event, fields, selectedItem.index);
      }
    }
  };

  var discardOrDelete = function discardOrDelete(event, fields, index) {
    if (selectedItem !== null && selectedItem !== void 0 && selectedItem.isNew || !isEditMode) {
      deleteRow(event, fields, index);
    } else {
      discardChanges(event, fields, index);
    }
  };

  var uniquenessValidator = function uniquenessValidator(fields, newValue) {
    return !fields.value.some(function (_ref2, index) {
      var key = _ref2.key;
      return newValue.trim() === key && index !== selectedItem.index;
    });
  };

  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    className: tableClassNames,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
      className: "table-row table-row__header no-hover",
      children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
        className: "table-cell__inputs-wrapper",
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
          className: "table-cell table-cell__key",
          children: keyHeader
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
          className: "table-cell table-cell__value",
          children: valueHeader
        })]
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
        className: "table-cell table-cell__actions"
      })]
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactFinalFormArrays.FieldArray, {
      name: name,
      children: function children(_ref3) {
        var fields = _ref3.fields;
        return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
          children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
            className: "key-value-table__body",
            children: fields.map(function (contentItem, index) {
              return isEditMode && index === selectedItem.index && !disabled ? /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
                className: "table-row table-row_edit",
                children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
                  className: "table-cell table-cell__key",
                  children: keyOptions ? /*#__PURE__*/(0, _jsxRuntime.jsx)(_FormSelect.default, {
                    name: "".concat(contentItem, ".key"),
                    density: "dense",
                    options: keyOptions
                  }) : /*#__PURE__*/(0, _jsxRuntime.jsx)(_FormInput.default, {
                    className: "input_edit",
                    placeholder: keyLabel,
                    density: "dense",
                    name: "".concat(contentItem, ".key"),
                    required: isKeyRequired,
                    validationRules: [{
                      name: 'uniqueness',
                      label: 'Name should be unique',
                      pattern: function pattern(newValue) {
                        return uniquenessValidator(fields, newValue);
                      }
                    }]
                  })
                }), /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
                  className: "table-cell table-cell__value",
                  children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_FormInput.default, {
                    className: "input_edit",
                    placeholder: valueLabel,
                    density: "dense",
                    name: "".concat(contentItem, ".value"),
                    required: isValueRequired
                  })
                }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
                  className: "table-cell table-cell__actions",
                  children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_RoundedIcon.default, {
                    className: "key-value-table__btn",
                    onClick: function onClick(event) {
                      return applyChanges(event, fields, index);
                    },
                    tooltipText: "Apply",
                    children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_checkmark.ReactComponent, {})
                  }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_RoundedIcon.default, {
                    className: "key-value-table__btn",
                    onClick: function onClick(event) {
                      return discardOrDelete(event, fields, index);
                    },
                    tooltipText: selectedItem.isNew ? 'Delete' : 'Discard changes',
                    children: selectedItem.isNew ? /*#__PURE__*/(0, _jsxRuntime.jsx)(_delete.ReactComponent, {}) : /*#__PURE__*/(0, _jsxRuntime.jsx)(_close.ReactComponent, {})
                  })]
                })]
              }, index) : /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
                className: "table-row",
                onClick: function onClick(event) {
                  return enterEditMode(event, fields, index);
                },
                children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
                  className: "table-cell__inputs-wrapper",
                  children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
                    className: "table-cell table-cell__key",
                    children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_Tooltip.default, {
                      template: /*#__PURE__*/(0, _jsxRuntime.jsx)(_TextTooltipTemplate.default, {
                        text: fields.value[index].key
                      }),
                      children: fields.value[index].key
                    })
                  }), /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
                    className: "table-cell table-cell__value",
                    children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_Tooltip.default, {
                      template: /*#__PURE__*/(0, _jsxRuntime.jsx)(_TextTooltipTemplate.default, {
                        text: fields.value[index].value
                      }),
                      children: fields.value[index].value
                    })
                  })]
                }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
                  className: "table-cell table-cell__actions",
                  children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_RoundedIcon.default, {
                    className: "key-value-table__btn",
                    onClick: function onClick(event) {
                      event.preventDefault();
                    },
                    tooltipText: "Edit",
                    children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_edit.ReactComponent, {})
                  }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_RoundedIcon.default, {
                    className: "key-value-table__btn",
                    onClick: function onClick(event) {
                      deleteRow(event, fields, index);
                    },
                    tooltipText: "Delete",
                    children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_delete.ReactComponent, {})
                  })]
                })]
              }, index);
            })
          }), !(selectedItem !== null && selectedItem !== void 0 && selectedItem.isNew) && /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
            className: "table-row table-row__last no-hover",
            children: /*#__PURE__*/(0, _jsxRuntime.jsxs)("button", {
              className: addBtnClassNames,
              onClick: function onClick(event) {
                addNewRow(event, fields);
              },
              children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_plus.ReactComponent, {}), addNewItemLabel]
            })
          })]
        });
      }
    })]
  });
};

FormKeyValueTable.defaultProps = {
  addNewItemLabel: 'Add new item',
  className: '',
  disabled: false,
  isKeyRequired: true,
  isValueRequired: true,
  keyHeader: 'Key',
  keyLabel: 'Key',
  keyOptions: null,
  valueHeader: 'Value',
  valueLabel: 'Value'
};
FormKeyValueTable.propTypes = {
  addNewItemLabel: _propTypes.default.string,
  className: _propTypes.default.string,
  disabled: _propTypes.default.bool,
  formState: _propTypes.default.shape({}).isRequired,
  isKeyRequired: _propTypes.default.bool,
  isValueRequired: _propTypes.default.bool,
  keyHeader: _propTypes.default.string,
  keyLabel: _propTypes.default.string,
  keyOptions: _propTypes.default.arrayOf(_propTypes.default.shape({
    label: _propTypes.default.string.isRequired,
    id: _propTypes.default.string.isRequired
  })),
  name: _propTypes.default.string.isRequired,
  valueHeader: _propTypes.default.string,
  valueLabel: _propTypes.default.string
};
var _default = FormKeyValueTable;
exports.default = _default;