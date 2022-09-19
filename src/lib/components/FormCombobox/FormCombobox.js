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
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { Field, useField } from 'react-final-form'
import { isEmpty } from 'lodash'
import PropTypes from 'prop-types'
import classnames from 'classnames'

import { OptionsMenu, ValidationTemplate } from '../../elements'

import { checkPatternsValidity } from '../../utils/validation.util'
import { useDetectOutsideClick } from '../../hooks'
import { COMBOBOX_SELECT_OPTIONS, COMBOBOX_SUGGESTION_LIST } from '../../types'

import { ReactComponent as Arrow } from '../../images/arrow.svg'
import { ReactComponent as SearchIcon } from '../../images/search.svg'
import { ReactComponent as WarningIcon } from '../../images/warning.svg'

import './formCombobox.scss'

const FormCombobox = ({
  comboboxClassName,
  density,
  disabled,
  hideSearchInput,
  inputDefaultValue,
  inputPlaceholder,
  invalidText,
  maxSuggestedMatches,
  name,
  onBlur,
  onChange,
  onFocus,
  required,
  rules,
  selectDefaultValue,
  selectOptions,
  selectPlaceholder,
  suggestionList,
  validator,
  withoutBorder
}) => {
  const { input, meta } = useField(name)
  const [inputValue, setInputValue] = useState('')
  const [selectValue, setSelectValue] = useState({
    label: '',
    id: '',
    className: ''
  })
  const [dropdownStyle, setDropdownStyle] = useState({
    left: '0',
    paddingTop: '10px'
  })
  const [showSelectDropdown, setShowSelectDropdown] = useState(false)
  const [showSuggestionList, setShowSuggestionList] = useState(false)
  const [dropdownList, setDropdownList] = useState(suggestionList)
  const [searchIsFocused, setSearchIsFocused] = useState(false)
  const [isInvalid, setIsInvalid] = useState(false)
  const [validationRules, setValidationRules] = useState(rules)
  const [showValidationRules, setShowValidationRules] = useState(false)
  const comboboxRef = useRef()
  const selectRef = useRef()
  const inputRef = useRef()
  useDetectOutsideClick(comboboxRef, () => setShowValidationRules(false))

  useEffect(() => {
    if (selectDefaultValue?.label.length > 0 && selectValue.label.length === 0) {
      setSelectValue(selectDefaultValue)
      input.onChange(selectDefaultValue.id)
      onChange && onChange(selectDefaultValue)
    }
  }, [input, onChange, selectDefaultValue, selectValue.label.length])

  useEffect(() => {
    if (inputDefaultValue.length > 0 && selectValue.id.length > 0 && inputValue.length === 0) {
      setInputValue(inputDefaultValue)
      onChange && onChange(selectValue.id, inputDefaultValue)
      input.onChange(`${selectValue.id}${inputDefaultValue}`)
    }
  }, [input, inputDefaultValue, inputValue.length, onChange, selectValue])

  useEffect(() => {
    setValidationRules((prevState) =>
      prevState.map((rule) => ({
        ...rule,
        isValid:
          !meta.error || !Array.isArray(meta.error)
            ? true
            : !meta.error.some((err) => err.name === rule.name)
      }))
    )
  }, [meta.error])

  useEffect(() => {
    if (!searchIsFocused) {
      if (JSON.stringify(dropdownList) !== JSON.stringify(suggestionList)) {
        setDropdownList(suggestionList)
      }
    }
  }, [dropdownList, suggestionList, searchIsFocused])

  useEffect(() => {
    setIsInvalid(
      meta.invalid && (meta.validating || meta.modified || (meta.submitFailed && meta.touched))
    )
  }, [meta.invalid, meta.modified, meta.submitFailed, meta.touched, meta.validating])

  const handleOutsideClick = useCallback(
    (event) => {
      if (comboboxRef.current && !comboboxRef.current.contains(event.target)) {
        setSearchIsFocused(false)
        setShowSelectDropdown(false)
        setShowSuggestionList(false)
        input.onBlur(new Event('blur'))
        onBlur && onBlur(input.value)
      }
    },
    [input, onBlur]
  )

  useEffect(() => {
    window.addEventListener('click', handleOutsideClick)

    return () => {
      window.removeEventListener('click', handleOutsideClick)
    }
  }, [handleOutsideClick])

  const getValidationRules = () => {
    return validationRules.map(({ isValid = false, label, name }) => {
      return <ValidationTemplate valid={isValid} validationMessage={label} key={name} />
    })
  }

  const handleInputChange = (event) => {
    const target = event.target

    setDropdownStyle({
      left: `${target.selectionStart < 30 ? target.selectionStart : 30}ch`,
      paddingTop: '10px'
    })

    if (searchIsFocused) {
      setSearchIsFocused(false)
    }

    setInputValue(target.value)
    input.onChange(`${selectValue.id}${target.value}`)
    onChange && onChange(selectValue.id, target.value)

    if (dropdownList.length > 0) {
      setShowSuggestionList(true)
    }
  }

  const handleSelectOptionClick = (selectedOption, option) => {
    if (selectedOption.id !== selectValue.id) {
      setSelectValue(selectedOption)
      input.onChange(selectedOption.id)
      setInputValue('')
      onChange && onChange(selectedOption.id)
      setShowSelectDropdown(false)
      inputRef.current.disabled = false
      inputRef.current.focus()
    }
  }

  const handleSuggestionListOptionClick = (option) => {
    const inputValueItems = inputValue.split('/')
    const valueIndex = inputValueItems.length - 1
    let formattedValue = option.customDelimiter
      ? inputValueItems[valueIndex].replace(new RegExp(`${option.customDelimiter}.*`), '') +
        option.id
      : option.id

    if (inputValueItems.length <= maxSuggestedMatches - 1) formattedValue += '/'

    inputValueItems[valueIndex] = formattedValue

    if (searchIsFocused) {
      setSearchIsFocused(false)
    }

    if (inputValueItems.join('/') !== inputValue) {
      setInputValue(inputValueItems.join('/'))
      input.onChange(`${selectValue.id}${inputValueItems.join('/')}`)
      onChange && onChange(selectValue.id, inputValueItems.join('/'))
    }

    setShowSuggestionList(false)
    inputRef.current.focus()
    setDropdownStyle({
      left: `${inputRef.current.selectionStart < 30 ? inputRef.current.selectionStart : 30}ch`,
      paddingTop: '10px'
    })
  }

  const inputOnFocus = () => {
    onFocus && onFocus()
    input.onFocus(new Event('focus'))

    if (showSelectDropdown) {
      setShowSelectDropdown(false)
    }

    setShowSuggestionList(true)
  }

  const suggestionListSearchChange = (event) => {
    event.persist()
    setDropdownList(() =>
      suggestionList.filter((option) => {
        return option.id.startsWith(event.target.value)
      })
    )
  }

  const toggleSelect = useCallback(() => {
    if (showSelectDropdown) {
      setShowSelectDropdown(false)
      input.onBlur(new Event('blur'))
      onBlur && onBlur(input.value)
    } else {
      setShowSuggestionList(false)
      setShowValidationRules(false)
      setDropdownStyle({
        left: '0',
        paddingTop: '10px'
      })
      setShowSelectDropdown(true)
      input.onFocus(new Event('focus'))
      onFocus && onFocus(input.value)
    }
  }, [input, onBlur, onFocus, showSelectDropdown])

  const validateField = (value) => {
    const valueToValidate = value ?? ''
    let validationError = null

    if (!isEmpty(validationRules)) {
      const [newRules, isValidField] = checkPatternsValidity(rules, valueToValidate)
      const invalidRules = newRules.filter((rule) => !rule.isValid)

      if (!isValidField) {
        validationError = invalidRules.map((rule) => ({ name: rule.name, label: rule.label }))
      }
    }

    if (isEmpty(validationError)) {
      if (valueToValidate.startsWith(' ')) {
        validationError = { name: 'empty', label: invalidText }
      } else if (required && valueToValidate.trim().length === 0) {
        validationError = { name: 'required', label: 'This field is required' }
      }
    }

    if (!validationError && validator) {
      validationError = validator(value)
    }

    return validationError
  }

  const warningIconClick = () => {
    setShowValidationRules((state) => !state)
    setShowSelectDropdown(false)
  }

  const comboboxClassNames = classnames(
    comboboxClassName,
    'form-field-combobox',
    'form-field',
    isInvalid && 'form-field-combobox_invalid'
  )
  const iconClassNames = classnames(
    showSelectDropdown && 'form-field-combobox__icon_open',
    'form-field-combobox__icon'
  )
  const selectClassNames = classnames(
    'form-field-combobox__select',
    'form-field__control',
    showSelectDropdown && 'form-field-combobox__select_open',
    selectValue.id.length <= 5 && selectValue.id.length !== 0 && 'form-field-combobox__select_short'
  )
  const selectValueClassNames = classnames(selectValue.className)
  const dropdownClassNames = classnames(
    'form-field-combobox__dropdown',
    'form-field-combobox__input-dropdown',
    showSuggestionList && dropdownList.length > 0 && 'form-field-combobox__input-dropdown_visible'
  )

  const wrapperClassNames = classnames(
    'form-field__wrapper',
    `form-field__wrapper-${density}`,
    disabled && 'form-field__wrapper-disabled',
    isInvalid && 'form-field__wrapper-invalid',
    withoutBorder && 'without-border'
  )

  return (
    <Field name={name} validate={validateField}>
      {({ input, meta }) => (
        <div className={comboboxClassNames} ref={comboboxRef}>
          <div className={wrapperClassNames}>
            <div className="form-field__icons">
              <Arrow className={iconClassNames} onClick={toggleSelect} />
            </div>
            <div className={selectClassNames} ref={selectRef}>
              <div className="form-field-combobox__select-header" onClick={toggleSelect}>
                <span className={selectValueClassNames}>{selectValue.id}</span>
                {selectValue.id.length === 0 && selectPlaceholder && (
                  <div className="form-field__label">
                    <label>
                      {selectPlaceholder}
                      {(meta.error || required) && (
                        <span className="form-field__label-mandatory"> *</span>
                      )}
                    </label>
                  </div>
                )}
              </div>
              <div className="form-field-combobox__select-body form-field-combobox__dropdown">
                <ul className="form-field-combobox__list">
                  {selectOptions.map((option) => {
                    const selectOptionClassNames = classnames(
                      'form-field-combobox__list-option',
                      option.className
                    )

                    return (
                      <li
                        className={selectOptionClassNames}
                        key={option.id}
                        onClick={() => handleSelectOptionClick(option)}
                      >
                        {option.label}
                      </li>
                    )
                  })}
                </ul>
              </div>
            </div>
            <input
              className="form-field-combobox__input form-field__control"
              disabled={selectValue.id.length === 0}
              onChange={handleInputChange}
              onFocus={inputOnFocus}
              placeholder={inputPlaceholder}
              ref={inputRef}
              type="text"
              value={inputValue}
            />
            <div
              className={dropdownClassNames}
              style={{
                ...dropdownStyle
              }}
            >
              {!hideSearchInput && (
                <div className="form-field-combobox__search-wrapper">
                  <input
                    className="form-field-combobox__search form-field__control"
                    onChange={suggestionListSearchChange}
                    onFocus={() => setSearchIsFocused(true)}
                    placeholder="Type to search"
                    type="text"
                  />
                  <SearchIcon />
                </div>
              )}
              <ul className="form-field-combobox__list">
                {searchIsFocused && dropdownList.length === 0 ? (
                  <li className="form-field-combobox__list-option" key="no data">
                    No data
                  </li>
                ) : (
                  dropdownList.map((value) => (
                    <li
                      className="form-field-combobox__list-option"
                      key={value.id}
                      onClick={() => handleSuggestionListOptionClick(value)}
                    >
                      {value.label}
                    </li>
                  ))
                )}
              </ul>
            </div>
            <div className="form-field__icons">
              {isInvalid && Array.isArray(meta.error) && (
                <button className="form-field__warning" onClick={warningIconClick}>
                  <WarningIcon />
                </button>
              )}
            </div>
            {!isEmpty(validationRules) && (
              <OptionsMenu show={showValidationRules} ref={comboboxRef}>
                {getValidationRules()}
              </OptionsMenu>
            )}
          </div>
        </div>
      )}
    </Field>
  )
}

FormCombobox.defaultProps = {
  comboboxClassName: '',
  density: 'normal',
  disabled: false,
  hideSearchInput: false,
  inputDefaultValue: '',
  inputPlaceholder: '',
  maxSuggestedMatches: 1,
  onBlur: null,
  onFocus: null,
  onChange: null,
  required: false,
  rules: [],
  selectDefaultValue: null,
  selectPlaceholder: '',
  suggestionList: [],
  validator: null,
  withoutBorder: false
}

FormCombobox.propTypes = {
  comboboxClassName: PropTypes.string,
  density: PropTypes.oneOf(['dense', 'normal', 'medium', 'chunky']),
  disabled: PropTypes.bool,
  hideSearchInput: PropTypes.bool,
  inputDefaultValue: PropTypes.string,
  inputPlaceholder: PropTypes.string,
  invalidText: PropTypes.string,
  maxSuggestedMatches: PropTypes.number,
  name: PropTypes.string.isRequired,
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  onFocus: PropTypes.func,
  required: PropTypes.bool,
  rules: PropTypes.array,
  selectDefaultValue: PropTypes.string,
  selectOptions: COMBOBOX_SELECT_OPTIONS.isRequired,
  selectPlaceholder: PropTypes.string,
  suggestionList: COMBOBOX_SUGGESTION_LIST,
  validator: PropTypes.func,
  withoutBorder: PropTypes.bool
}

export default FormCombobox
