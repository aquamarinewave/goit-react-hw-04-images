import PropTypes from 'prop-types';
import { Component } from 'react';
import { createPortal } from 'react-dom';
import { Overlay, ModalWindow } from './Modal.styled';

const ModalPortal = document.getElementById('modal-root')

class Modal extends Component {

    static propTypes = {
        option: PropTypes.shape({
            tags: PropTypes.string.isRequired,
            largeImageURL: PropTypes.string.isRequired,
        }),
        onClose: PropTypes.func.isRequired,
    }
    
    componentDidMount() {
        window.addEventListener('keydown', this.handleKeydown);
    }

    componentWillUnmount() {
        window.removeEventListener('keydown', this.handleKeydown);
    }

    handleKeydown = e => {
        if (e.code === 'Escape') {
            this.props.onClose();
        }
    }

    handleBackdrop = e => {
        if (e.currentTarget !== e.target) {
            this.props.onClose();
        }

    }

    render() {
        return createPortal(
            <Overlay onClick={this.handleBackdrop} >
                <ModalWindow>
                    <img src={this.props.option.largeImageURL} alt={this.props.option.tags} />
                </ModalWindow>
            </Overlay>, ModalPortal
        );
    }
}

export default Modal;
