"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.validation = exports.TERTIARY_BUTTON = exports.TAB_SHIFT = exports.TAB = exports.SECONDARY_BUTTON = exports.PRIMARY_BUTTON = exports.MODAL_SM = exports.MODAL_MD = exports.MODAL_LG = exports.LABEL_BUTTON = exports.INTERNAL_SERVER_ERROR_STATUS_CODE = exports.FORBIDDEN_ERROR_STATUS_CODE = exports.DELETE = exports.DANGER_BUTTON = exports.CONFLICT_ERROR_STATUS_CODE = exports.CLICK = exports.BACKSPACE = void 0;

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

/*=========== EVENT KEYS =============*/
var BACKSPACE = 'Backspace';
exports.BACKSPACE = BACKSPACE;
var CLICK = 'Click';
exports.CLICK = CLICK;
var DELETE = 'Delete';
exports.DELETE = DELETE;
var TAB = 'Tab';
exports.TAB = TAB;
var TAB_SHIFT = 'Tab+Shift';
/*=========== BUTTONS =============*/

exports.TAB_SHIFT = TAB_SHIFT;
var PRIMARY_BUTTON = 'primary';
exports.PRIMARY_BUTTON = PRIMARY_BUTTON;
var SECONDARY_BUTTON = 'secondary';
exports.SECONDARY_BUTTON = SECONDARY_BUTTON;
var TERTIARY_BUTTON = 'tertiary';
exports.TERTIARY_BUTTON = TERTIARY_BUTTON;
var DANGER_BUTTON = 'danger';
exports.DANGER_BUTTON = DANGER_BUTTON;
var LABEL_BUTTON = 'label';
/*=========== VALITATION =============*/

exports.LABEL_BUTTON = LABEL_BUTTON;
var validation = {
  BEGIN_END_NOT_WITH: 'Must not begin and end with',
  BEGIN_END_WITH: 'Must begin and end with',
  BEGIN_NOT_WITH: 'Must not begin with',
  BEGIN_WITH: 'Must begin with',
  END_NOT_WITH: 'Must not end with',
  END_WITH: 'Must end with',
  MUST_CONTAIN_EXACTLY_ONE: 'Must contain exactly one',
  MUST_HAVE_DOT_AFTER_AT: 'Must have at least one . after @',
  MUST_NOT_BE: 'Must not be',
  NO_CONSECUTIVE_CHARACTER: 'No consecutive characters',
  ONLY_AT_THE_BEGINNING: 'Only at the beginning',
  REQUIRED: 'This field is required',
  VALID_CHARACTERS: 'Valid characters'
};
/*=========== STATUS CODES =============*/

exports.validation = validation;
var INTERNAL_SERVER_ERROR_STATUS_CODE = 500;
exports.INTERNAL_SERVER_ERROR_STATUS_CODE = INTERNAL_SERVER_ERROR_STATUS_CODE;
var CONFLICT_ERROR_STATUS_CODE = 409;
exports.CONFLICT_ERROR_STATUS_CODE = CONFLICT_ERROR_STATUS_CODE;
var FORBIDDEN_ERROR_STATUS_CODE = 403;
/*=========== MODAL =============*/

exports.FORBIDDEN_ERROR_STATUS_CODE = FORBIDDEN_ERROR_STATUS_CODE;
var MODAL_SM = 'sm';
exports.MODAL_SM = MODAL_SM;
var MODAL_MD = 'md';
exports.MODAL_MD = MODAL_MD;
var MODAL_LG = 'lg';
exports.MODAL_LG = MODAL_LG;