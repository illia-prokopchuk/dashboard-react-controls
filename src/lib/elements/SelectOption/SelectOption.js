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
import classnames from 'classnames'

import { FormCheckBox, Tooltip, TextTooltipTemplate } from '../../components'

import { SELECT_OPTION } from '../../types'

import { ReactComponent as Checkmark } from '../../images/checkmark.svg'

import './selectOption.scss'

const SelectOption = ({ item, name, onClick, multiple, selectedId, withSelectedIcon }) => {
  const selectClassName = classnames(
    'select__item',
    multiple && 'multiple',
    item.hidden && 'hidden',
    item.disabled && 'disabled'
  )
  if (multiple) {
    return (
      <div data-testid="select-checkbox" className={selectClassName}>
        <FormCheckBox name={name} value={item.id} label={item.label}>
          {item.status && <span className={`state-${item.status}-job status`} />}
        </FormCheckBox>
      </div>
    )
  }

  return (
    <li
      data-testid="select-option"
      className={selectClassName}
      onClick={() => {
        !item.disabled && onClick(item.id)
      }}
      data-custom-id={item.id}
    >
      <div className="label-row">
        <div className="data-ellipsis select__item-label">
          <div className="select__item-main-label">
            {item.icon && (
              <span data-testid="select-icon" className="select__item-icon">
                {item.icon}
              </span>
            )}
            {item.status && <span className={`state-${item.status}-job status`} />}
            {item.htmlChildren ? (
              <Tooltip
                htmlChildren={item.htmlChildren}
                template={<TextTooltipTemplate text={item.label} />}
              />
            ) : (
              <Tooltip template={<TextTooltipTemplate text={item.label} />}>{item.label}</Tooltip>
            )}
          </div>
          {item.subLabel && (
            <Tooltip
              className="select__item-sub-label"
              template={<TextTooltipTemplate text={item.subLabel} />}
            >
              <span>{item.subLabel}</span>
            </Tooltip>
          )}
        </div>
        {withSelectedIcon && item.id === selectedId && <Checkmark className="checkmark" />}
      </div>
    </li>
  )
}

SelectOption.defaultProps = {
  onClick: () => {},
  multiple: false,
  withSelectedIcon: true
}

SelectOption.propTypes = {
  name: PropTypes.string.isRequired,
  item: SELECT_OPTION.isRequired,
  onClick: PropTypes.func,
  multiple: PropTypes.bool,
  selectedId: PropTypes.string,
  withSelectedIcon: PropTypes.bool
}

export default SelectOption
