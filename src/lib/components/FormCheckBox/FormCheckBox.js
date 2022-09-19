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
import { Field } from 'react-final-form'
import classNames from 'classnames'

import './formCheckBox.scss'

const FormCheckBox = ({ children, className, name, label, ...inputProps }) => {
  const formFieldClassNames = classNames('form-field-checkbox', className)

  return (
    <Field name={name} value={inputProps.value} type="checkbox">
      {({ input }) => (
        <div className={formFieldClassNames}>
          <input
            {...{
              ...input,
              ...inputProps
            }}
            id={inputProps.value ?? name}
          />
          <label htmlFor={inputProps.value ?? name}>
            {label ? label : ''}
            {children}
          </label>
        </div>
      )}
    </Field>
  )
}

FormCheckBox.defaultProps = {
  className: '',
  label: ''
}

FormCheckBox.propTypes = {
  className: PropTypes.string,
  name: PropTypes.string.isRequired,
  label: PropTypes.string
}

export default React.memo(FormCheckBox)
