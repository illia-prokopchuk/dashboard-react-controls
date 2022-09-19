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
export const BACKSPACE = 'Backspace'
export const CLICK = 'Click'
export const DELETE = 'Delete'
export const TAB = 'Tab'
export const TAB_SHIFT = 'Tab+Shift'

/*=========== BUTTONS =============*/

export const PRIMARY_BUTTON = 'primary'
export const SECONDARY_BUTTON = 'secondary'
export const TERTIARY_BUTTON = 'tertiary'
export const DANGER_BUTTON = 'danger'
export const LABEL_BUTTON = 'label'

/*=========== VALITATION =============*/

export const validation = {
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
}

/*=========== STATUS CODES =============*/

export const INTERNAL_SERVER_ERROR_STATUS_CODE = 500
export const CONFLICT_ERROR_STATUS_CODE = 409
export const FORBIDDEN_ERROR_STATUS_CODE = 403

/*=========== MODAL =============*/

export const MODAL_SM = 'sm'
export const MODAL_MD = 'md'
export const MODAL_LG = 'lg'
