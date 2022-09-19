"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _reactTransitionGroup = require("react-transition-group");

require("./Backdrop.scss");

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
var Backdrop = function Backdrop(_ref) {
  var _ref$duration = _ref.duration,
      duration = _ref$duration === void 0 ? 300 : _ref$duration,
      show = _ref.show,
      onClose = _ref.onClose;
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactTransitionGroup.CSSTransition, {
    in: show,
    timeout: duration,
    classNames: "backdrop-transition",
    mountOnEnter: true,
    unmountOnExit: true,
    children: /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
      className: "backdrop",
      onClick: onClose
    })
  });
};

Backdrop.defaultProps = {
  duration: 300,
  show: false
};
Backdrop.propTypes = {
  show: _propTypes.default.bool.isRequired
};
var _default = Backdrop;
exports.default = _default;