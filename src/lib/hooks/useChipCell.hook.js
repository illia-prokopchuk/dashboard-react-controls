/*
Copyright 2019 Iguazio Systems Ltd.

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
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { throttle } from 'lodash'

import { getTransitionEndEventName, isEveryObjectValueEmpty } from '../utils/common.util'
import { getFirstScrollableParent } from '../utils/getFirstScrollableParent.util'

export const useChipCell = (isEditMode, visibleChipsMaxLength) => {
  const [showHiddenChips, setShowHiddenChips] = useState(false)
  const [chipsSizes, setChipsSizes] = useState({})
  const [showChips, setShowChips] = useState(false)
  const [visibleChipsCount, setVisibleChipsCount] = useState(8)

  const transitionEndEventName = useMemo(() => getTransitionEndEventName(), [])

  const chipsCellRef = useRef()
  const chipsWrapperRef = useRef()
  const hiddenChipsCounterRef = useRef()
  const hiddenChipsPopUpRef = useRef()

  const handleShowElements = useCallback(
    (event) => {
      if (!isEditMode || (isEditMode && visibleChipsMaxLength)) {
        if (!hiddenChipsCounterRef.current?.contains(event.target)) {
          setShowHiddenChips(false)
        } else {
          setShowHiddenChips(true)
        }
      }

      event && event.stopPropagation()
    },
    [isEditMode, visibleChipsMaxLength]
  )

  useEffect(() => {
    if (showHiddenChips) {
      window.addEventListener('click', handleShowElements)

      return () => window.removeEventListener('click', handleShowElements)
    }
  }, [showHiddenChips, handleShowElements])

  const handleScroll = useCallback(
    (event) => {
      if (event.target.parentElement !== hiddenChipsPopUpRef?.current) {
        setShowHiddenChips(false)
      }
    },
    [hiddenChipsPopUpRef]
  )

  useEffect(() => {
    if (showHiddenChips) {
      window.addEventListener('scroll', handleScroll, true)
    }

    return () => window.removeEventListener('scroll', handleScroll, true)
  }, [handleScroll, showHiddenChips])

  const resizeChipCell = useCallback(() => {
    if (hiddenChipsPopUpRef?.current) {
      const scrollableParent = getFirstScrollableParent(hiddenChipsCounterRef.current.offsetParent)
      const scrollableParentRect = scrollableParent.getBoundingClientRect()
      const hiddenChipsCounterRect = hiddenChipsCounterRef.current?.getBoundingClientRect()

      // Check if the hiddenChipsCounterRect is outside the boundaries of the scrollableParentRect or the window
      if (
        hiddenChipsCounterRect.left < scrollableParentRect.left ||
        hiddenChipsCounterRect.top < scrollableParentRect.top ||
        hiddenChipsCounterRect.right > scrollableParentRect.right ||
        hiddenChipsCounterRect.bottom > scrollableParentRect.bottom ||
        hiddenChipsCounterRect.right > window.innerWidth ||
        hiddenChipsCounterRect.bottom > window.innerHeight
      ) {
        setShowHiddenChips(false)
      }
    }

    if (!isEditMode && !isEveryObjectValueEmpty(chipsSizes)) {
      const parentSize = chipsCellRef.current?.getBoundingClientRect().width

      let maxLength = 0
      let chipIndex = 0
      const padding = 65

      Object.values(chipsSizes).every((chipSize, index) => {
        // Check if adding chipSize to maxLength exceeds parentSize
        // or if adding chipSize and padding exceeds parentSize when there are multiple chips
        if (
          maxLength + chipSize > parentSize ||
          (Object.values(chipsSizes).length > 1 && maxLength + chipSize + padding > parentSize)
        ) {
          chipIndex = index

          return false
        } else {
          maxLength += chipSize

          if (index === Object.values(chipsSizes).length - 1) {
            chipIndex = 8
          }

          return true
        }
      })

      setVisibleChipsCount(chipIndex)
      setShowChips(true)
    }
  }, [chipsSizes, isEditMode])

  useEffect(() => {
    resizeChipCell()
  }, [resizeChipCell])

  useEffect(() => {
    const resizeChipCellDebounced = throttle(resizeChipCell, 500)

    if (!isEditMode) {
      window.addEventListener('resize', resizeChipCellDebounced)
      window.addEventListener(transitionEndEventName, resizeChipCellDebounced)

      return () => {
        window.removeEventListener('resize', resizeChipCellDebounced)
        window.removeEventListener(transitionEndEventName, resizeChipCellDebounced)
      }
    }
  }, [resizeChipCell, isEditMode, transitionEndEventName])

  return {
    chipsCellRef,
    chipsWrapperRef,
    handleShowElements,
    hiddenChipsCounterRef,
    hiddenChipsPopUpRef,
    setChipsSizes,
    setShowHiddenChips,
    showChips,
    showHiddenChips,
    visibleChipsCount
  }
}
