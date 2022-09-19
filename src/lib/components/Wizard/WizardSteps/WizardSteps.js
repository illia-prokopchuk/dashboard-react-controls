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
import classNames from 'classnames'

import Button from '../../Button/Button'

import { WIZARD_STEPS_CONFIG } from '../../../types'

import './WizardSteps.scss'

const WizardSteps = ({ activeStepNumber, jumpToStep, steps }) => {
  const getStepClassNames = (idx) =>
    classNames(
      'wizard-steps__item',
      idx === activeStepNumber && 'active',
      idx < activeStepNumber && 'valid'
    )

  const handleJumpToStep = (event, idx) => {
    event.preventDefault()
    jumpToStep(idx)
  }

  return (
    <div className="wizard-steps">
      {steps.map(({ id, label }, idx) => (
        <Button
          className={getStepClassNames(idx)}
          disabled={idx > activeStepNumber}
          icon={<span className="wizard-steps__indicator">{idx + 1}</span>}
          key={id}
          label={label}
          onClick={(e) => handleJumpToStep(e, idx)}
        />
      ))}
    </div>
  )
}

WizardSteps.propTypes = {
  activeStepNumber: PropTypes.number.isRequired,
  jumpToStep: PropTypes.func.isRequired,
  steps: WIZARD_STEPS_CONFIG
}

export default WizardSteps
