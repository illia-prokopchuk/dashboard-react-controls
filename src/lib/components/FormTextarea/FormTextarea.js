import React, { useEffect, useState } from 'react'
import classnames from 'classnames'
import PropTypes from 'prop-types'
import { Field, useField } from 'react-final-form'

import TextTooltipTemplate from '../TooltipTemplate/TextTooltipTemplate'
import Tip from '../Tip/Tip'
import Tooltip from '../Tooltip/Tooltip'

import { ReactComponent as InvalidIcon } from '../../images/invalid.svg'

import './formTextarea.scss'

const TextArea = React.forwardRef(
  (
    {
      className,
      disabled,
      focused,
      iconClass,
      invalidText,
      label,
      maxLength,
      name,
      onBlur,
      onChange,
      required,
      textAreaIcon,
      tip,
      withoutBorder,
      ...textareaProps
    },
    ref
  ) => {
    const { input, meta } = useField(name)
    const [isInvalid, setIsInvalid] = useState(false)
    const [textAreaCount, setTextAreaCount] = useState(input.value.length)
    const textAreaRef = React.createRef()

    const formFieldClassNames = classnames('form-field-textarea', className)
    const labelClassNames = classnames(
      'form-field__label',
      disabled && 'form-field__label-disabled'
    )
    const textAreaClassNames = classnames(
      'form-field__wrapper',
      disabled && 'form-field__wrapper-disabled',
      isInvalid && 'form-field__wrapper-invalid',
      withoutBorder && 'without-border'
    )

    useEffect(() => {
      if (focused) {
        textAreaRef.current.focus()
      }
    }, [focused, textAreaRef])

    useEffect(() => {
      setIsInvalid(
        meta.invalid && (meta.validating || meta.modified || (meta.submitFailed && meta.touched))
      )
    }, [meta.invalid, meta.modified, meta.submitFailed, meta.touched, meta.validating])

    const handleInputBlur = (event) => {
      input.onBlur(event)
      onBlur && onBlur(event)
    }

    const handleInputChange = (event) => {
      input.onChange(event)
      setTextAreaCount(event.target.value.length)
      onChange && onChange(event.target.value)
    }

    const handleInputFocus = (event) => {
      input.onFocus(event)
    }

    const validateField = (value) => {
      const valueToValidate = value ?? ''
      let validationError = null

      if (valueToValidate.startsWith(' ')) {
        validationError = { name: 'empty', label: invalidText }
      } else if (required && valueToValidate.trim().length === 0) {
        validationError = { name: 'required', label: 'This field is required' }
      }

      return validationError
    }

    return (
      <Field validate={validateField} name={name}>
        {({ input, meta }) => (
          <div ref={ref} className={formFieldClassNames}>
            <div className={labelClassNames}>
              {label && (
                <label data-testid="label" htmlFor={input.name}>
                  {label}
                  {required && <span className="form-field__label-mandatory"> *</span>}
                </label>
              )}
            </div>
            <div className={textAreaClassNames}>
              <div className="form-field__control">
                <textarea
                  data-testid="textarea"
                  id={input.name}
                  maxLength={maxLength}
                  ref={textAreaRef}
                  required={isInvalid || required}
                  {...{
                    disabled,
                    ...textareaProps,
                    ...input
                  }}
                  onBlur={handleInputBlur}
                  onChange={handleInputChange}
                  onFocus={handleInputFocus}
                />
              </div>
              <div className="form-field__icons">
                {isInvalid && (
                  <Tooltip
                    className="form-field__warning"
                    template={
                      <TextTooltipTemplate text={meta.error?.label ?? invalidText} warning />
                    }
                  >
                    <InvalidIcon />
                  </Tooltip>
                )}
                {tip && !required && <Tip text={tip} className="form-field__tip" />}
                {textAreaIcon && (
                  <span data-testid="textarea__icon" className={iconClass}>
                    {textAreaIcon}
                  </span>
                )}
              </div>
            </div>
            {maxLength && (
              <div className="form-field__counter">{`${maxLength - textAreaCount} ${
                maxLength - textAreaCount !== 1 ? 'characters' : 'character'
              } left`}</div>
            )}
          </div>
        )}
      </Field>
    )
  }
)

TextArea.defaultProps = {
  className: '',
  disabled: false,
  focused: false,
  iconClass: '',
  textAreaIcon: null,
  invalidText: 'This field is invalid',
  label: '',
  maxLength: null,
  onBlur: () => {},
  onChange: () => {},
  placeholder: '',
  required: false,
  rows: 3,
  tip: ''
}

TextArea.propTypes = {
  className: PropTypes.string,
  disabled: PropTypes.bool,
  focused: PropTypes.bool,
  iconClass: PropTypes.string,
  textAreaIcon: PropTypes.element,
  invalidText: PropTypes.string,
  label: PropTypes.string,
  maxLength: PropTypes.number,
  name: PropTypes.string.isRequired,
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  required: PropTypes.bool,
  tip: PropTypes.string
}

export default React.memo(TextArea)
