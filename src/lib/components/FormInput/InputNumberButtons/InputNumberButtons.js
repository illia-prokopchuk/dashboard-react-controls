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
