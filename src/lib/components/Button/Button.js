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
import React, { forwardRef } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import Tooltip from '../Tooltip/Tooltip'
import TextTooltipTemplate from '../TooltipTemplate/TextTooltipTemplate'

import { BUTTON_VARIANTS } from '../../types'
import { TERTIARY_BUTTON } from '../../constants'

import './Button.scss'

const Button = forwardRef(
  ({ className, density, icon, label, tooltip, variant, ...restProps }, ref) => {
    const buttonClassName = classNames('btn', `btn-${variant}`, `btn-${density}`, className)

    return (
      <Tooltip template={<TextTooltipTemplate text={tooltip} />} hidden={!tooltip}>
        <button {...restProps} className={buttonClassName} ref={ref}>
          {icon}
          {label && <span>{label}</span>}
        </button>
      </Tooltip>
    )
  }
)

Button.defaultProps = {
  className: '',
  density: 'normal',
  label: 'Button',
  tooltip: '',
  variant: TERTIARY_BUTTON
}

Button.propTypes = {
  className: PropTypes.string,
  density: PropTypes.oneOf(['dense', 'normal', 'medium', 'chunky']),
  icon: PropTypes.element,
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  tooltip: PropTypes.string,
  variant: BUTTON_VARIANTS
}

export default Button
