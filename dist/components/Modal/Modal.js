"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _reactTransitionGroup = require("react-transition-group");

var _classnames = _interopRequireDefault(require("classnames"));

var _Backdrop = _interopRequireDefault(require("../Backdrop/Backdrop"));

var _RoundedIcon = _interopRequireDefault(require("../RoundedIcon/RoundedIcon"));

var _constants = require("../../constants");

var _types = require("../../types");

var _close = require("../../images/close.svg");

require("./Modal.scss");

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

var Modal = function Modal(_ref) {
  var actions = _ref.actions,
      children = _ref.children,
      className = _ref.className,
      location = _ref.location,
      onClose = _ref.onClose,
      size = _ref.size,
      show = _ref.show,
      title = _ref.title;

  var _useState = (0, _react.useState)(location.pathname),
      _useState2 = _slicedToArray(_useState, 2),
      currentLocation = _useState2[0],
      setCurrentLocation = _useState2[1];

  var modalClassNames = (0, _classnames.default)('modal', className, size && "modal-".concat(size));
  (0, _react.useEffect)(function () {
    setCurrentLocation(location.pathname);
    return function () {
      if (location.pathname !== currentLocation) {
        onClose();
      }
    };
  }, [currentLocation, location, onClose]);
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_Backdrop.default, {
      onClose: onClose,
      show: show
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactTransitionGroup.CSSTransition, {
      in: show,
      timeout: 300,
      classNames: "modal-transition",
      unmountOnExit: true,
      children: /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
        className: modalClassNames,
        "data-testid": "modal",
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
          className: "modal__header-button",
          children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_RoundedIcon.default, {
            "data-testid": "pop-up-close-btn",
            onClick: onClose,
            tooltipText: "Close",
            children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_close.ReactComponent, {})
          })
        }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
          className: "modal__content",
          children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
            className: "modal__header",
            children: /*#__PURE__*/(0, _jsxRuntime.jsx)("h5", {
              className: "modal__header-title",
              children: title
            })
          }), /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
            className: "modal__body",
            children: children
          }), actions && actions.length > 0 && /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
            className: "modal__footer",
            children: /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
              className: "modal__footer-actions",
              children: actions.map(function (action, idx) {
                return /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
                  children: action
                }, idx);
              })
            })
          })]
        })]
      })
    })]
  });
};

Modal.defaultProps = {
  actions: [],
  show: false,
  size: _constants.MODAL_MD,
  title: ''
};
Modal.propTypes = {
  actions: _propTypes.default.array,
  children: _propTypes.default.oneOfType([_propTypes.default.element, _propTypes.default.object, _propTypes.default.node, _propTypes.default.string]).isRequired,
  location: _propTypes.default.object.isRequired,
  onClose: _propTypes.default.func.isRequired,
  show: _propTypes.default.bool.isRequired,
  size: _types.MODAL_SIZES,
  title: _propTypes.default.string
};
var _default = Modal;
exports.default = _default;