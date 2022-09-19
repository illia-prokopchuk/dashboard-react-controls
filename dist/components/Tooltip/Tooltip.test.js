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
// todo: rewrite existing tests
// import {
//   cleanup,
//   fireEvent,
//   render,
//   waitForElementToBeRemoved
// } from '@testing-library/react'
// import React from 'react'
// import Tooltip from './Tooltip'
//
// const renderComponent = props =>
//   render(
//     <Tooltip {...props}>
//       <div>tooltip</div>
//     </Tooltip>
//   )
//
// window.resizeTo = function resizeTo(width, height) {
//   Object.assign(this, {
//     innerWidth: width,
//     innerHeight: height,
//     outerWidth: width,
//     outerHeight: height
//   }).dispatchEvent(new this.Event('resize'))
// }
//
// describe('Tooltip', () => {
//   let wrapper
//   beforeEach(() => {
//     const props = {
//       template: <div>It's tooltip</div>
//     }
//     wrapper = renderComponent(props)
//   })
//
//   afterEach(cleanup)
//
//   it('renders without crashing', () => {
//     expect(wrapper.queryByTestId('tooltip-wrapper')).not.toBeNull()
//   })
//
//   it('should hide tooltip while scrolling', async () => {
//     const tooltipWrapper = wrapper.getByTestId('tooltip-wrapper')
//
//     fireEvent.mouseEnter(tooltipWrapper)
//
//     const tooltip = wrapper.getByTestId('tooltip')
//
//     expect(tooltip).not.toBeNull()
//
//     fireEvent.scroll(window)
//
//     const removeTooltip = await waitForElementToBeRemoved(
//       wrapper.getByTestId('tooltip')
//     )
//     expect(removeTooltip).toBeUndefined()
//   })
//
//   it('should hide tooltip when mouse leave', async () => {
//     const tooltipWrapper = wrapper.getByTestId('tooltip-wrapper')
//
//     fireEvent.mouseEnter(tooltipWrapper)
//
//     const tooltip = wrapper.getByTestId('tooltip')
//
//     expect(tooltip).not.toBeNull()
//
//     fireEvent.mouseLeave(tooltipWrapper)
//
//     const removeTooltip = await waitForElementToBeRemoved(
//       wrapper.getByTestId('tooltip')
//     )
//     expect(removeTooltip).toBeUndefined()
//   })
//
//   it('should show tooltip on the top', () => {
//     window.resizeTo(800, 10)
//
//     wrapper.rerender(
//       <Tooltip template={<div>It's tooltip 123</div>}>
//         <div>tooltip</div>
//       </Tooltip>
//     )
//     const tooltipWrapper = wrapper.getByTestId('tooltip-wrapper')
//
//     fireEvent.mouseEnter(tooltipWrapper)
//
//     const tooltip = wrapper.getByTestId('tooltip')
//
//     expect(tooltip.style.top).toBe('-10px')
//   })
//
//   it('should always show tooltip if textShow set to "true"', () => {
//     wrapper.rerender(
//       <Tooltip template={<div>It's tooltip 123</div>} textShow={true}>
//         tooltip
//       </Tooltip>
//     )
//
//     const tooltipWrapper = wrapper.getByTestId('tooltip-wrapper')
//
//     fireEvent.mouseEnter(tooltipWrapper)
//
//     const tooltip = wrapper.getByTestId('tooltip')
//
//     expect(tooltip).not.toBeNull()
//   })
//
//   it('should not show tooltip if children is empty', () => {
//     const children = null
//     wrapper.rerender(
//       <Tooltip template={<div>tooltip</div>}>{children}</Tooltip>
//     )
//
//     const tooltipWrapper = wrapper.getByTestId('tooltip-wrapper')
//
//     fireEvent.mouseEnter(tooltipWrapper)
//
//     const tooltip = wrapper.queryByTestId('tooltip')
//
//     expect(tooltip).toBeNull()
//   })
//
//   it('should show tooltip if children is a "Node"', () => {
//     const children = <div>children</div>
//     wrapper.rerender(
//       <Tooltip template={<div>tooltip</div>}>{children}</Tooltip>
//     )
//
//     const tooltipWrapper = wrapper.getByTestId('tooltip-wrapper')
//
//     fireEvent.mouseEnter(tooltipWrapper)
//
//     const tooltip = wrapper.queryByTestId('tooltip')
//
//     expect(tooltip).not.toBeNull()
//   })
// })
"use strict";