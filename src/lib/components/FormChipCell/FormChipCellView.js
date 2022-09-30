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
import { FieldArray } from 'react-final-form-arrays'

import Tooltip from '../Tooltip/Tooltip'
import FormChip from './FormChip/FormChip'
import TextTooltipTemplate from '../TooltipTemplate/TextTooltipTemplate'
import HiddenChipsBlock from '../../elements/HiddenChipsBlock/HiddenChipsBlock'

import { CHIP_OPTIONS } from '../../types'
import { uniquenessError } from './formChipCell.util'
import { isEveryObjectValueEmpty } from '../../utils/common.util'

import { ReactComponent as Add } from '../../images/add.svg'

const FormChipCellView = React.forwardRef(
  (
    {
      chipOptions,
      chips,
      editConfig,
      handleAddNewChip,
      handleEditChip,
      handleRemoveChip,
      handleShowElements,
      handleToEditMode,
      isEditMode,
      name,
      setChipsSizes,
      setEditConfig,
      shortChips,
      showChips,
      showHiddenChips,
      validateFields,
      validationRules
    },
    { chipsCellRef, chipsWrapperRef }
  ) => {
    const buttonAddClassNames = classnames(
      'button-add',
      chipOptions.background && `button-add-background_${chipOptions.background}`,
      chipOptions.borderColor && `button-add-border_${chipOptions.borderColor}`,
      chipOptions.font && `button-add-font_${chipOptions.font}`,
      chipOptions.density && `button-add-density_${chipOptions.density}`
    )
    const wrapperClassNames = classnames('chips-wrapper', isEditMode && 'fixed-max-width')
    const chipClassNames = classnames(
      'chip',
      'chip__content',
      isEditMode && 'data-ellipsis',
      shortChips && 'chip_short',
      chips.hiddenChips && 'chip_hidden',
      chipOptions.density && `chip-density_${chipOptions.density}`,
      chipOptions.borderRadius && `chip-border_${chipOptions.borderRadius}`,
      chipOptions.background && `chip-background_${chipOptions.background}`,
      chipOptions.borderColor && `chip-border_${chipOptions.borderColor}`,
      chipOptions.font && `chip-font_${chipOptions.font}`,
      isEditMode && 'editable',
      (showChips || isEditMode) && 'chip_visible'
    )

    return (
      <FieldArray name={name} validate={validateFields}>
        {({ fields, meta }) => {
          if (validationRules.key.every((rule) => rule.name !== uniquenessError.name)) {
            validationRules.key.push(uniquenessError)
          }

          return (
            (isEditMode || !isEveryObjectValueEmpty(fields)) && (
              <div className="chips-cell" ref={chipsCellRef}>
                <div className={wrapperClassNames} ref={chipsWrapperRef}>
                  {fields.map((contentItem, index) => {
                    const chipData = fields.value[index]
                    return (
                      index < chips.visibleChips.length && (
                        <div className="chip-block" key={chipData.id}>
                          <Tooltip
                            hidden={editConfig.isEdit}
                            key={chipData.id}
                            template={
                              <TextTooltipTemplate
                                text={
                                  <span className="chip__content">
                                    {chipData.key}
                                    <span className="chip__delimiter">
                                      {chipData.delimiter ? chipData.delimiter : ':'}
                                    </span>
                                    {chipData.value}
                                  </span>
                                }
                              />
                            }
                          >
                            <FormChip
                              chip={chipData}
                              chipIndex={index}
                              chipOptions={chipOptions}
                              editConfig={editConfig}
                              handleEditChip={(event, nameEvent) =>
                                handleEditChip(event, fields, nameEvent)
                              }
                              handleRemoveChip={(event, index) =>
                                handleRemoveChip(event, fields, index)
                              }
                              handleToEditMode={handleToEditMode}
                              isEditMode={isEditMode}
                              keyName={`${contentItem}.key`}
                              meta={meta}
                              ref={chipsCellRef}
                              setChipsSizes={setChipsSizes}
                              setEditConfig={setEditConfig}
                              validationRules={validationRules}
                              valueName={`${contentItem}.value`}
                            />
                          </Tooltip>
                        </div>
                      )
                    )
                  })}

                  <div className="chip-block">
                    {chips.hiddenChips.length > 0 && showHiddenChips && (
                      <HiddenChipsBlock
                        chipClassNames={chipClassNames}
                        chipOptions={chipOptions}
                        chips={chips.hiddenChips}
                        handleShowElements={handleShowElements}
                        ref={chipsCellRef}
                        textOverflowEllipsis
                      />
                    )}
                    {chips.hiddenChipsNumber && (
                      <span
                        className={`${chipClassNames} chips_button`}
                        onClick={handleShowElements}
                      >
                        {chips.hiddenChipsNumber}
                      </span>
                    )}
                  </div>

                  {isEditMode && (
                    <button
                      className={buttonAddClassNames}
                      onClick={(e) => handleAddNewChip(e, fields)}
                    >
                      <Add />
                    </button>
                  )}
                </div>
              </div>
            )
          )
        }}
      </FieldArray>
    )
  }
)

FormChipCellView.defaultProps = {
  chipOptions: {
    background: 'purple',
    boldValue: false,
    borderRadius: 'primary',
    borderColor: 'transparent',
    density: 'dense',
    font: 'purple'
  },
  isEditMode: false,
  shortChips: false,
  validationRules: {}
}

FormChipCellView.propTypes = {
  chipOptions: CHIP_OPTIONS,
  chips: PropTypes.object.isRequired,
  editConfig: PropTypes.object.isRequired,
  handleAddNewChip: PropTypes.func.isRequired,
  handleEditChip: PropTypes.func.isRequired,
  handleRemoveChip: PropTypes.func.isRequired,
  handleShowElements: PropTypes.func.isRequired,
  handleToEditMode: PropTypes.func.isRequired,
  isEditMode: PropTypes.bool,
  name: PropTypes.string.isRequired,
  setChipsSizes: PropTypes.func.isRequired,
  setEditConfig: PropTypes.func.isRequired,
  shortChips: PropTypes.bool,
  showChips: PropTypes.bool.isRequired,
  showHiddenChips: PropTypes.bool.isRequired,
  validateFields: PropTypes.func.isRequired,
  validationRules: PropTypes.object
}

export default FormChipCellView
