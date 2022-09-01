"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _FormChip = _interopRequireDefault(require("../../components/FormChipCell/FormChip/FormChip"));

var _TextTooltipTemplate = _interopRequireDefault(require("../../components/TooltipTemplate/TextTooltipTemplate"));

var _Tooltip = _interopRequireDefault(require("../../components/Tooltip/Tooltip"));

var _getFirstScrollableParent = require("../../utils/getFirstScrollableParent.util");

var _types = require("../../types");

require("./hiddenChipsBlock.scss");

var _jsxRuntime = require("react/jsx-runtime");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var HiddenChipsBlock = /*#__PURE__*/_react.default.forwardRef(function (_ref, ref) {
  var chipClassNames = _ref.chipClassNames,
      chipIndex = _ref.chipIndex,
      chipOptions = _ref.chipOptions,
      chips = _ref.chips,
      className = _ref.className,
      editConfig = _ref.editConfig,
      handleEditChip = _ref.handleEditChip,
      handleIsEdit = _ref.handleIsEdit,
      handleRemoveChip = _ref.handleRemoveChip,
      handleShowElements = _ref.handleShowElements,
      isEditMode = _ref.isEditMode,
      setChipsSizes = _ref.setChipsSizes,
      setEditConfig = _ref.setEditConfig;

  var _useState = (0, _react.useState)(false),
      _useState2 = _slicedToArray(_useState, 2),
      isTop = _useState2[0],
      setIsTop = _useState2[1];

  var _useState3 = (0, _react.useState)(true),
      _useState4 = _slicedToArray(_useState3, 2),
      isRight = _useState4[0],
      setIsRight = _useState4[1];

  var _useState5 = (0, _react.useState)(false),
      _useState6 = _slicedToArray(_useState5, 2),
      isVisible = _useState6[0],
      setIsVisible = _useState6[1];

  var _useState7 = (0, _react.useState)(window.innerWidth / 2),
      _useState8 = _slicedToArray(_useState7, 2),
      windowHalfWidth = _useState8[0],
      setWindowHalfWidth = _useState8[1];

  var hiddenRef = (0, _react.useRef)();
  var offset = 28;
  var hiddenChipsBlockClassNames = (0, _classnames.default)('chip-block-hidden', isTop ? 'chip-block-hidden_top' : 'chip-block-hidden_bottom', isRight ? 'chip-block-hidden_right' : 'chip-block-hidden_left', isVisible && 'chip-block-hidden_visible');
  var handleResize = (0, _react.useCallback)(function () {
    if (hiddenRef !== null && hiddenRef !== void 0 && hiddenRef.current) {
      setWindowHalfWidth(parseInt(window.innerWidth / 2));
    }
  }, [hiddenRef]);

  var generateChipData = function generateChipData(chip) {
    return "".concat(chip.key).concat(chip.delimiter ? chip.delimiter : ':', " ").concat(chip.value);
  };

  (0, _react.useEffect)(function () {
    handleResize();
  }, [handleResize]);
  (0, _react.useEffect)(function () {
    if (hiddenRef !== null && hiddenRef !== void 0 && hiddenRef.current) {
      window.addEventListener('resize', handleResize);
      return function () {
        return window.removeEventListener('resize', handleResize);
      };
    }
  }, [handleResize, hiddenRef]);
  (0, _react.useEffect)(function () {
    if (hiddenRef !== null && hiddenRef !== void 0 && hiddenRef.current) {
      var scrollableParent = (0, _getFirstScrollableParent.getFirstScrollableParentUtil)(hiddenRef.current.offsetParent);

      var _hiddenRef$current$ge = hiddenRef.current.getBoundingClientRect(),
          height = _hiddenRef$current$ge.height,
          top = _hiddenRef$current$ge.top;

      var _ref$current$getBound = ref.current.getBoundingClientRect(),
          right = _ref$current$getBound.right;

      if (hiddenRef.current.offsetParent.getBoundingClientRect().top - hiddenRef.current.offsetParent.clientHeight - height - offset < 0 || scrollableParent.getBoundingClientRect().top > top) {
        setIsTop(true);
      }

      setIsRight(right <= windowHalfWidth);
      setIsVisible(true);
    }
  }, [hiddenRef, isRight, offset, ref, windowHalfWidth]);
  (0, _react.useEffect)(function () {
    if (chips.length === 0) {
      handleShowElements();
    }
  });
  return /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
    ref: hiddenRef,
    className: hiddenChipsBlockClassNames,
    children: chips === null || chips === void 0 ? void 0 : chips.map(function (element, index) {
      return /*#__PURE__*/(0, _jsxRuntime.jsx)(_Tooltip.default, {
        template: /*#__PURE__*/(0, _jsxRuntime.jsx)(_TextTooltipTemplate.default, {
          text: element.delimiter ? /*#__PURE__*/(0, _jsxRuntime.jsxs)("span", {
            className: "chip__content",
            children: [element.key, /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
              className: "chip__delimiter",
              children: element.delimiter
            }), element.value]
          }) : generateChipData(element)
        }),
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_FormChip.default, {
          chip: element,
          chipClassNames: chipClassNames,
          chipIndex: index + chipIndex,
          chipOptions: chipOptions,
          className: className,
          editConfig: editConfig,
          handleEditChip: handleEditChip,
          handleIsEdit: handleIsEdit,
          handleRemoveChip: handleRemoveChip,
          hiddenChips: true,
          isEditMode: isEditMode,
          ref: hiddenRef,
          setChipsSizes: setChipsSizes,
          setEditConfig: setEditConfig,
          showChips: true,
          textOverflowEllipsis: true
        })
      }, element.value);
    })
  });
});

HiddenChipsBlock.defaultProps = {
  chips: [],
  chipIndex: 0,
  editConfig: {},
  isEditMode: false
};
HiddenChipsBlock.propTypes = {
  chipClassNames: _propTypes.default.string.isRequired,
  chipIndex: _propTypes.default.number,
  chipOptions: _types.CHIP_OPTIONS.isRequired,
  chips: _propTypes.default.array.isRequired,
  className: _propTypes.default.string,
  editConfig: _propTypes.default.shape({}),
  handleEditChip: _propTypes.default.func.isRequired,
  handleIsEdit: _propTypes.default.func.isRequired,
  handleRemoveChip: _propTypes.default.func.isRequired,
  handleShowElements: _propTypes.default.func.isRequired,
  isEditMode: _propTypes.default.bool,
  setEditConfig: _propTypes.default.func.isRequired,
  setChipsSizes: _propTypes.default.func.isRequired
};
var _default = HiddenChipsBlock;
exports.default = _default;