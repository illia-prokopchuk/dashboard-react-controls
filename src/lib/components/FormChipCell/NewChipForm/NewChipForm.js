import React, { useState, useCallback, useEffect, useLayoutEffect, useMemo } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { isEmpty } from 'lodash'

import NewChipInput from '../NewChipInput/NewChipInput'
import OptionsMenu from '../../../elements/OptionsMenu/OptionsMenu'
import ValidationTemplate from '../../../elements/ValidationTemplate/ValidationTemplate'

import { checkPatternsValidity } from '../../../utils/validation.util'

import { CHIP_OPTIONS } from '../../../types'
import { BACKSPACE, CLICK, DELETE, TAB, TAB_SHIFT } from '../../../constants'

import './newChipForm.scss'

const NewChipForm = React.forwardRef(
  (
    {
      chip,
      chipOptions,
      className,
      editConfig,
      keyName,
      meta,
      onChange,
      setEditConfig,
      valueName,
      validationRules: rules
    },
    ref
  ) => {
    const [chipData, setChipData] = useState({
      key: chip.key,
      value: chip.value,
      keyFieldWidth: 0,
      valueFieldWidth: 0
    })
    const [selectedType, setSelectedType] = useState('key')
    const [validationRules, setValidationRules] = useState(rules)
    const [showValidationRules, setShowValidationRules] = useState(false)

    const maxWidthInput = useMemo(() => {
      return ref.current?.clientWidth - 50
    }, [ref])
    const { background, borderColor, borderRadius, density, font } = chipOptions
    const minWidthInput = 25
    const minWidthValueInput = 35

    const refInputKey = React.createRef()
    const refInputValue = React.createRef()
    const refInputContainer = React.createRef()

    const labelKeyClassName = classnames(
      className,
      !editConfig.isKeyFocused && 'item_edited',
      meta.error &&
        Array.isArray(meta.error) &&
        meta.error[editConfig.chipIndex]['key'] &&
        'edit-chip-container-font_invalid'
    )

    const labelContainerClassName = classnames(
      'edit-chip-container',
      background && `edit-chip-container-background_${background}`,
      borderColor && `edit-chip-container-border_${borderColor}`,
      font && `edit-chip-container-font_${font}`,
      density && `edit-chip-container-density_${density}`,
      borderRadius && `edit-chip-container-border_${borderRadius}`,
      (editConfig.isEdit || editConfig.isNewChip) && 'edit-chip-container_edited',
      meta.error &&
        !Array.isArray(meta.error) &&
        meta.error.indices?.includes(editConfig.chipIndex) &&
        'chip_duplicated'
    )
    const labelValueClassName = classnames(
      classnames(
        'input-label-value',
        !editConfig.isValueFocused && 'item_edited',
        meta.error &&
          Array.isArray(meta.error) &&
          meta.error[editConfig.chipIndex]['value'] &&
          'edit-chip-container-font_invalid'
      )
    )

    useLayoutEffect(() => {
      if (!chipData.keyFieldWidth && !chipData.valueFieldWidth) {
        const currentWidthKeyInput = refInputKey.current.scrollWidth + 1
        const currentWidthValueInput = refInputValue.current.scrollWidth + 1

        if (chipData.key && chipData.value) {
          setChipData((prevState) => ({
            ...prevState,
            keyFieldWidth:
              currentWidthKeyInput >= maxWidthInput ? maxWidthInput : currentWidthKeyInput,
            valueFieldWidth:
              currentWidthValueInput >= maxWidthInput ? maxWidthInput : currentWidthValueInput
          }))
        } else {
          setChipData((prevState) => ({
            ...prevState,
            keyFieldWidth: minWidthInput,
            valueFieldWidth: minWidthValueInput
          }))
        }
      }
    }, [
      chipData.key,
      chipData.value,
      chipData.keyFieldWidth,
      chipData.valueFieldWidth,
      maxWidthInput,
      refInputKey,
      refInputValue
    ])

    const handleScroll = () => {
      setShowValidationRules(false)
    }

    useEffect(() => {
      if (showValidationRules) {
        window.addEventListener('scroll', handleScroll, true)
      }
      return () => {
        window.removeEventListener('scroll', handleScroll, true)
      }
    }, [showValidationRules])

    useEffect(() => {
      if (editConfig.isKeyFocused) {
        refInputKey.current.focus()
      } else if (editConfig.isValueFocused) {
        refInputValue.current.focus()
      }
    }, [editConfig.isKeyFocused, editConfig.isValueFocused, refInputKey, refInputValue])

    const outsideClick = useCallback(
      (event) => {
        event.stopPropagation()
        const elementPath = event.path ?? event.composedPath?.()

        if (!elementPath.includes(refInputContainer.current)) {
          onChange(event, CLICK)
        }
      },
      [onChange, refInputContainer]
    )

    useEffect(() => {
      if (editConfig.isEdit) {
        document.addEventListener('click', outsideClick, true)

        return () => {
          document.removeEventListener('click', outsideClick, true)
        }
      }
    }, [outsideClick, editConfig.isEdit])

    const focusChip = useCallback(
      (event) => {
        event.stopPropagation()

        if (!event.shiftKey && event.key === TAB && editConfig.isValueFocused) {
          onChange(event, TAB)
        } else if (event.shiftKey && event.key === TAB && editConfig.isKeyFocused) {
          onChange(event, TAB_SHIFT)
        }

        if (event.key === BACKSPACE || event.key === DELETE) {
          setChipData((prevState) => ({
            keyFieldWidth: editConfig.isKeyFocused ? minWidthInput : prevState.keyFieldWidth,
            valueFieldWidth: editConfig.isValueFocused
              ? minWidthValueInput
              : prevState.valueFieldWidth
          }))
        }
      },
      [editConfig, onChange]
    )

    const handleOnFocus = useCallback(
      (event) => {
        if (event.target.name === keyName) {
          refInputKey.current.selectionStart = refInputKey.current.selectionEnd

          setEditConfig((prevConfig) => ({
            ...prevConfig,
            isKeyFocused: true,
            isValueFocused: false
          }))
        } else {
          refInputValue.current.selectionStart = refInputValue.current.selectionEnd

          setEditConfig((prevConfig) => ({
            ...prevConfig,
            isKeyFocused: false,
            isValueFocused: true
          }))
        }
      },
      [keyName, refInputKey, refInputValue, setEditConfig]
    )

    const handleOnChange = useCallback(
      (event) => {
        event.preventDefault()
        if (event.target.name === keyName) {
          const currentWidthKeyInput = refInputKey.current.scrollWidth

          setChipData((prevState) => ({
            ...prevState,
            key: refInputKey.current.value,
            keyFieldWidth:
              refInputKey.current.value.length <= 1
                ? minWidthInput
                : currentWidthKeyInput >= maxWidthInput
                ? maxWidthInput
                : currentWidthKeyInput > minWidthInput
                ? currentWidthKeyInput + 2
                : minWidthInput
          }))
        } else {
          const currentWidthValueInput = refInputValue.current.scrollWidth

          setChipData((prevState) => ({
            ...prevState,
            value: refInputValue.current.value,
            valueFieldWidth:
              refInputValue.current.value.length <= 1
                ? minWidthValueInput
                : currentWidthValueInput >= maxWidthInput
                ? maxWidthInput
                : currentWidthValueInput > minWidthValueInput
                ? currentWidthValueInput + 2
                : minWidthValueInput
          }))
        }
      },
      [maxWidthInput, refInputKey, refInputValue, keyName]
    )

    const getValidationRules = useCallback(() => {
      return validationRules[selectedType].map(({ isValid = false, label, name }) => {
        return <ValidationTemplate valid={isValid} validationMessage={label} key={name} />
      })
    }, [meta.error, selectedType, validationRules])

    useEffect(() => {
      setSelectedType(editConfig.isKeyFocused ? 'key' : editConfig.isValueFocused ? 'value' : null)
    }, [editConfig.isKeyFocused, editConfig.isValueFocused])

    useEffect(() => {
      if (meta.valid && showValidationRules) {
        setShowValidationRules(false)
      }
    }, [meta.valid, showValidationRules])

    useEffect(() => {
      if (meta.error && Array.isArray(meta.error)) {
        setValidationRules((prevState) => {
          return {
            ...prevState,
            [selectedType]: prevState[selectedType].map((rule) => {
              return {
                ...rule,
                isValid: !meta.error[editConfig.chipIndex][selectedType]
                  ? true
                  : !meta.error[editConfig.chipIndex][selectedType].some(
                      (err) => err && err.name === rule.name
                    )
              }
            })
          }
        })

        !showValidationRules && setShowValidationRules(true)
      }
    }, [meta.error, selectedType])

    const validateFieldByRules = (value) => {
      if (!value) return

      if (!isEmpty(validationRules)) {
        const [newRules, isValidField] = checkPatternsValidity(validationRules[selectedType], value)
        const invalidRules = newRules.filter((rule) => !rule.isValid)

        if (!isValidField) {
          return invalidRules.map((rule) => ({ name: rule.name, label: rule.label }))
        }
      }

      return null
    }

    return (
      <div
        className={labelContainerClassName}
        onKeyDown={(event) => editConfig.isEdit && focusChip(event)}
        ref={refInputContainer}
      >
        <NewChipInput
          className={labelKeyClassName}
          name={keyName}
          onChange={handleOnChange}
          onFocus={handleOnFocus}
          placeholder="key"
          ref={refInputKey}
          style={{ width: chipData.keyFieldWidth }}
          validate={validateFieldByRules}
        />
        <div className="edit-chip-separator">:</div>
        <NewChipInput
          className={labelValueClassName}
          name={valueName}
          onChange={handleOnChange}
          onFocus={handleOnFocus}
          placeholder="value"
          ref={refInputValue}
          style={{ width: chipData.valueFieldWidth }}
          validate={validateFieldByRules}
        />

        {Array.isArray(meta.error) && meta.error[editConfig.chipIndex][selectedType] && (
          <OptionsMenu show={showValidationRules} ref={ref}>
            {getValidationRules()}
          </OptionsMenu>
        )}
      </div>
    )
  }
)

NewChipForm.defaultProps = {
  className: ''
}

NewChipForm.propTypes = {
  chip: PropTypes.object.isRequired,
  chipOptions: CHIP_OPTIONS.isRequired,
  className: PropTypes.string,
  editConfig: PropTypes.shape({}).isRequired,
  keyName: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  setEditConfig: PropTypes.func.isRequired,
  valueName: PropTypes.string.isRequired
}

export default NewChipForm
