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
import { create } from 'react-modal-promise'
import { differenceWith, isEqual, omit, isEmpty } from 'lodash'

export const openPopUp = (element, props) => {
  return create(element)(props)
}

export const isEveryObjectValueEmpty = (obj) =>
  Object.values(obj).every((item) => !item || item.length === 0)

// Checks, whether two arrays of objects are equal, can omit some keys if their comparison is not necessary
export const areArraysEqual = (firstArray, secondArray, omitBy = []) => {
  if (firstArray.length !== secondArray.length) return false

  return isEmpty(
    differenceWith(firstArray, secondArray, (a, b) => {
      return isEqual(omit(a, omitBy), omit(b, omitBy))
    })
  )
}
