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
import PropTypes from 'prop-types'
import classnames from 'classnames'

import Tooltip from '../../components/Tooltip/Tooltip'
import TextTooltipTemplate from '../../components/TooltipTemplate/TextTooltipTemplate'

import { CHIP_OPTIONS } from '../../types'
import { getFirstScrollableParentUtil } from '../../utils/getFirstScrollableParent.util'

import './hiddenChipsBlock.scss'

const HiddenChipsBlock = React.forwardRef(
  ({ chipClassNames, chipOptions, chips, handleShowElements, textOverflowEllipsis }, ref) => {
    const [isTop, setIsTop] = useState(false)
    const [isRight, setIsRight] = useState(true)
    const [isVisible, setIsVisible] = useState(false)
    const [windowHalfWidth, setWindowHalfWidth] = useState(window.innerWidth / 2)

    const hiddenRef = useRef()

    const offset = 28

    const hiddenChipsBlockClassNames = classnames(
      'chip-block-hidden',
      isTop ? 'chip-block-hidden_top' : 'chip-block-hidden_bottom',
      isRight ? 'chip-block-hidden_right' : 'chip-block-hidden_left',
      isVisible && 'chip-block-hidden_visible'
    )
    const chipLabelClassNames = classnames('chip__label', textOverflowEllipsis && 'data-ellipsis')
    const chipValueClassNames = classnames(
      'chip__value',
      textOverflowEllipsis && 'data-ellipsis',
      chipOptions.boldValue && 'chip-value_bold'
    )

    const handleResize = useCallback(() => {
      if (hiddenRef?.current) {
        setWindowHalfWidth(parseInt(window.innerWidth / 2))
      }
    }, [hiddenRef])

    const generateChipData = (chip) => {
      return `${chip.key}${chip.delimiter ? chip.delimiter : ':'} ${chip.value}`
    }

    useEffect(() => {
      handleResize()
    }, [handleResize])

    useEffect(() => {
      if (hiddenRef?.current) {
        window.addEventListener('resize', handleResize)

        return () => window.removeEventListener('resize', handleResize)
      }
    }, [handleResize, hiddenRef])

    useEffect(() => {
      if (hiddenRef?.current) {
        const scrollableParent = getFirstScrollableParentUtil(hiddenRef.current.offsetParent)
        const { height, top } = hiddenRef.current.getBoundingClientRect()
        const { right } = ref.current.getBoundingClientRect()

        if (
          hiddenRef.current.offsetParent.getBoundingClientRect().top -
            hiddenRef.current.offsetParent.clientHeight -
            height -
            offset <
            0 ||
          scrollableParent.getBoundingClientRect().top > top
        ) {
          setIsTop(true)
        }

        setIsRight(right <= windowHalfWidth)
        setIsVisible(true)
      }
    }, [hiddenRef, isRight, offset, ref, windowHalfWidth])

    useEffect(() => {
      if (chips.length === 0) {
        handleShowElements()
      }
    })

    return (
      <div ref={hiddenRef} className={hiddenChipsBlockClassNames}>
        {chips?.map((element) => {
          return (
            <Tooltip
              key={element.id}
              template={
                <TextTooltipTemplate
                  text={
                    element.delimiter ? (
                      <span className="chip__content">
                        {element.key}
                        <span className="chip__delimiter">{element.delimiter}</span>
                        {element.value}
                      </span>
                    ) : (
                      generateChipData(element)
                    )
                  }
                />
              }
            >
              <div className={chipClassNames}>
                {element.key && <div className={chipLabelClassNames}>{element.key}</div>}
                {element.value && (
                  <>
                    <div className="chip__delimiter">{element.delimiter ?? ':'}</div>
                    <div className={chipValueClassNames}>{element.value}</div>
                  </>
                )}
              </div>
            </Tooltip>
          )
        })}
      </div>
    )
  }
)

HiddenChipsBlock.defaultProps = {
  textOverflowEllipsis: false
}

HiddenChipsBlock.propTypes = {
  chipClassNames: PropTypes.string.isRequired,
  chipOptions: CHIP_OPTIONS.isRequired,
  chips: PropTypes.array.isRequired,
  handleShowElements: PropTypes.func.isRequired,
  textOverflowEllipsis: PropTypes.bool
}

export default HiddenChipsBlock
