import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import { ImageGalleryList, Notification } from './ImageGallery.styled';
import Button from '../Button/Button';
import Loader from '../Loader/Loader';
import fetchImages from '../../services/Api'

const ImageGallery = ({ inputName }) => {

    const [hits, setHits] = useState(null);
    const [error, setError] = useState(null);
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(1);
    const [status, setStatus] = useState('idle');

    useEffect(() => {
        if (!inputName) {
            return;
        }
        
        setPage(1);
        setStatus('pending')
        console.log('1 f-------------------------');
        fetchImages(inputName, page)
            .then(response => {
                if (response.hits.length === 0) {
                    setStatus('rejected');
                    return
                }
                setHits([...response.hits]);
                setTotal(response.total);
                setStatus('resolved');
            })
            .catch(error => {
                setError(error);
                setStatus('rejected');
            })
    }, [inputName]);

    useEffect(() => {
        fetchImages(inputName, page)
            .then(response => {
                setHits([...hits, ...response.hits]);
                setTotal(response.total);
                setStatus('resolved');
            })
            .catch(error => {
                setError(error);
                setStatus('rejected');
            })
    }, [page]
    )


    const loadMorePhoto = () => {
        setPage(prevPage => prevPage + 1);     
    }

        if(status === 'idle') {
            return <Notification>Please, type something to the search</Notification>
        } 
        
        if(status === 'pending') {
            return <Loader />
        }

        if(status === 'rejected') {
            return <Notification>Oopps...no images with this name.{!error && <div>{error}</div>}</Notification>
        }

        if(status === 'resolved') {
             return (
                 <div>
                    <ImageGalleryList >
                        {hits.map(option => (
                            <ImageGalleryItem key={option.id} option={option} />
                        ))}
                    </ImageGalleryList>
                     {total > hits.length  && <Button onClick={loadMorePhoto}/>}
                </div>
            ) 
        }    
}

export default ImageGallery;

ImageGallery.propTypes = {
    inputName: PropTypes.string.isRequired,
}