"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _Button = _interopRequireDefault(require("../Button/Button"));

var _PopUpDialog = _interopRequireDefault(require("../PopUpDialog/PopUpDialog"));

var _types = require("../../types");

require("./confirmDialog.scss");

var _jsxRuntime = require("react/jsx-runtime");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ConfirmDialog = function ConfirmDialog(_ref) {
  var cancelButton = _ref.cancelButton,
      className = _ref.className,
      closePopUp = _ref.closePopUp,
      confirmButton = _ref.confirmButton,
      customPosition = _ref.customPosition,
      header = _ref.header,
      isOpen = _ref.isOpen,
      message = _ref.message,
      messageOnly = _ref.messageOnly,
      onResolve = _ref.onResolve;
  var messageClassNames = (0, _classnames.default)('confirm-dialog__message', messageOnly && 'confirm-dialog__message-only');

  var handleCancelDialog = function handleCancelDialog(event) {
    onResolve && onResolve();
    cancelButton.handler && cancelButton.handler(event);
  };

  var handleCloseDialog = function handleCloseDialog(event) {
    onResolve && onResolve();
    closePopUp && closePopUp(event);
  };

  var handleConfirmDialog = function handleConfirmDialog(event) {
    onResolve && onResolve();
    confirmButton.handler(event);
  };

  return isOpen && /*#__PURE__*/(0, _jsxRuntime.jsx)(_PopUpDialog.default, {
    className: className,
    closePopUp: handleCloseDialog,
    customPosition: customPosition,
    headerText: header,
    children: /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
      className: "confirm-dialog",
      children: [message && /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
        className: messageClassNames,
        children: message
      }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
        className: "confirm-dialog__btn-container",
        children: [cancelButton && /*#__PURE__*/(0, _jsxRuntime.jsx)(_Button.default, {
          className: "pop-up-dialog__btn_cancel",
          label: cancelButton.label,
          onClick: handleCancelDialog,
          variant: cancelButton.variant
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_Button.default, {
          label: confirmButton.label,
          onClick: handleConfirmDialog,
          variant: confirmButton.variant
        })]
      })]
    })
  });
};

ConfirmDialog.defaultProps = {
  cancelButton: null,
  className: '',
  customPosition: {},
  header: '',
  message: '',
  messageOnly: false
};
ConfirmDialog.propTypes = {
  cancelButton: _types.CONFIRM_DIALOG_CANCEL_BUTTON,
  className: _propTypes.default.string,
  closePopUp: _propTypes.default.func,
  confirmButton: _types.CONFIRM_DIALOG_SUBMIT_BUTTON.isRequired,
  customPosition: _propTypes.default.object,
  header: _propTypes.default.string,
  message: _propTypes.default.string,
  messageOnly: _propTypes.default.bool
};
var _default = ConfirmDialog;
exports.default = _default;