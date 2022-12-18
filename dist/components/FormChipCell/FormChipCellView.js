"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _reactFinalFormArrays = require("react-final-form-arrays");

var _Tooltip = _interopRequireDefault(require("../Tooltip/Tooltip"));

var _FormChip = _interopRequireDefault(require("./FormChip/FormChip"));

var _TextTooltipTemplate = _interopRequireDefault(require("../TooltipTemplate/TextTooltipTemplate"));

var _HiddenChipsBlock = _interopRequireDefault(require("../../elements/HiddenChipsBlock/HiddenChipsBlock"));

var _types = require("../../types");

var _formChipCell = require("./formChipCell.util");

var _common = require("../../utils/common.util");

var _add = require("../../images/add.svg");

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
var FormChipCellView = /*#__PURE__*/_react.default.forwardRef(function (_ref, _ref2) {
  var chipOptions = _ref.chipOptions,
      chips = _ref.chips,
      editConfig = _ref.editConfig,
      handleAddNewChip = _ref.handleAddNewChip,
      _handleEditChip = _ref.handleEditChip,
      _handleRemoveChip = _ref.handleRemoveChip,
      handleShowElements = _ref.handleShowElements,
      handleToEditMode = _ref.handleToEditMode,
      isEditMode = _ref.isEditMode,
      name = _ref.name,
      setChipsSizes = _ref.setChipsSizes,
      setEditConfig = _ref.setEditConfig,
      shortChips = _ref.shortChips,
      showChips = _ref.showChips,
      showHiddenChips = _ref.showHiddenChips,
      validateFields = _ref.validateFields,
      validationRules = _ref.validationRules;
  var chipsCellRef = _ref2.chipsCellRef,
      chipsWrapperRef = _ref2.chipsWrapperRef;
  var buttonAddClassNames = (0, _classnames.default)('button-add', chipOptions.background && "button-add-background_".concat(chipOptions.background), chipOptions.borderColor && "button-add-border_".concat(chipOptions.borderColor), chipOptions.font && "button-add-font_".concat(chipOptions.font), chipOptions.density && "button-add-density_".concat(chipOptions.density));
  var wrapperClassNames = (0, _classnames.default)('chips-wrapper', isEditMode && 'fixed-max-width');
  var chipClassNames = (0, _classnames.default)('chip', 'chip__content', isEditMode && 'data-ellipsis', shortChips && 'chip_short', chips.hiddenChips && 'chip_hidden', chipOptions.density && "chip-density_".concat(chipOptions.density), chipOptions.borderRadius && "chip-border_".concat(chipOptions.borderRadius), chipOptions.background && "chip-background_".concat(chipOptions.background), chipOptions.borderColor && "chip-border_".concat(chipOptions.borderColor), chipOptions.font && "chip-font_".concat(chipOptions.font), isEditMode && 'editable', (showChips || isEditMode) && 'chip_visible');
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactFinalFormArrays.FieldArray, {
    name: name,
    validate: validateFields,
    children: function children(_ref3) {
      var fields = _ref3.fields,
          meta = _ref3.meta;

      if (validationRules.key.every(function (rule) {
        return rule.name !== _formChipCell.uniquenessError.name;
      })) {
        validationRules.key.push(_formChipCell.uniquenessError);
      }

      return (isEditMode || !(0, _common.isEveryObjectValueEmpty)(fields)) && /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
        className: "chips-cell",
        ref: chipsCellRef,
        children: /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
          className: wrapperClassNames,
          ref: chipsWrapperRef,
          children: [fields.map(function (contentItem, index) {
            var chipData = fields.value[index];
            return index < chips.visibleChips.length && /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
              className: "chip-block",
              children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_Tooltip.default, {
                hidden: editConfig.isEdit,
                template: /*#__PURE__*/(0, _jsxRuntime.jsx)(_TextTooltipTemplate.default, {
                  text: /*#__PURE__*/(0, _jsxRuntime.jsxs)("span", {
                    className: "chip__content",
                    children: [chipData.key, /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
                      className: "chip__delimiter",
                      children: chipData.delimiter ? chipData.delimiter : ':'
                    }), chipData.value]
                  })
                }),
                children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_FormChip.default, {
                  chip: chipData,
                  chipIndex: index,
                  chipOptions: chipOptions,
                  editConfig: editConfig,
                  handleEditChip: function handleEditChip(event, nameEvent) {
                    return _handleEditChip(event, fields, nameEvent);
                  },
                  handleRemoveChip: function handleRemoveChip(event, index) {
                    return _handleRemoveChip(event, fields, index);
                  },
                  handleToEditMode: handleToEditMode,
                  isEditMode: isEditMode,
                  keyName: "".concat(contentItem, ".key"),
                  meta: meta,
                  ref: chipsCellRef,
                  setChipsSizes: setChipsSizes,
                  setEditConfig: setEditConfig,
                  validationRules: validationRules,
                  valueName: "".concat(contentItem, ".value")
                })
              }, chipData.id)
            }, chipData.id);
          }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
            className: "chip-block",
            children: [chips.hiddenChips.length > 0 && showHiddenChips && /*#__PURE__*/(0, _jsxRuntime.jsx)(_HiddenChipsBlock.default, {
              chipClassNames: chipClassNames,
              chipOptions: chipOptions,
              chips: chips.hiddenChips,
              handleShowElements: handleShowElements,
              ref: chipsCellRef,
              textOverflowEllipsis: true
            }), chips.hiddenChipsNumber && /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
              className: "".concat(chipClassNames, " chips_button"),
              onClick: handleShowElements,
              children: chips.hiddenChipsNumber
            })]
          }), isEditMode && /*#__PURE__*/(0, _jsxRuntime.jsx)("button", {
            className: buttonAddClassNames,
            onClick: function onClick(e) {
              return handleAddNewChip(e, fields);
            },
            children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_add.ReactComponent, {})
          })]
        })
      });
    }
  });
});

FormChipCellView.defaultProps = {
  chipOptions: {
    background: 'purple',
    boldValue: false,
    borderRadius: 'primary',
    borderColor: 'transparent',
    density: 'dense',
    font: 'purple'
  },
  isEditMode: false,
  shortChips: false,
  validationRules: {}
};
FormChipCellView.propTypes = {
  chipOptions: _types.CHIP_OPTIONS,
  chips: _propTypes.default.object.isRequired,
  editConfig: _propTypes.default.object.isRequired,
  handleAddNewChip: _propTypes.default.func.isRequired,
  handleEditChip: _propTypes.default.func.isRequired,
  handleRemoveChip: _propTypes.default.func.isRequired,
  handleShowElements: _propTypes.default.func.isRequired,
  handleToEditMode: _propTypes.default.func.isRequired,
  isEditMode: _propTypes.default.bool,
  name: _propTypes.default.string.isRequired,
  setChipsSizes: _propTypes.default.func.isRequired,
  setEditConfig: _propTypes.default.func.isRequired,
  shortChips: _propTypes.default.bool,
  showChips: _propTypes.default.bool.isRequired,
  showHiddenChips: _propTypes.default.bool.isRequired,
  validateFields: _propTypes.default.func.isRequired,
  validationRules: _propTypes.default.object
};
var _default = FormChipCellView;
exports.default = _default;