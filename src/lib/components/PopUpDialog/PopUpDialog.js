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
import React, { useCallback, useEffect, useLayoutEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { createPortal } from 'react-dom'

import RoundedIcon from '../RoundedIcon/RoundedIcon'
import Tooltip from '../Tooltip/Tooltip'
import TextTooltipTemplate from '../TooltipTemplate/TextTooltipTemplate'

import { POP_UP_CUSTOM_POSITION } from '../../types'
import { ReactComponent as CloseIcon } from '../../images/close.svg'

import './popUpDialog.scss'

const PopUpDialog = ({
  children,
  className,
  closePopUp,
  customPosition,
  headerIsHidden,
  headerText,
  style,
  tooltipText
}) => {
  const popUpOverlayRef = useRef(null)
  const popUpClassNames = classnames(
    className,
    'pop-up-dialog__overlay',
    customPosition.element && 'custom-position'
  )

  const calculateCustomPopUpPosition = useCallback(() => {
    if (customPosition && customPosition.element) {
      const elementRect = customPosition.element.current.getBoundingClientRect()
      const popUpRect = popUpOverlayRef.current.getBoundingClientRect()
      const [verticalPosition, horizontalPosition] = customPosition.position.split('-')
      const leftPosition =
        horizontalPosition === 'left' ? elementRect.right - popUpRect.width : elementRect.left
      let topPosition

      if (verticalPosition === 'top') {
        topPosition =
          elementRect.top > popUpRect.height ? elementRect.top - popUpRect.height - 5 : 5
      } else {
        topPosition =
          popUpRect.height + elementRect.bottom > window.innerHeight
            ? window.innerHeight - popUpRect.height - 5
            : elementRect.bottom + 5
      }

      popUpOverlayRef.current.style.top = `${topPosition}px`

      if (style.left) {
        popUpOverlayRef.current.style.left = `calc(${leftPosition}px + ${style.left})`
      } else {
        popUpOverlayRef.current.style.left = `${leftPosition}px`
      }
    }
  }, [customPosition, style.left])

  useLayoutEffect(() => {
    calculateCustomPopUpPosition()
  }, [calculateCustomPopUpPosition])

  useEffect(() => {
    window.addEventListener('resize', calculateCustomPopUpPosition)

    return () => {
      window.removeEventListener('resize', calculateCustomPopUpPosition)
    }
  })

  return createPortal(
    <div ref={popUpOverlayRef} className={popUpClassNames} style={style}>
      <div data-testid="pop-up-dialog" className="pop-up-dialog">
        {!headerIsHidden && (
          <div className="pop-up-dialog__header">
            {headerText && (
              <div data-testid="pop-up-dialog-header" className="pop-up-dialog__header-text">
                <Tooltip template={<TextTooltipTemplate text={tooltipText || headerText} />}>
                  <span>{headerText}</span>
                </Tooltip>
              </div>
            )}
            <RoundedIcon
              className="pop-up-dialog__btn_close"
              onClick={closePopUp}
              tooltipText="Close"
              data-testid="pop-up-close-btn"
            >
              <CloseIcon />
            </RoundedIcon>
          </div>
        )}
        {children}
      </div>
    </div>,
    document.getElementById('overlay_container')
  )
}

PopUpDialog.defaultProps = {
  className: '',
  closePopUp: () => {},
  customPosition: {},
  headerIsHidden: false,
  headerText: '',
  style: {},
  tooltipText: ''
}

PopUpDialog.propTypes = {
  className: PropTypes.string,
  closePopUp: PropTypes.func,
  customPosition: POP_UP_CUSTOM_POSITION,
  headerIsHidden: PropTypes.bool,
  headerText: PropTypes.string,
  style: PropTypes.object,
  tooltipText: PropTypes.string
}

export default PopUpDialog
