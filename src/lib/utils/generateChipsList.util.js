export const generateChipsList = (chips, maxLength) => {
  if (chips.length > maxLength) {
    let hiddenChipsNumber = `+ ${chips.length - maxLength}`
    const hiddenChips = chips
      .slice(maxLength)
    const visibleChips = chips
      .slice(0, maxLength)

    return {
      visibleChips,
      hiddenChips,
      hiddenChipsNumber
    }
  }
  return {
    visibleChips: chips
  }
}
