import PropTypes from 'prop-types';
import { Component } from 'react';
import { ImageGalleryItemLi, ImageGalleryItemImage } from './ImageGalleryItem.styled';
import Modal from '../Modal/Modal';

class ImageGalleryItem extends Component {

    static propTypes = {
        option: PropTypes.shape({
            tags: PropTypes.string.isRequired,
            webformatURL: PropTypes.string.isRequired,
        }),
    }

    state = {
        showModal: false,
    }

    toggleModal = () => {
        this.setState(({ showModal }) => ({
            showModal: !showModal,
        }));
    }; 

    render() {
        const { option } = this.props;
        return (
            <ImageGalleryItemLi onClick={this.toggleModal}>
                <ImageGalleryItemImage src={option.webformatURL} alt={option.tags} />
                {this.state.showModal && <Modal onClose={this.toggleModal} option={option} />}
            </ImageGalleryItemLi>
        );
    }
    
}

export default ImageGalleryItem;
