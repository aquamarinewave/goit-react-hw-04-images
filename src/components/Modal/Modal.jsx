import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Overlay, ModalWindow } from './Modal.styled';

const ModalPortal = document.getElementById('modal-root')

const Modal = ({ option, onClose }) => {

    const handleKeydown = e => {
        if (e.code === 'Escape') {
            onClose();
        }
    }

    const handleBackdrop = e => {
        if (e.currentTarget !== e.target) {
            onClose();
        }
    }

    const deleteEsc = () => {
        window.removeEventListener('keydown', handleKeydown);
    }


    useEffect(() => {
        window.addEventListener('keydown', handleKeydown);
        
        return () => {
            deleteEsc();
        } 
    },[]);

  

    return createPortal(
        <Overlay onClick={handleBackdrop} >
            <ModalWindow>
                <img src={option.largeImageURL} alt={option.tags} />
            </ModalWindow>
        </Overlay>, ModalPortal
    );
}

export default Modal;

Modal.propTypes = {
    option: PropTypes.shape({
        tags: PropTypes.string.isRequired,
        largeImageURL: PropTypes.string.isRequired,
    }),
    onClose: PropTypes.func.isRequired,
}