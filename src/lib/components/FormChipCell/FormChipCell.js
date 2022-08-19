import React, { useState, useCallback, useRef, useEffect, useMemo } from 'react'
import PropTypes from 'prop-types'
import { get, isEmpty, isEqual, set } from 'lodash'

import FormChipCellView from './FormChipCellView'

import { isEveryObjectValueEmpty } from '../../utils/common.util'
import { generateChipsList } from '../../utils/generateChipsList.util'
import { checkPatternsValidity } from '../../utils/validation.util'

import { CHIP_OPTIONS, INPUT_VALIDATION_RULES } from '../../types'
import { CLICK, TAB, TAB_SHIFT } from '../../constants'

import './formChipCell.scss'

const FormChipCell = ({
  chipOptions,
  className,
  delimiter,
  formState,
  initialValues,
  isEditMode,
  name,
  label,
  onClick,
  shortChips,
  validator,
  visibleChipsMaxLength,
  validationRules
}) => {
  const [chipsSizes, setChipsSizes] = useState({})
  const [showHiddenChips, setShowHiddenChips] = useState(false)
  const [editConfig, setEditConfig] = useState({
    chipIndex: null,
    isEdit: false,
    isKeyFocused: true,
    isValueFocused: false,
    isNewChip: false
  })

  const [showChips, setShowChips] = useState(false)
  const [visibleChipsCount, setVisibleChipsCount] = useState(8)

  const chipsCellRef = useRef()
  const chipsWrapperRef = useRef()

  const getChipValues = get(formState.values, name)
  // const { input, meta } = useField(name) // Todo. Ask Andrii/Illia if I should use input.value instead of get(formState.values, name)

  const handleShowElements = useCallback(() => {
    if (!isEditMode || (isEditMode && visibleChipsMaxLength)) {
      setShowHiddenChips((state) => !state)
    }
  }, [isEditMode, visibleChipsMaxLength])

  let chips = useMemo(() => {
    return isEditMode || visibleChipsMaxLength === 'all'
      ? {
          visibleChips: getChipValues
        }
      : generateChipsList(
          getChipValues,
          visibleChipsMaxLength ? visibleChipsMaxLength : visibleChipsCount,
          delimiter
        )
  }, [visibleChipsMaxLength, isEditMode, formState.values, name, visibleChipsCount, delimiter])

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

  const checkChipsList = useCallback(() => {
    if (isEqual(get(initialValues, name), get(formState.values, name))) {
      set(formState.initialValues, name, get(formState.values, name))
    }

    formState.form.mutators.setFieldState(name, { modified: true })
    formState.form.mutators.setFieldState(name, { touched: true })
  }, [initialValues, name, formState])

  useEffect(() => {
    checkChipsList()
  }, [getChipValues])

  const handleAddNewChip = useCallback(
    (event, fields) => {
      if (!editConfig.isEdit && !editConfig.chipIndex) {
        formState.form.mutators.push(name, {
          key: '',
          value: '',
          delimiter: delimiter
        })
      }

      if (showHiddenChips) {
        setShowHiddenChips(false)
      }

      setEditConfig((prevConfig) => ({
        ...prevConfig,
        chipIndex: fields.value.length,
        isEdit: true,
        isKeyFocused: true,
        isValueFocused: false,
        isNewChip: true
      }))

      event && event.preventDefault()
    },
    [editConfig.isEdit, editConfig.chipIndex, showHiddenChips, formState, name, delimiter]
  )

  const handleRemoveChip = useCallback(
    (event, fields, chipIndex) => {
      fields.remove(chipIndex)

      event && event.stopPropagation()
    },
    [formState.values, name]
  )

  const handleEditChip = useCallback(
    (event, fields, nameEvent) => {
      const { key, value } = fields.value[editConfig.chipIndex]
      const isChipNotEmpty = !!(key && value)

      if (nameEvent === CLICK) {
        if (editConfig.isNewChip && !isChipNotEmpty) {
          //TODO: check with illia if need isNewChip or change to !isEdit
          handleRemoveChip(event, fields, editConfig.chipIndex)
        }

        setEditConfig((preState) => ({
          ...preState,
          chipIndex: null,
          isEdit: false,
          isKeyFocused: true,
          isValueFocused: false,
          isNewChip: false
        }))
      } else if (nameEvent === TAB) {
        if (editConfig.isNewChip && !isChipNotEmpty) {
          handleRemoveChip(event, fields, editConfig.chipIndex)
        }

        setEditConfig((prevState) => {
          const lastChipSelected = prevState.chipIndex + 1 > fields.value.length - 1

          return {
            ...prevState,
            chipIndex: lastChipSelected ? null : prevState.chipIndex + 1,
            isEdit: !lastChipSelected,
            isKeyFocused: true,
            isValueFocused: false,
            isNewChip: false
          }
        })
      } else if (nameEvent === TAB_SHIFT) {
        if (editConfig.isNewChip && !isChipNotEmpty) {
          handleRemoveChip(event, fields, editConfig.chipIndex)
        }

        setEditConfig((prevState) => {
          const isPrevChipIndexExists = prevState.chipIndex - 1 < 0

          return {
            ...prevState,
            chipIndex: isPrevChipIndexExists ? null : prevState.chipIndex - 1,
            isEdit: !isPrevChipIndexExists,
            isKeyFocused: isPrevChipIndexExists,
            isValueFocused: !isPrevChipIndexExists,
            isNewChip: false
          }
        })
      }

      checkChipsList()
      event && event.preventDefault()
    },
    [editConfig.chipIndex, editConfig.isNewChip, handleRemoveChip, name, formState, checkChipsList]
  )

  const handleIsEdit = useCallback(
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
    let validationError = null
    let dupes = {}

    fieldsArray.forEach((chip, index) => {
      if (!chip) return

      // Check if key is not duplicated
      dupes[chip.key] = dupes[chip.key] || []
      dupes[chip.key].push(index)

      let dupesArray = []
      for (let dup in dupes) {
        if (dupes[dup].length > 1) {
          dupesArray.push(...dupes[dup])
        }
      }

      if (dupesArray.length > 1) {
        validationError = {
          name: 'duplicated',
          label: 'Keys are duplicated',
          indices: dupesArray
        }
      }
    })

    // Check if key does not contain spaces
    if (isEmpty(validationRules)) {
      const getSpacedKeysIndices = fieldsArray.reduce((indices, chip, index) => {
        if (!chip) return

        if (chip.key.includes(' ')) {
          indices.push(index)
        }
        return indices
      }, [])

      validationError = {
        key: 'spacedKey',
        label: 'Key name contains spaces',
        indices: getSpacedKeysIndices
      }
    }

    // if (!isEmpty(validationRules)) {
    //   const invalidIndices = new Set()

    //   fieldsArray.forEach((chip, index) => {
    //     if (chip.key && chip.value) {
    //       const [, isValidKey] = checkPatternsValidity(validationRules['key'], chip.key)
    //       const [, isValidValue] = checkPatternsValidity(validationRules['value'], chip.value)

    //       if (!isValidKey || !isValidValue) {
    //         invalidIndices.add(index)
    //       }
    //     }
    //   })

    //   if (invalidIndices.size) {
    //     validationError = {
    //       name: 'invalidFields',
    //       label: 'Invalid Field',
    //       indices: [...invalidIndices]
    //     }
    //   }
    // }

    if (!validationError && validator) {
      validationError = validator(fieldsArray)
    }

    // const hasSpaces = fieldsArray.some(({ key }) => key && key.includes(' '))

    // fieldsArray.forEach((chip, index) => {
    //   if (!chip) return

    //   dupes[chip.key] = dupes[chip.key] || []
    //   dupes[chip.key].push(index)

    //   let dupesArray = []
    //   for (let dup in dupes) {
    //     if (dupes[dup].length > 1) {
    //       dupesArray.push(...dupes[dup])
    //     }
    //   }

    //   if (dupesArray.length > 1) {
    //     validationError = {
    //       name: 'duplicated',
    //       label: 'Keys are duplicated',
    //       indices: dupesArray
    //     }
    //   }

    //   if (isEmpty(validationRules)) {
    //     if (hasSpaces) {
    //       validationError = { key: 'invalid', label: 'Invalid key name', indices: [] }

    //       if (chip.key && chip.key.includes(' ')) {
    //         validationError.indices.push(index)
    //       }
    //     }
    //   }

    //   if (!validationError && validator) {
    //     validationError = validator(fieldsArray)
    //   }
    // })

    return validationError
  }

  return (
    <div className="chips">
      {label && <div className="chips__label">{label}</div>}
      <div className={label ? 'chips__wrapper' : ''}>
        <FormChipCellView
          chipOptions={chipOptions}
          chips={chips}
          className={className}
          editConfig={editConfig}
          handleAddNewChip={handleAddNewChip}
          handleEditChip={handleEditChip}
          handleIsEdit={handleIsEdit}
          handleRemoveChip={handleRemoveChip}
          handleShowElements={handleShowElements}
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
  label: null,
  onClick: () => {},
  shortChips: false,
  isEditMode: false,
  validationRules: {},
  validator: () => {},
  visibleChipsMaxLength: 'all'
}

FormChipCell.propTypes = {
  chipOptions: CHIP_OPTIONS,
  className: PropTypes.string,
  delimiter: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  onClick: PropTypes.func,
  shortChips: PropTypes.bool,
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  formState: PropTypes.shape({}).isRequired,
  initialValues: PropTypes.object.isRequired,
  isEditMode: PropTypes.bool,
  validationRules: PropTypes.shape({
    key: INPUT_VALIDATION_RULES,
    value: INPUT_VALIDATION_RULES
  }),
  validator: PropTypes.func,
  visibleChipsMaxLength: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
}

export default React.memo(FormChipCell)
