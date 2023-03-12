import { Component } from 'react';
import { Toaster } from 'react-hot-toast';
import { AppWrapper } from './App.styled';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';

class App extends Component {

  state = {
    inputName: '',
  }

  haldleFormSubmit = inputName => {
    this.setState({inputName})
  }
    
  render() {
    const { hits, inputName } = this.state;
    return (
      <AppWrapper>
        <Searchbar onSubmit={this.haldleFormSubmit} />
        <ImageGallery options={hits} inputName={inputName}   />
        <Toaster />
      </AppWrapper>
    );
  }
};

export default App;
