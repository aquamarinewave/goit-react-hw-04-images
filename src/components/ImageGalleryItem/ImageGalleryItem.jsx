import PropTypes from 'prop-types';
import { useState } from 'react';
import { ImageGalleryItemLi, ImageGalleryItemImage } from './ImageGalleryItem.styled';
import Modal from '../Modal/Modal';

const ImageGalleryItem = ({ option }) => {

    const [showModal, setShowModal] = useState(false);

    const toggleModal = () => {
        setShowModal(prevState => !prevState);
    }; 

    const { webformatURL, tags } = option;

    return (
        <ImageGalleryItemLi onClick={toggleModal}>
            <ImageGalleryItemImage src={webformatURL} alt={tags} />
            {showModal && <Modal onClose={toggleModal} option={option} />}
        </ImageGalleryItemLi>
    );    
}

export default ImageGalleryItem;

ImageGalleryItem.propTypes = {
    option: PropTypes.shape({
        tags: PropTypes.string.isRequired,
        webformatURL: PropTypes.string.isRequired,
    }),
}