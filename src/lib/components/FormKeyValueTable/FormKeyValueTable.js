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
import React, { useState } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { FieldArray } from 'react-final-form-arrays'

import Tooltip from '../Tooltip/Tooltip'
import TextTooltipTemplate from '../TooltipTemplate/TextTooltipTemplate'
import RoundedIcon from '../RoundedIcon/RoundedIcon'
import FormInput from '../FormInput/FormInput'
import FormSelect from '../FormSelect/FormSelect'

import { ReactComponent as Close } from '../../images/close.svg'
import { ReactComponent as Edit } from '../../images/edit.svg'
import { ReactComponent as Plus } from '../../images/plus.svg'
import { ReactComponent as Delete } from '../../images/delete.svg'
import { ReactComponent as Checkmark } from '../../images/checkmark2.svg'

import './formKeyValueTable.scss'

const FormKeyValueTable = ({
  addNewItemLabel,
  className,
  disabled,
  formState,
  isKeyRequired,
  isValueRequired,
  keyHeader,
  keyLabel,
  keyOptions,
  name,
  valueHeader,
  valueLabel
}) => {
  const [isEditMode, setEditMode] = useState(false)
  const [selectedItem, setSelectedItem] = useState(null)
  const tableClassNames = classnames('form-key-value-table', className)
  const addBtnClassNames = classnames('add-new-item-btn', disabled && 'disabled')

  const exitEditMode = () => {
    setSelectedItem(null)
    setEditMode(false)
  }

  const enterEditMode = (event, fields, index) => {
    if (!disabled) {
      applyOrDiscardOrDelete(event, fields)
      exitEditMode()

      const editItem = fields.value[index]
      setSelectedItem({ ...editItem, index })
      setEditMode(true)
    }
  }

  const applyChanges = (event, fields, index) => {
    if (!formState?.errors?.[name]) {
      exitEditMode()
    } else {
      formState.form.mutators.setFieldState(`${name}[${index}].key`, { modified: true })
      formState.form.mutators.setFieldState(`${name}[${index}].value`, { modified: true })
    }
  }

  const discardChanges = (event, fields, index) => {
    exitEditMode()
    fields.update(index, { key: selectedItem.key, value: selectedItem.value })
    event && event.stopPropagation()
  }

  const addNewRow = (event, fields) => {
    if (!disabled) {
      applyOrDiscardOrDelete(event, fields)

      formState.form.mutators.push(name, { key: '', value: '' })
      setSelectedItem({
        key: '',
        value: '',
        isNew: true,
        index: formState.values[name]?.length ?? 0
      })
      setEditMode(true)
    }
  }

  const deleteRow = (event, fields, index) => {
    if (isEditMode && index !== selectedItem.index) {
      applyOrDiscardOrDelete(event, fields)
    }

    exitEditMode()
    fields.remove(index)
    event && event.stopPropagation()
  }

  const applyOrDiscardOrDelete = (event, fields) => {
    if (isEditMode) {
      if (!formState?.errors?.[name]) {
        applyChanges(event, fields, selectedItem.index)
      } else {
        discardOrDelete(event, fields, selectedItem.index)
      }
    }
  }

  const discardOrDelete = (event, fields, index) => {
    if (selectedItem?.isNew || !isEditMode) {
      deleteRow(event, fields, index)
    } else {
      discardChanges(event, fields, index)
    }
  }

  const uniquenessValidator = (fields, newValue) => {
    return !fields.value.some(({ key }, index) => {
      return newValue.trim() === key && index !== selectedItem.index
    })
  }

  return (
    <div className={tableClassNames}>
      <div className="table-row table-row__header no-hover">
        <div className="table-cell__inputs-wrapper">
          <div className="table-cell table-cell__key">{keyHeader}</div>
          <div className="table-cell table-cell__value">{valueHeader}</div>
        </div>
        <div className="table-cell table-cell__actions" />
      </div>
      <FieldArray name={name}>
        {({ fields }) => (
          <>
            <div className="key-value-table__body">
              {fields.map((contentItem, index) => {
                return isEditMode && index === selectedItem.index && !disabled ? (
                  <div className="table-row table-row_edit" key={index}>
                    <div className="table-cell table-cell__key">
                      {keyOptions ? (
                        <FormSelect
                          name={`${contentItem}.key`}
                          density="dense"
                          options={keyOptions}
                        />
                      ) : (
                        <FormInput
                          className="input_edit"
                          placeholder={keyLabel}
                          density="dense"
                          name={`${contentItem}.key`}
                          required={isKeyRequired}
                          validationRules={[
                            {
                              name: 'uniqueness',
                              label: 'Name should be unique',
                              pattern: (newValue) => uniquenessValidator(fields, newValue)
                            }
                          ]}
                        />
                      )}
                    </div>
                    <div className="table-cell table-cell__value">
                      <FormInput
                        className="input_edit"
                        placeholder={valueLabel}
                        density="dense"
                        name={`${contentItem}.value`}
                        required={isValueRequired}
                      />
                    </div>
                    <div className="table-cell table-cell__actions">
                      <RoundedIcon
                        className="key-value-table__btn"
                        onClick={(event) => applyChanges(event, fields, index)}
                        tooltipText="Apply"
                      >
                        <Checkmark />
                      </RoundedIcon>
                      <RoundedIcon
                        className="key-value-table__btn"
                        onClick={(event) => discardOrDelete(event, fields, index)}
                        tooltipText={selectedItem.isNew ? 'Delete' : 'Discard changes'}
                      >
                        {selectedItem.isNew ? <Delete /> : <Close />}
                      </RoundedIcon>
                    </div>
                  </div>
                ) : (
                  <div
                    className="table-row"
                    key={index}
                    onClick={(event) => enterEditMode(event, fields, index)}
                  >
                    <div className="table-cell__inputs-wrapper">
                      <div className="table-cell table-cell__key">
                        <Tooltip template={<TextTooltipTemplate text={fields.value[index].key} />}>
                          {fields.value[index].key}
                        </Tooltip>
                      </div>
                      <div className="table-cell table-cell__value">
                        <Tooltip
                          template={<TextTooltipTemplate text={fields.value[index].value} />}
                        >
                          {fields.value[index].value}
                        </Tooltip>
                      </div>
                    </div>
                    <div className="table-cell table-cell__actions">
                      <RoundedIcon
                        className="key-value-table__btn"
                        onClick={(event) => {
                          event.preventDefault()
                        }}
                        tooltipText="Edit"
                      >
                        <Edit />
                      </RoundedIcon>

                      <RoundedIcon
                        className="key-value-table__btn"
                        onClick={(event) => {
                          deleteRow(event, fields, index)
                        }}
                        tooltipText="Delete"
                      >
                        <Delete />
                      </RoundedIcon>
                    </div>
                  </div>
                )
              })}
            </div>

            {!selectedItem?.isNew && (
              <div className="table-row table-row__last no-hover">
                <button
                  className={addBtnClassNames}
                  onClick={(event) => {
                    addNewRow(event, fields)
                  }}
                >
                  <Plus />
                  {addNewItemLabel}
                </button>
              </div>
            )}
          </>
        )}
      </FieldArray>
    </div>
  )
}

FormKeyValueTable.defaultProps = {
  addNewItemLabel: 'Add new item',
  className: '',
  disabled: false,
  isKeyRequired: true,
  isValueRequired: true,
  keyHeader: 'Key',
  keyLabel: 'Key',
  keyOptions: null,
  valueHeader: 'Value',
  valueLabel: 'Value'
}

FormKeyValueTable.propTypes = {
  addNewItemLabel: PropTypes.string,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  formState: PropTypes.shape({}).isRequired,
  isKeyRequired: PropTypes.bool,
  isValueRequired: PropTypes.bool,
  keyHeader: PropTypes.string,
  keyLabel: PropTypes.string,
  keyOptions: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      id: PropTypes.string.isRequired
    })
  ),
  name: PropTypes.string.isRequired,
  valueHeader: PropTypes.string,
  valueLabel: PropTypes.string
}

export default FormKeyValueTable
