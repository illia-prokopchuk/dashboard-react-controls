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
      chipClassNames,
      chipIndex,
      chipOptions,
      editConfig,
      handleEditChip,
      handleIsEdit,
      handleRemoveChip,
      isDeleteMode,
      isEditMode,
      keyName,
      name,
      setChipsSizes,
      setEditConfig,
      textOverflowEllipsis,
      valueName
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

    const chipsClassNames = classnames(
      chipClassNames,
      editConfig.error?.indices.includes(chipIndex) && 'chip_duplicated'
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
        name={name}
        onChange={handleEditChip}
        ref={ref}
        setEditConfig={setEditConfig}
        valueName={valueName}
      />
    ) : (
      <div
        className={chipsClassNames}
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
