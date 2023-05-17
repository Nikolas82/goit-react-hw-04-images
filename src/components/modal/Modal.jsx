import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import css from './Modal.module.css';

const modalRoot = document.querySelector('#modal-root');

export const Modal = ({src,alt,onClick}) => {

  useEffect(() => {
    const handleEscape = e => {
      if (e.code === 'Escape') {
        onClick();
      }
    };

    window.addEventListener('keydown', handleEscape);

    return () => {
      window.removeEventListener('keydown', handleEscape);
    };
  }, [onClick]);
 

  const handleCloseBackdrop = e => {
    if (e.target === e.currentTarget) {
      onClick();
    }
  };

  
    return createPortal(
      <div className={css.Overlay} onClick={handleCloseBackdrop}>
        <div className={css.Modal}>
          <img src={src} alt={alt} />
        </div>
      </div>,
      modalRoot
    );
  }


Modal.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};
