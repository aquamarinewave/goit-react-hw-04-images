import PropTypes from 'prop-types';
import { Component } from 'react';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import { ImageGalleryList, Notification } from './ImageGallery.styled';
import Button from '../Button/Button';
import Loader from '../Loader/Loader';
import fetchImages from '../../services/Api'

class ImageGallery extends Component {

    static propTypes = {
        inputName: PropTypes.string.isRequired,
        options: PropTypes.shape({
            id: PropTypes.string.isRequired,
        }),
    }

    state = {
        hits: null,
        error: null,
        total: 0,
        page: 1,
        status: 'idle',
    }


    componentDidUpdate(prevProps, prevState) {
        if (prevProps.inputName !== this.props.inputName) {

            this.setState({ status: 'pending', page: 1 });
            
            fetchImages(this.props.inputName, this.state.page)
                .then(response => {
                    if (response.hits.length === 0) {
                        this.setState({ status: 'rejected'});
                        return
                    }
                    this.setState({
                        hits: [...response.hits],
                        total: response.total,
                        status: 'resolved', 
                    })
                })
                    
                .catch(error => this.setState({ error, status: 'rejected' }))
        }
    }

    loadMorePhoto = () => {
        const newPage = this.state.page + 1;
        this.setState(prevPage => ({
            page: newPage,
        }));
        fetchImages(this.props.inputName, newPage)
                .then(response => this.setState({
                    hits: [...this.state.hits, ...response.hits],
                    total: response.total,
                    status: 'resolved', 
                    }))
                .catch(error => this.setState({ error, status: 'rejected' }))
    }

    render() {
        if(this.state.status === 'idle') {
            return <Notification>Please, type something to the search</Notification>
        } 
        
        if(this.state.status === 'pending') {
            return <Loader />
        }

        if(this.state.status === 'rejected') {
            return <Notification>Oopps...no images with this name</Notification>
        }

        if(this.state.status === 'resolved') {
             return (
                 <div>
                    <ImageGalleryList >
                        {this.state.hits.map(option => (
                            <ImageGalleryItem key={option.id} option={option} />
                        ))}
                    </ImageGalleryList>
                     {this.state.total > this.state.hits.length  && <Button onClick={this.loadMorePhoto}/>}
                </div>
            ) 
        }
    }
    
}

export default ImageGallery;
