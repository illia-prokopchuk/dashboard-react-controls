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
import React, { useState, useCallback, useEffect, useLayoutEffect, useMemo } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { isEmpty, get } from 'lodash'

import NewChipInput from '../NewChipInput/NewChipInput'
import OptionsMenu from '../../../elements/OptionsMenu/OptionsMenu'
import ValidationTemplate from '../../../elements/ValidationTemplate/ValidationTemplate'

import { CHIP_OPTIONS } from '../../../types'
import { BACKSPACE, CLICK, DELETE, TAB, TAB_SHIFT } from '../../../constants'

import { ReactComponent as Close } from '../../../images/close.svg'

import './newChipForm.scss'

const NewChipForm = React.forwardRef(
  (
    {
      chip,
      chipIndex,
      chipOptions,
      className,
      editConfig,
      handleRemoveChip,
      isEditMode,
      keyName,
      meta,
      onChange,
      setEditConfig,
      validationRules: rules,
      valueName
    },
    ref
  ) => {
    const [chipData, setChipData] = useState({
      key: chip.key,
      value: chip.value,
      keyFieldWidth: 0,
      valueFieldWidth: 0
    })
    const [selectedInput, setSelectedInput] = useState('key')
    const [validationRules, setValidationRules] = useState(rules)
    const [showValidationRules, setShowValidationRules] = useState(false)

    const maxWidthInput = useMemo(() => {
      return ref.current?.clientWidth - 50
    }, [ref])
    const { background, borderColor, borderRadius, density, font } = chipOptions
    const minWidthInput = 25
    const minWidthValueInput = 35

    const refInputKey = React.useRef()
    const refInputValue = React.useRef()
    const refInputContainer = React.useRef()

    const labelKeyClassName = classnames(
      className,
      !editConfig.isKeyFocused && 'item_edited',
      !isEmpty(get(meta, ['error', chipIndex, 'key'], [])) && !isEmpty(chipData.key) && 'item_edited_invalid'
    )
    const labelContainerClassName = classnames(
      'edit-chip-container',
      background && `edit-chip-container-background_${background}`,
      borderColor && `edit-chip-container-border_${borderColor}`,
      font && `edit-chip-container-font_${font}`,
      density && `edit-chip-container-density_${density}`,
      borderRadius && `edit-chip-container-border_${borderRadius}`,
      (editConfig.isEdit || editConfig.isNewChip) && 'edit-chip-container_edited'
    )
    const labelValueClassName = classnames(
      'input-label-value',
      !editConfig.isValueFocused && 'item_edited',
      !isEmpty(get(meta, ['error', chipIndex, 'value'], [])) && !isEmpty(chipData.value) && 'item_edited_invalid'
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
      if (editConfig.chipIndex === chipIndex) {
        if (editConfig.isKeyFocused) {
          refInputKey.current.focus()
        } else if (editConfig.isValueFocused) {
          refInputValue.current.focus()
        }
      }
    }, [
      editConfig.isKeyFocused,
      editConfig.isValueFocused,
      refInputKey,
      refInputValue,
      chipIndex,
      editConfig.chipIndex
    ])

    const outsideClick = useCallback(
      (event) => {
        if (editConfig.chipIndex === chipIndex) {
          const elementPath = event.path ?? event.composedPath?.()

          if (!elementPath.includes(refInputContainer.current)) {
            onChange(event, CLICK)
            window.getSelection().removeAllRanges()
          } else {
            event.stopPropagation()
          }
        }
      },
      [onChange, refInputContainer, chipIndex, editConfig.chipIndex]
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

        if (editConfig.chipIndex === chipIndex && isEditMode) {
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
        }
      },
      [editConfig, onChange, chipIndex, isEditMode]
    )

    const handleOnFocus = useCallback(
      (event) => {
        if (editConfig.chipIndex === chipIndex) {
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

          event && event.stopPropagation()
        }
      },
      [keyName, refInputKey, refInputValue, setEditConfig, editConfig.chipIndex, chipIndex]
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

    useEffect(() => {
      if (editConfig.chipIndex === chipIndex) {
        setSelectedInput(
          editConfig.isKeyFocused ? 'key' : editConfig.isValueFocused ? 'value' : null
        )
      }
    }, [editConfig.isKeyFocused, editConfig.isValueFocused, editConfig.chipIndex, chipIndex])

    useEffect(() => {
      if (meta.valid && showValidationRules) {
        setShowValidationRules(false)
      }
    }, [meta.valid, showValidationRules])

    useEffect(() => {
      if (meta.error) {
        setValidationRules((prevState) => {
          return {
            ...prevState,
            [selectedInput]: prevState[selectedInput].map((rule) => {
              return {
                ...rule,
                isValid: isEmpty(get(meta, ['error', editConfig.chipIndex, selectedInput], []))
                  ? true
                  : !meta.error[editConfig.chipIndex][selectedInput].some(
                      (err) => err && err.name === rule.name
                    )
              }
            })
          }
        })

        !showValidationRules && setShowValidationRules(true)
      }
    }, [meta, showValidationRules, selectedInput, editConfig.chipIndex])

    const getValidationRules = useCallback(() => {
      return validationRules[selectedInput].map(({ isValid = false, label, name }) => {
        return <ValidationTemplate valid={isValid} validationMessage={label} key={name} />
      })
    }, [selectedInput, validationRules])

    return (
      <div
        className={labelContainerClassName}
        onKeyDown={(event) => editConfig.isEdit && focusChip(event)}
        ref={refInputContainer}
      >
        <NewChipInput
          className={labelKeyClassName}
          disabled={!isEditMode || editConfig.chipIndex !== chipIndex}
          name={keyName}
          onChange={handleOnChange}
          onFocus={handleOnFocus}
          placeholder="key"
          ref={refInputKey}
          style={{ width: chipData.keyFieldWidth }}
        />
        <div className="edit-chip-separator">:</div>
        <NewChipInput
          className={labelValueClassName}
          disabled={!isEditMode || editConfig.chipIndex !== chipIndex}
          name={valueName}
          onChange={handleOnChange}
          onFocus={handleOnFocus}
          placeholder="value"
          ref={refInputValue}
          style={{ width: chipData.valueFieldWidth }}
        />

        {editConfig.chipIndex !== chipIndex && isEditMode && (
          <button
            className="edit-chip__icon-close"
            onClick={(event) => handleRemoveChip(event, chipIndex)}
          >
            <Close />
          </button>
        )}

        {(editConfig.isKeyFocused ? !isEmpty(chipData.key) : !isEmpty(chipData.value)) &&
          editConfig.chipIndex === chipIndex &&
          !isEmpty(get(meta, ['error', editConfig.chipIndex, selectedInput], [])) && (
            <OptionsMenu show={showValidationRules} ref={ref}>
              {getValidationRules()}
            </OptionsMenu>
          )}
      </div>
    )
  }
)

NewChipForm.defaultProps = {
  className: '',
  validationRules: {}
}

NewChipForm.propTypes = {
  chip: PropTypes.object.isRequired,
  chipIndex: PropTypes.number.isRequired,
  chipOptions: CHIP_OPTIONS.isRequired,
  className: PropTypes.string,
  editConfig: PropTypes.shape({}).isRequired,
  handleRemoveChip: PropTypes.func.isRequired,
  isEditMode: PropTypes.bool.isRequired,
  keyName: PropTypes.string.isRequired,
  meta: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  setEditConfig: PropTypes.func.isRequired,
  validationRules: PropTypes.object,
  valueName: PropTypes.string.isRequired
}

export default NewChipForm
