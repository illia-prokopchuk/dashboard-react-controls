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
import React, { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { createPortal } from 'react-dom'
import { throttle } from 'lodash'

import RoundedIcon from '../RoundedIcon/RoundedIcon'
import Tooltip from '../Tooltip/Tooltip'
import TextTooltipTemplate from '../TooltipTemplate/TextTooltipTemplate'

import { POP_UP_CUSTOM_POSITION } from '../../types'
import { ReactComponent as CloseIcon } from '../../images/close.svg'

import './popUpDialog.scss'

const PopUpDialog = React.forwardRef(
  (
    {
      children,
      className = '',
      closePopUp = () => {},
      customPosition = {},
      headerIsHidden = false,
      headerText = '',
      showPopUpDialog = true,
      style = {},
      tooltipText = ''
    },
    ref
  ) => {
    const [showPopUp, setShowPopUp] = useState(showPopUpDialog ?? true)
    const popUpOverlayRef = useRef(null)
    ref ??= popUpOverlayRef
    const popUpClassNames = classnames(
      className,
      'pop-up-dialog__overlay',
      customPosition.element && 'custom-position'
    )

    const handleClosePopUp = useCallback(() => {
      closePopUp && closePopUp()
      setShowPopUp(false)
    }, [closePopUp])

    const calculateCustomPopUpPosition = useCallback(() => {
      if (customPosition?.element?.current && ref?.current) {
        const elementRect = customPosition.element.current.getBoundingClientRect()
        const popUpRect = ref.current.getBoundingClientRect()
        const [verticalPosition, horizontalPosition] = customPosition.position.split('-')
        const popupMargin = 15
        const elementMargin = 5
        const isEnoughSpaceFromLeft = elementRect.right >= popUpRect.width + popupMargin
        const isEnoughSpaceFromRight =
          window.innerWidth - elementRect.left >= popUpRect.width + popupMargin
        const isEnoughSpaceFromTop =
          elementRect.top > popUpRect.height + popupMargin + elementMargin
        const isEnoughSpaceFromBottom =
          elementRect.bottom + popUpRect.height + popupMargin + elementMargin <= window.innerHeight
        let leftPosition =
          horizontalPosition === 'left' ? elementRect.right - popUpRect.width : elementRect.left

        let topPosition

        if (verticalPosition === 'top') {
          topPosition = isEnoughSpaceFromTop
            ? elementRect.top - popUpRect.height - elementMargin
            : popupMargin
        } else {
          topPosition = isEnoughSpaceFromBottom
            ? elementRect.bottom + elementMargin
            : window.innerHeight - popUpRect.height - popupMargin
        }

        if (customPosition.autoVerticalPosition) {
          if (verticalPosition === 'top') {
            if (!isEnoughSpaceFromTop && isEnoughSpaceFromBottom) {
              topPosition = elementRect.bottom + elementMargin
            }
          } else {
            if (isEnoughSpaceFromTop && !isEnoughSpaceFromBottom) {
              topPosition = elementRect.top - popUpRect.height - elementMargin
            }
          }
        }

        if (customPosition.autoHorizontalPosition) {
          if (verticalPosition === 'left') {
            if (!isEnoughSpaceFromLeft && isEnoughSpaceFromRight) {
              leftPosition = elementRect.left
            } else if (!isEnoughSpaceFromLeft && !isEnoughSpaceFromRight) {
              leftPosition = popupMargin
            }
          } else {
            if (isEnoughSpaceFromLeft && !isEnoughSpaceFromRight) {
              leftPosition = elementRect.right - popUpRect.width
            } else if (!isEnoughSpaceFromLeft && !isEnoughSpaceFromRight) {
              leftPosition = window.innerWidth - popUpRect.width - popupMargin
            }
          }
        }

        ref.current.style.top = `${topPosition}px`

        if (style.left && !(customPosition.autoHorizontalPosition && isEnoughSpaceFromRight)) {
          ref.current.style.left = `calc(${leftPosition}px + ${style.left})`
        } else {
          ref.current.style.left = `${leftPosition}px`
        }
      }
    }, [customPosition, style.left, ref])

    useLayoutEffect(() => {
      calculateCustomPopUpPosition()
    }, [calculateCustomPopUpPosition])

    useEffect(() => {
      if (showPopUp) {
        const throttledCalculatedCustomPopUpPosition = throttle(calculateCustomPopUpPosition, 100, {
          trailing: true,
          leading: true
        })
        const popupObserver = new ResizeObserver(throttledCalculatedCustomPopUpPosition)
        const popupElement = ref.current

        popupObserver.observe(popupElement)
        window.addEventListener('resize', throttledCalculatedCustomPopUpPosition)

        return () => {
          popupObserver.unobserve(popupElement)
          window.removeEventListener('resize', throttledCalculatedCustomPopUpPosition)
        }
      }
    }, [calculateCustomPopUpPosition, ref, showPopUp])

    return showPopUp
      ? createPortal(
          <div ref={ref} className={popUpClassNames} style={style}>
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
                    onClick={handleClosePopUp}
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
      : null
  }
)

PopUpDialog.propTypes = {
  className: PropTypes.string,
  closePopUp: PropTypes.func,
  customPosition: POP_UP_CUSTOM_POSITION,
  headerIsHidden: PropTypes.bool,
  headerText: PropTypes.string,
  showPopUpDialog: PropTypes.bool,
  style: PropTypes.object,
  tooltipText: PropTypes.string
}

export default PopUpDialog
