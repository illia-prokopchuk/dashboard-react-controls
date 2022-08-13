import React from 'react'
import PropTypes from 'prop-types'
import { isNil } from 'lodash'

import { ReactComponent as Arrow } from '../../../images/range-arrow-small.svg'

import './InputNumberButtons.scss'

const InputNumberButtons = ({ disabled, min, max, onChange, step, value }) => {
  const handleIncrease = (event) => {
    event.preventDefault()
    if (max && +value >= +max) return

    const currentValue = isCurrentValueEmpty() ? +step : +value + +step
    const nextValue = isInteger(currentValue) ? currentValue : currentValue.toFixed(3)

    onChange(nextValue)
  }

  const handleDecrease = (event) => {
    event.preventDefault()

    if (value <= 0 || +value <= +min) return

    const currentValue = isCurrentValueEmpty() ? -step : +value - +step
    const nextValue = isInteger(currentValue) ? currentValue : currentValue.toFixed(3)

    onChange(nextValue)
  }

  const isCurrentValueEmpty = () => {
    return isNil(value) || value === ''
  }

  const isInteger = (number) => {
    return Number(number) === number && number % 1 === 0
  }

  return (
    <div data-testid="range-input-container" className="form-field-range">
      <div className="range__buttons">
        <button
          data-testid="btn-increase"
          className="range__button range__button-increase"
          disabled={disabled}
          onClick={handleIncrease}
        >
          <Arrow className="increase" />
        </button>
        <button
          data-testid="btn-decrease"
          className="range__button range__button-decrease"
          disabled={disabled}
          onClick={handleDecrease}
        >
          <Arrow className="decrease" />
        </button>
      </div>
    </div>
  )
}

InputNumberButtons.defaultProps = {
  disabled: false,
  min: null,
  max: null,
  step: '1'
}

InputNumberButtons.propTypes = {
  disabled: PropTypes.bool,
  min: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  max: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChange: PropTypes.func.isRequired,
  step: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired
}

export default React.memo(InputNumberButtons)
