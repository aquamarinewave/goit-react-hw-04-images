import PropTypes from 'prop-types';
import { Component } from 'react';
import toast from 'react-hot-toast';
import { SearchbarHeader, SearchForm, SearchFormButton, SearchFormButtonLabel, SearchFormInput } from './Searchbar.styled';

class Searchbar extends Component {

    static propTypes = {
        onSubmit: PropTypes.func.isRequired,
    }

    state = {
        inputName: '',
    }

    hangleNameOnChange = event => {
        this.setState({ inputName: event.currentTarget.value.toLowerCase() });
    }

    handleSubmit = event => {
        event.preventDefault();
        if (this.state.inputName.trim() === '') {
            toast.error('Type something in search input');
            return
        }
        this.props.onSubmit(this.state.inputName);
        this.setState({inputName: ''})
    }

    render() {
        return ( 
            <SearchbarHeader>
                    <SearchForm onSubmit={this.handleSubmit}>
                        <SearchFormButton type="submit">
                        <SearchFormButtonLabel>Search</SearchFormButtonLabel>
                        </SearchFormButton>

                        <SearchFormInput
                            type="text"
                            name="input"
                            value={this.state.inputName}
                            onChange={this.hangleNameOnChange}
                            autoComplete="off"
                            autoFocus
                            placeholder="Search images and photos"
                        />
                    </SearchForm>
            </SearchbarHeader>    
        )
    }
}

export default Searchbar;
