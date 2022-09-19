"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getFirstScrollableParentUtil = void 0;

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
var regex = /(auto|scroll|hidden)/;

var style = function style(node, prop) {
  return getComputedStyle(node, null).getPropertyValue(prop);
};

var scroll = function scroll(node) {
  return regex.test(style(node, 'overflow') + style(node, 'overflow-y') + style(node, 'overflow-x'));
};

var getFirstScrollableParentUtil = function getFirstScrollableParentUtil(node) {
  return !node || node === document.body ? document.body : scroll(node) ? node : getFirstScrollableParentUtil(node.parentNode);
};

exports.getFirstScrollableParentUtil = getFirstScrollableParentUtil;