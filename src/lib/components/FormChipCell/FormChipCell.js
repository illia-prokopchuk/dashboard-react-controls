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
import React, { useState, useCallback, useRef, useEffect, useMemo } from 'react'
import lodash, { get, isEmpty, set, isNil } from 'lodash'
import PropTypes from 'prop-types'

import FormChipCellView from './FormChipCellView'

import { areArraysEqual, isEveryObjectValueEmpty } from '../../utils/common.util'
import { generateChipsList } from '../../utils/generateChipsList.util'
import { checkPatternsValidity } from '../../utils/validation.util'
import { uniquenessError } from './formChipCell.util'

import { CHIP_OPTIONS } from '../../types'
import { CLICK, TAB, TAB_SHIFT } from '../../constants'

import './formChipCell.scss'

const FormChipCell = ({
  chipOptions,
  delimiter,
  formState,
  initialValues,
  isEditMode,
  label,
  name,
  onClick,
  shortChips,
  validationRules,
  validator,
  visibleChipsMaxLength
}) => {
  const [chipsSizes, setChipsSizes] = useState({})
  const [showHiddenChips, setShowHiddenChips] = useState(false)
  const [editConfig, setEditConfig] = useState({
    chipIndex: null,
    isEdit: false,
    isKeyFocused: false,
    isValueFocused: false,
    isNewChip: false
  })

  const [showChips, setShowChips] = useState(false)
  const [visibleChipsCount, setVisibleChipsCount] = useState(8)

  const chipsCellRef = useRef()
  const chipsWrapperRef = useRef()

  const handleShowElements = useCallback(() => {
    if (!isEditMode || (isEditMode && visibleChipsMaxLength)) {
      setShowHiddenChips((state) => !state)
    }
  }, [isEditMode, visibleChipsMaxLength])

  let chips = useMemo(() => {
    return isEditMode || visibleChipsMaxLength === 'all'
      ? {
          visibleChips: get(formState.values, name),
          hiddenChips: []
        }
      : generateChipsList(
          get(formState.values, name),
          visibleChipsMaxLength ? visibleChipsMaxLength : visibleChipsCount,
          delimiter
        )
  }, [visibleChipsMaxLength, isEditMode, visibleChipsCount, delimiter, formState.values, name])

  const handleResize = useCallback(() => {
    if (!isEditMode && !isEveryObjectValueEmpty(chipsSizes)) {
      const parentSize = chipsCellRef.current?.getBoundingClientRect().width
      let maxLength = 0
      let chipIndex = 0
      const padding = 65

      Object.values(chipsSizes).every((chipSize, index) => {
        if (
          maxLength + chipSize > parentSize ||
          (Object.values(chipsSizes).length > 1 && maxLength + chipSize + padding > parentSize)
        ) {
          chipIndex = index

          return false
        } else {
          maxLength += chipSize

          if (index === Object.values(chipsSizes).length - 1) {
            chipIndex = 8
          }

          return true
        }
      })

      setVisibleChipsCount(chipIndex)
      setShowChips(true)
    }
  }, [chipsSizes, isEditMode])

  useEffect(() => {
    handleResize()
  }, [handleResize, showChips])

  useEffect(() => {
    if (!isEditMode) {
      window.addEventListener('resize', handleResize)

      return () => window.removeEventListener('resize', handleResize)
    }
  }, [handleResize, isEditMode])

  useEffect(() => {
    window.addEventListener('mainResize', handleResize)

    return () => window.removeEventListener('mainResize', handleResize)
  }, [handleResize])

  useEffect(() => {
    if (showHiddenChips) {
      window.addEventListener('click', handleShowElements)

      return () => window.removeEventListener('click', handleShowElements)
    }
  }, [showHiddenChips, handleShowElements])

  const checkChipsList = useCallback(
    (currentChipsList) => {
      if (areArraysEqual(get(initialValues, name), currentChipsList, ['id'])) {
        set(formState.initialValues, name, currentChipsList)
      }

      formState.form.mutators.setFieldState(name, { modified: true })
      formState.form.mutators.setFieldState(name, { touched: true })
    },
    [initialValues, name, formState]
  )

  const handleAddNewChip = useCallback(
    (event, fields) => {
      if (!editConfig.isEdit && !editConfig.chipIndex) {
        formState.form.mutators.push(name, {
          id: fields.value.length + new Date(),
          key: '',
          value: '',
          delimiter: delimiter
        })
      }

      if (showHiddenChips) {
        setShowHiddenChips(false)
      }

      setEditConfig({
        chipIndex: fields.value.length,
        isEdit: true,
        isKeyFocused: true,
        isValueFocused: false,
        isNewChip: true
      })

      event && event.preventDefault()
    },
    [editConfig.isEdit, editConfig.chipIndex, showHiddenChips, formState, name, delimiter]
  )

  const handleRemoveChip = useCallback(
    (event, fields, chipIndex) => {
      checkChipsList(
        lodash
          .chain(formState)
          .get(['values', name])
          .filter((_, index) => index !== chipIndex)
          .value()
      )
      fields.remove(chipIndex)

      event && event.stopPropagation()
    },
    [checkChipsList, formState, name]
  )

  const handleEditChip = useCallback(
    (event, fields, nameEvent) => {
      const { key, value } = fields.value[editConfig.chipIndex]
      const isChipNotEmpty = !!(key?.trim() && value?.trim())

      if (nameEvent === CLICK) {
        if (!isChipNotEmpty) {
          handleRemoveChip(event, fields, editConfig.chipIndex)
        }

        setEditConfig({
          chipIndex: null,
          isEdit: false,
          isKeyFocused: false,
          isValueFocused: false,
          isNewChip: false
        })
      } else if (nameEvent === TAB) {
        if (!isChipNotEmpty) {
          handleRemoveChip(event, fields, editConfig.chipIndex)
        }

        setEditConfig((prevState) => {
          const lastChipSelected = prevState.chipIndex + 1 > fields.value.length - 1

          return {
            chipIndex: lastChipSelected ? null : prevState.chipIndex + 1,
            isEdit: !lastChipSelected,
            isKeyFocused: true,
            isValueFocused: false,
            isNewChip: false
          }
        })
      } else if (nameEvent === TAB_SHIFT) {
        if (!isChipNotEmpty) {
          handleRemoveChip(event, fields, editConfig.chipIndex)
        }

        setEditConfig((prevState) => {
          const isPrevChipIndexExists = prevState.chipIndex - 1 < 0

          return {
            chipIndex: isPrevChipIndexExists ? null : prevState.chipIndex - 1,
            isEdit: !isPrevChipIndexExists,
            isKeyFocused: isPrevChipIndexExists,
            isValueFocused: !isPrevChipIndexExists,
            isNewChip: false
          }
        })
      }

      checkChipsList(get(formState.values, name))
      event && event.preventDefault()
    },
    [editConfig.chipIndex, handleRemoveChip, checkChipsList, formState.values, name]
  )

  const handleToEditMode = useCallback(
    (event, index) => {
      if (isEditMode) {
        event.stopPropagation()

        setEditConfig((preState) => ({
          ...preState,
          chipIndex: index,
          isEdit: true,
          isKeyFocused: true,
          isValueFocused: false
        }))
      }

      onClick && onClick()
    },
    [isEditMode, onClick]
  )

  const validateFields = (fieldsArray) => {
    const uniquenessValidator = (newValue, idx) => {
      return !fieldsArray.some(({ key }, index) => {
        return newValue === key && index !== idx
      })
    }
    let errorData = []

    if (!fieldsArray) return []

    if (!isEmpty(validationRules)) {
      errorData = fieldsArray.map((chip) => {
        const [keyValidation, valueValidation] = validateChip(chip)

        if (keyValidation && valueValidation) return { key: keyValidation, value: valueValidation }

        if (keyValidation) return { key: keyValidation }

        if (valueValidation) return { value: valueValidation }

        return null
      })
    }

    // uniqueness
    fieldsArray.forEach((chip, index) => {
      const isUnique = uniquenessValidator(chip.key, index)

      if (!isUnique) {
        if (get(errorData, [index, 'key'], false)) {
          errorData.at(index).key.push(uniquenessError)
        } else {
          set(errorData, [index, 'key'], [uniquenessError])
        }
      }
    })

    if (!errorData && validator) {
      errorData = validator(fieldsArray)
    }

    if (errorData.every((label) => isNil(label))) {
      return []
    }

    return errorData
  }

  const validateChip = ({ key, value }) => {
    const validateField = (value, field) => {
      const [newRules, isValidField] = checkPatternsValidity(
        validationRules[field].filter((rule) => rule.pattern),
        value
      )

      if (isValidField) return null

      const invalidRules = newRules.filter((rule) => !rule.isValid)

      return invalidRules.map((rule) => ({ name: rule.name, label: rule.label }))
    }

    return [validateField(key, 'key'), validateField(value, 'value')]
  }

  return (
    <div className="chips">
      {label && <div className="chips__label">{label}</div>}
      <div className={label ? 'chips__wrapper' : ''}>
        <FormChipCellView
          chipOptions={chipOptions}
          chips={chips}
          editConfig={editConfig}
          handleAddNewChip={handleAddNewChip}
          handleEditChip={handleEditChip}
          handleRemoveChip={handleRemoveChip}
          handleShowElements={handleShowElements}
          handleToEditMode={handleToEditMode}
          isEditMode={isEditMode}
          name={name}
          ref={{ chipsCellRef, chipsWrapperRef }}
          setChipsSizes={setChipsSizes}
          setEditConfig={setEditConfig}
          shortChips={shortChips}
          showChips={showChips}
          showHiddenChips={showHiddenChips}
          validateFields={validateFields}
          validationRules={validationRules}
        />
      </div>
    </div>
  )
}

FormChipCell.defaultProps = {
  chipOptions: {
    background: 'purple',
    boldValue: false,
    borderRadius: 'primary',
    borderColor: 'transparent',
    density: 'dense',
    font: 'purple'
  },
  delimiter: null,
  isEditMode: false,
  label: null,
  onClick: () => {},
  shortChips: false,
  validationRules: {},
  validator: () => {},
  visibleChipsMaxLength: 'all'
}

FormChipCell.propTypes = {
  chipOptions: CHIP_OPTIONS,
  delimiter: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  formState: PropTypes.shape({}).isRequired,
  initialValues: PropTypes.object.isRequired,
  isEditMode: PropTypes.bool,
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  shortChips: PropTypes.bool,
  validationRules: PropTypes.object,
  validator: PropTypes.func,
  visibleChipsMaxLength: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
}

export default React.memo(FormChipCell)
