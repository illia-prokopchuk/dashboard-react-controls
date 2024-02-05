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

import Button from '../Button/Button'
import PopUpDialog from '../PopUpDialog/PopUpDialog'

import {
  CONFIRM_DIALOG_CANCEL_BUTTON,
  CONFIRM_DIALOG_MESSAGE,
  CONFIRM_DIALOG_SUBMIT_BUTTON
} from '../../types'

import './confirmDialog.scss'

const ConfirmDialog = ({
  cancelButton,
  className,
  closePopUp,
  confirmButton,
  customPosition,
  header,
  isOpen,
  message,
  messageOnly,
  onResolve
}) => {
  const messageClassNames = classnames(
    'confirm-dialog__message',
    messageOnly && 'confirm-dialog__message-only'
  )

  const handleCancelDialog = (event) => {
    onResolve && onResolve()
    cancelButton.handler && cancelButton.handler(event)
  }

  const handleCloseDialog = (event) => {
    onResolve && onResolve()
    closePopUp && closePopUp(event)
  }

  const handleConfirmDialog = (event) => {
    onResolve && onResolve()
    confirmButton.handler && confirmButton.handler(event)
  }

  return (
    isOpen && (
      <PopUpDialog
        className={className}
        closePopUp={handleCloseDialog}
        customPosition={customPosition}
        headerText={header}
      >
        <div className="confirm-dialog">
          {message && <div className={messageClassNames}>{message}</div>}
          <div className="confirm-dialog__btn-container">
            {cancelButton && (
              <Button
                className="pop-up-dialog__btn_cancel"
                label={cancelButton.label}
                onClick={handleCancelDialog}
                variant={cancelButton.variant}
              />
            )}
            {confirmButton && (
              <Button
                label={confirmButton.label}
                onClick={handleConfirmDialog}
                variant={confirmButton.variant}
              />
            )}
          </div>
        </div>
      </PopUpDialog>
    )
  )
}

ConfirmDialog.defaultProps = {
  cancelButton: null,
  className: '',
  confirmButton: null,
  customPosition: {},
  header: '',
  message: '',
  messageOnly: false
}

ConfirmDialog.propTypes = {
  cancelButton: CONFIRM_DIALOG_CANCEL_BUTTON,
  className: PropTypes.string,
  closePopUp: PropTypes.func,
  confirmButton: CONFIRM_DIALOG_SUBMIT_BUTTON,
  customPosition: PropTypes.object,
  header: PropTypes.string,
  message: CONFIRM_DIALOG_MESSAGE,
  messageOnly: PropTypes.bool
}

export default ConfirmDialog
