import { useState } from 'react';
import { Toaster } from 'react-hot-toast';
import { AppWrapper } from './App.styled';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';

const App = () => {

  const [inputName, setInputName] = useState('');

  const haldleFormSubmit = inputName => {
    setInputName(inputName);
  }
    
    return (
      <AppWrapper>
        <Searchbar onSubmit={haldleFormSubmit} />
        <ImageGallery inputName={inputName} />
        <Toaster />
      </AppWrapper>
    );
}

export default App;
