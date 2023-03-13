import PropTypes from 'prop-types';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { SearchbarHeader, SearchForm, SearchFormButton, SearchFormButtonLabel, SearchFormInput } from './Searchbar.styled';

const Searchbar = ({ onSubmit }) => {

    const [inputName, setInputName] = useState('');

    const hangleNameOnChange = event => {
        setInputName(event.currentTarget.value.toLowerCase());
    }

    const handleSubmit = event => {
        event.preventDefault();

        if (inputName.trim() === '') {
            toast.error('Type something in search input');
            return
        }

        onSubmit(inputName);
        setInputName('')
    }

    return ( 
        <SearchbarHeader>
                <SearchForm onSubmit={handleSubmit}>
                    <SearchFormButton type="submit">
                    <SearchFormButtonLabel>Search</SearchFormButtonLabel>
                    </SearchFormButton>

                    <SearchFormInput
                        type="text"
                        name="input"
                        value={inputName}
                        onChange={hangleNameOnChange}
                        autoComplete="off"
                        autoFocus
                        placeholder="Search images and photos"
                    />
                </SearchForm>
        </SearchbarHeader>    
    )
}

export default Searchbar;

Searchbar.propTypes = {
    onSubmit: PropTypes.func.isRequired,
}