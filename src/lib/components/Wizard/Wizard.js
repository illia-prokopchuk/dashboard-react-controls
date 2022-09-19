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
import React, { useMemo, useState } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import Button from '../Button/Button'
import Modal from '../Modal/Modal'
import WizardSteps from './WizardSteps/WizardSteps'

import { MODAL_MD, SECONDARY_BUTTON } from '../../constants'
import { MODAL_SIZES, WIZARD_STEPS_CONFIG } from '../../types'

import './Wizard.scss'

const Wizard = ({
  children,
  className,
  formState,
  isWizardOpen,
  onWizardResolve,
  onWizardSubmit,
  location,
  size,
  title,
  stepsConfig,
  submitButtonLabel
}) => {
  const [activeStepNumber, setActiveStepNumber] = useState(0)

  const activeStepTemplate = useMemo(() => {
    return React.Children.toArray(children)[activeStepNumber]
  }, [children, activeStepNumber])

  const totalSteps = useMemo(() => {
    return React.Children.count(children) - 1 || 0
  }, [children])

  const isLastStep = useMemo(() => {
    return activeStepNumber === totalSteps
  }, [activeStepNumber, totalSteps])

  const stepsMenu = useMemo(() => {
    return (
      stepsConfig
        ?.filter((step) => !step.isHidden)
        .map((step) => ({ id: step.id, label: step.label })) || []
    )
  }, [stepsConfig])

  const wizardClasses = classNames('wizard-form', className)

  const goToNextStep = () => {
    setActiveStepNumber((prevStep) => Math.min(++prevStep, totalSteps))
  }

  const goToPreviousStep = () => setActiveStepNumber((prevStep) => Math.max(--prevStep, 0))

  const jumpToStep = (idx) => {
    return setActiveStepNumber(idx)
  }

  const handleSubmit = () => {
    formState.handleSubmit()
    if (formState.valid) {
      if (isLastStep) {
        onWizardSubmit(formState.values)
      } else {
        goToNextStep()
      }
    }
  }

  const getDefaultActions = () => [
    <Button
      onClick={goToPreviousStep}
      disabled={activeStepNumber === 0}
      label="Back"
      type="button"
    />,
    <Button
      onClick={handleSubmit}
      disabled={formState.submitting || (formState.invalid && formState.submitFailed)}
      label={isLastStep ? submitButtonLabel : 'Next'}
      type="button"
      variant={SECONDARY_BUTTON}
    />
  ]

  const renderModalActions = () => {
    if (stepsConfig[activeStepNumber]?.getActions) {
      return stepsConfig[activeStepNumber]
        .getActions({
          formState,
          goToNextStep,
          goToPreviousStep,
          onWizardResolve,
          handleSubmit
        })
        .map((action) => <Button {...action} />)
    } else {
      return getDefaultActions()
    }
  }

  return (
    <Modal
      actions={renderModalActions()}
      className={wizardClasses}
      onClose={onWizardResolve}
      location={location}
      show={isWizardOpen}
      size={size}
      title={title}
    >
      <WizardSteps activeStepNumber={activeStepNumber} jumpToStep={jumpToStep} steps={stepsMenu} />
      <div className="wizard-form__content">{activeStepTemplate}</div>
    </Modal>
  )
}

Wizard.defaultProps = {
  className: '',
  confirmClose: false,
  size: MODAL_MD,
  stepsConfig: [],
  submitButtonLabel: 'Submit'
}

Wizard.propsTypes = {
  className: PropTypes.string,
  confirmClose: PropTypes.bool,
  formState: PropTypes.object.isRequired,
  isWizardOpen: PropTypes.bool.isRequired,
  onWizardResolve: PropTypes.func.isRequired,
  onWizardSubmit: PropTypes.func.isRequired,
  location: PropTypes.string.isRequired,
  size: MODAL_SIZES,
  title: PropTypes.string.isRequired,
  stepsConfig: WIZARD_STEPS_CONFIG,
  submitButtonLabel: PropTypes.string
}

Wizard.Step = ({ children }) => children

export default Wizard
