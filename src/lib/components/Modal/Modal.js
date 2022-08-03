import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { CSSTransition } from 'react-transition-group'
import classNames from 'classnames'

import Backdrop from '../Backdrop/Backdrop'
import RoundedIcon from '../RoundedIcon/RoundedIcon'

import { MODAL_MD } from '../../constants'
import { MODAL_SIZES } from '../../types'

import { ReactComponent as CloseIcon } from '../../images/close.svg'

import './Modal.scss'

const Modal = ({ actions, children, className, location, onClose, size, show, title }) => {
  const [currentLocation, setCurrentLocation] = useState(location.pathname)
  const modalClassNames = classNames('modal', className, size && `modal-${size}`)

  useEffect(() => {
    setCurrentLocation(location.pathname)

    return () => {
      if (location.pathname !== currentLocation) {
        onClose()
      }
    }
  }, [currentLocation, location, onClose])

  return (
    <>
      <Backdrop onClose={onClose} show={show} />
      <CSSTransition in={show} timeout={300} classNames="modal-transition" unmountOnExit>
        <div className={modalClassNames} data-testid="modal">
          <div className="modal__header-button">
            <RoundedIcon data-testid="pop-up-close-btn" onClick={onClose} tooltipText="Close">
              <CloseIcon />
            </RoundedIcon>
          </div>
          <div className="modal__content">
            <div className="modal__header">
              <h5 className="modal__header-title">{title}</h5>
            </div>
            <div className="modal__body">{children}</div>
            {actions && actions.length > 0 && (
              <div className="modal__footer">
                <div className="modal__footer-actions">
                  {actions.map((action, idx) => (
                    <div key={idx}>{action}</div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </CSSTransition>
    </>
  )
}

Modal.defaultProps = {
  actions: [],
  show: false,
  size: MODAL_MD,
  title: ''
}

Modal.propTypes = {
  actions: PropTypes.array,
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.object,
    PropTypes.node,
    PropTypes.string
  ]).isRequired,
  location: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
  show: PropTypes.bool.isRequired,
  size: MODAL_SIZES,
  title: PropTypes.string
}

export default Modal
