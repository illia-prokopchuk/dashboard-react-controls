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
import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

import NewChipForm from '../NewChipForm/NewChipForm'

import { CHIP_OPTIONS } from '../../../types'

import { ReactComponent as Close } from '../../../images/close.svg'

import './formChip.scss'

const FormChip = React.forwardRef(
  (
    {
      chip,
      chipClassNames: className,
      chipIndex,
      chipOptions,
      editConfig,
      handleEditChip,
      handleIsEdit,
      handleRemoveChip,
      isDeleteMode,
      isEditMode,
      keyName,
      meta,
      setChipsSizes,
      setEditConfig,
      textOverflowEllipsis,
      valueName,
      validationRules
    },
    ref
  ) => {
    const chipRef = React.useRef()

    const chipLabelClassNames = classnames(
      'chip__label',
      (textOverflowEllipsis || isEditMode) && 'data-ellipsis'
    )
    const chipValueClassNames = classnames(
      'chip__value',
      (textOverflowEllipsis || isEditMode) && 'data-ellipsis',
      chipOptions.boldValue && 'chip-value_bold'
    )

    const chipClassNames = classnames(
      className,
      meta.error && meta.error.indices?.includes(chipIndex) && 'chip_duplicated'
    )

    useEffect(() => {
      if (chipRef.current && setChipsSizes) {
        setChipsSizes((state) => ({
          ...state,
          [chipIndex]: chipRef.current.getBoundingClientRect().width
        }))
      }
    }, [chipIndex, setChipsSizes])

    return isEditMode && chipIndex === editConfig.chipIndex ? (
      <NewChipForm
        chip={chip}
        chipOptions={chipOptions}
        className="input-label-key"
        editConfig={editConfig}
        keyName={keyName}
        meta={meta}
        onChange={handleEditChip}
        ref={ref}
        setEditConfig={setEditConfig}
        valueName={valueName}
        validationRules={validationRules}
      />
    ) : (
      <div
        className={chipClassNames}
        onClick={(event) => handleIsEdit(event, chipIndex)}
        ref={chipRef}
      >
        {chip.key && <div className={chipLabelClassNames}>{chip.key}</div>}
        {chip.value && (
          <>
            <div className="chip__delimiter">{chip.delimiter ?? ':'}</div>
            <div className={chipValueClassNames}>{chip.value}</div>
          </>
        )}
        {(isEditMode || isDeleteMode) && (
          <button
            className="item-icon-close"
            onClick={(event) => handleRemoveChip(event, chipIndex)}
          >
            <Close />
          </button>
        )}
      </div>
    )
  }
)

FormChip.defaultProps = {
  chipOptions: {
    background: 'purple',
    boldValue: false,
    borderRadius: 'primary',
    borderColor: 'transparent',
    density: 'dense',
    font: 'purple'
  },
  isDeleteMode: false,
  isEditMode: false,
  keyName: '',
  textOverflowEllipsis: false,
  valueName: ''
}

FormChip.propTypes = {
  chip: PropTypes.object.isRequired,
  chipClassNames: PropTypes.string.isRequired,
  chipIndex: PropTypes.number.isRequired,
  chipOptions: CHIP_OPTIONS,
  editConfig: PropTypes.object.isRequired,
  handleEditChip: PropTypes.func.isRequired,
  handleIsEdit: PropTypes.func.isRequired,
  handleRemoveChip: PropTypes.func.isRequired,
  isDeleteMode: PropTypes.bool,
  isEditMode: PropTypes.bool,
  keyName: PropTypes.string,
  setChipsSizes: PropTypes.func.isRequired,
  setEditConfig: PropTypes.func.isRequired,
  textOverflowEllipsis: PropTypes.bool,
  valueName: PropTypes.string
}

export default FormChip
