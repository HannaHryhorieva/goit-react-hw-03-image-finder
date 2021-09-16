import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { createPortal } from 'react-dom';

const modalRoot = document.querySelector('#modal-root');

class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }
  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = e => {
    if (e.code === 'Escape') {
      this.props.onClose();
    }
  };
  handleBackdropClick = event => {
    if (event.currentTarget === event.target) {
      this.props.onClose();
    }
  };
  render() {
    return createPortal(
      <div className="Overlay" onClick={this.handleBackdropClick}>
        <div className="Modal">
          <img
            src={this.props.imageUrl}
            alt={this.props.tags}
            width="1280"
            height="auto"
          />
        </div>
      </div>,
      modalRoot,
    );
  }
}
Modal.propTypes = {
  imageUrl: PropTypes.string,
  tags: PropTypes.string,
  onClose: PropTypes.func,
};
export default Modal;
