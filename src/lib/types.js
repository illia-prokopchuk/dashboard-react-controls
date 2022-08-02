import PropTypes from 'prop-types'

import {
  DANGER_BUTTON,
  LABEL_BUTTON,
  MODAL_SM,
  MODAL_MD,
  MODAL_LG,
  PRIMARY_BUTTON,
  SECONDARY_BUTTON,
  TERTIARY_BUTTON
} from './constants'

export const BUTTON_VARIANTS = PropTypes.oneOf([
  PRIMARY_BUTTON,
  SECONDARY_BUTTON,
  TERTIARY_BUTTON,
  DANGER_BUTTON,
  LABEL_BUTTON
])

export const CHIP = PropTypes.shape({
    delimiter: PropTypes.element,
    id: PropTypes.string,
    value: PropTypes.string.isRequired
})

export const CHIP_INPUT_LIST = PropTypes.arrayOf(
    PropTypes.shape({
        disabled: PropTypes.bool,
        icon: PropTypes.element,
        id: PropTypes.string.isRequired,
        label: PropTypes.string.isRequired,
        subLabel: PropTypes.string,
        ui: PropTypes.shape({})
    })
)

export const CHIP_OPTIONS = PropTypes.shape({
    background: PropTypes.oneOf([
        'none',
        'orange',
        'green',
        'purple',
        'grey',
        'sorbus',
        'java',
        'amethyst'
    ]),
    boldValue: PropTypes.bool,
    borderColor: PropTypes.oneOf([
        'transparent',
        'orange',
        'green',
        'purple',
        'grey'
    ]),
    density: PropTypes.oneOf(['dense', 'normal', 'medium']),
    font: PropTypes.oneOf(['primary', 'white', 'green', 'purple', 'orange']),
    borderRadius: PropTypes.oneOf(['primary', 'secondary'])
})

export const CHIPS = PropTypes.arrayOf(CHIP)

export const POP_UP_CUSTOM_POSITION = PropTypes.shape({
  element: PropTypes.shape({}),
  position: PropTypes.oneOf(['top-left', 'top-right', 'bottom-left', 'bottom-right'])
})

export const MODAL_SIZES = PropTypes.oneOf([MODAL_SM, MODAL_MD, MODAL_LG])

export const CONFIRM_DIALOG_CANCEL_BUTTON = PropTypes.shape({
  handler: PropTypes.func,
  label: PropTypes.string.isRequired,
  variant: PropTypes.string.isRequired
})
export const CONFIRM_DIALOG_SUBMIT_BUTTON = PropTypes.shape({
  handler: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
  variant: PropTypes.string.isRequired
})

export const WIZARD_STEPS_CONFIG = PropTypes.arrayOf(
  PropTypes.shape({
    id: PropTypes.string,
    label: PropTypes.string,
    getActions: PropTypes.func
  })
)

export const INPUT_LINK = PropTypes.shape({
  show: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  url: PropTypes.string
})

export const SELECT_OPTION = PropTypes.shape({
  disabled: PropTypes.bool,
  hidden: PropTypes.bool,
  icon: PropTypes.element,
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  status: PropTypes.string,
  subLabel: PropTypes.string
})

export const SELECT_OPTIONS = PropTypes.arrayOf(SELECT_OPTION)

export const INPUT_VALIDATION_RULES = PropTypes.arrayOf(
  PropTypes.shape({
    name: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    pattern: PropTypes.oneOfType([PropTypes.instanceOf(RegExp), PropTypes.func]).isRequired,
    isValid: PropTypes.bool
  })
)

export const COMBOBOX_SUGGESTION_LIST = PropTypes.arrayOf(
  PropTypes.shape({
    customDelimiter: PropTypes.string,
    id: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired
  })
)

export const COMBOBOX_VALIDATION_RULES = PropTypes.arrayOf(
  PropTypes.shape({
    name: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    isValid: PropTypes.bool
  })
)

export const COMBOBOX_SELECT_OPTIONS = PropTypes.arrayOf(
  PropTypes.shape({
    className: PropTypes.string,
    id: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired
  })
)
