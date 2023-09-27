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
import React, { useRef, useState, useEffect, useCallback } from 'react'
import { createPortal } from 'react-dom'
import PropTypes from 'prop-types'
import { CSSTransition } from 'react-transition-group'
import classnames from 'classnames'
import { debounce } from 'lodash'

import { isEveryObjectValueEmpty } from '../../utils/common.util'

import './tooltip.scss'

const Tooltip = ({ children, className, hidden, renderChildAsHtml, template, textShow }) => {
  const [show, setShow] = useState(false)
  const [style, setStyle] = useState({})
  const tooltipClassNames = classnames('data-ellipsis', 'tooltip-wrapper', className)
  const duration = 200
  const parentRef = useRef()
  const tooltipRef = useRef()
  const offset = 10

  const handleScroll = () => {
    setShow(false)
  }

  const handleMouseLeave = useCallback((event) => {
    if (
      tooltipRef.current &&
      !tooltipRef.current.contains(event.relatedTarget) &&
      parentRef.current &&
      !parentRef.current.contains(event.relatedTarget)
    ) {
      setShow(false)
    }
  }, [])

  const handleMouseEnter = useCallback(
    (event) => {
      if (!show) {
        const [child] = parentRef.current.childNodes
        let show =
          !hidden &&
          (textShow
            ? true
            : !child
            ? false
            : child.nodeType !== Node.TEXT_NODE ||
              /*
            If the child node is a text node and the text of the child node inside the container is greater than the width of the container, then show tooltip.
          */
              (child.nodeType === Node.TEXT_NODE &&
                parentRef.current.scrollWidth > parentRef.current.offsetWidth))
        if (show) {
          setShow(true)
          let { height, top, bottom } = parentRef?.current?.getBoundingClientRect() ?? {}
          const { height: tooltipHeight, width: tooltipWidth } =
            tooltipRef.current?.getBoundingClientRect() ?? {
              height: 0,
              width: 0
            }
          const leftPosition = event.x - (event.x + tooltipWidth - window.innerWidth + offset)
          const left =
            event.x + tooltipWidth + offset > window.innerWidth
              ? leftPosition > offset
                ? leftPosition
                : offset
              : event.x + offset

          if (top + height + offset + tooltipHeight >= window.innerHeight) {
            const topPosition = bottom - height - offset - tooltipHeight

            setStyle({
              top: topPosition > 0 ? topPosition : offset,
              left
            })
          } else {
            setStyle({
              top: top + height + offset,
              left
            })
          }
        }
      }
    },
    [hidden, textShow, show]
  )

  const clearStyles = debounce(() => {
    if (!isEveryObjectValueEmpty(style)) {
      setStyle({})
    }
  }, 100)

  useEffect(() => {
    const parentNode = parentRef.current

    if (parentNode) {
      parentNode.addEventListener('mouseenter', handleMouseEnter)
      parentNode.addEventListener('mouseleave', handleMouseLeave)

      return () => {
        parentNode.removeEventListener('mouseenter', handleMouseEnter)
        parentNode.removeEventListener('mouseleave', handleMouseLeave)
      }
    }
  }, [parentRef, handleMouseEnter, handleMouseLeave])

  useEffect(() => {
    const tooltipNode = tooltipRef.current

    if (tooltipNode && show) {
      tooltipNode.addEventListener('mouseleave', handleMouseLeave)

      return () => {
        tooltipNode.removeEventListener('mouseleave', handleMouseLeave)
      }
    }
  }, [tooltipRef, handleMouseEnter, handleMouseLeave, show])

  useEffect(() => {
    if (show) {
      window.addEventListener('scroll', handleScroll, true)
    }

    return () => window.removeEventListener('scroll', handleScroll, true)
  }, [show])

  useEffect(() => {
    window.addEventListener('resize', clearStyles)

    return () => {
      window.removeEventListener('resize', clearStyles)
    }
  }, [clearStyles, style])

  return (
    <>
      {renderChildAsHtml ? (
        <div
          data-testid="tooltip-wrapper"
          ref={parentRef}
          className={tooltipClassNames}
          dangerouslySetInnerHTML={{ __html: children }}
        />
      ) : (
        <div data-testid="tooltip-wrapper" ref={parentRef} className={tooltipClassNames}>
          {children}
        </div>
      )}
      {!hidden &&
        createPortal(
          <CSSTransition classNames="fade" in={show} timeout={duration} unmountOnExit>
            <div
              data-testid="tooltip"
              ref={tooltipRef}
              style={{
                ...style
              }}
              className="tooltip"
            >
              {template}
            </div>
          </CSSTransition>,
          document.getElementById('overlay_container')
        )}
    </>
  )
}

Tooltip.defaultProps = {
  hidden: false,
  renderChildAsHtml: false,
  textShow: false
}

Tooltip.propTypes = {
  className: PropTypes.string,
  hidden: PropTypes.bool,
  renderChildAsHtml: PropTypes.bool,
  template: PropTypes.element.isRequired,
  textShow: PropTypes.bool
}

export default React.memo(Tooltip)
