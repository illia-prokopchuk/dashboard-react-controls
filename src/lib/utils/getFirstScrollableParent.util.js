const regex = /(auto|scroll|hidden)/

const style = (node, prop) =>
  getComputedStyle(node, null).getPropertyValue(prop)

const scroll = node =>
  regex.test(
    style(node, 'overflow') +
      style(node, 'overflow-y') +
      style(node, 'overflow-x')
  )

export const getFirstScrollableParentUtil = node =>
  !node || node === document.body
    ? document.body
    : scroll(node)
    ? node
    : getFirstScrollableParentUtil(node.parentNode)
