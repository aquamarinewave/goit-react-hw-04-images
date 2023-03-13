
const baseUrl = "https://pixabay.com/api/";
const GLOBAL_KEY = "33017340-1f495014f3d6cee1ab5507ad9&q";
const per_page = 12;

 const fetchImages = (name, page = 1) => {
    return fetch(`${baseUrl}?key=${GLOBAL_KEY}=${name}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=${per_page}`)
            .then(response => {
                if (response.ok) {
                    return response.json();
                }

                return Promise.reject(new Error(`Oopps...no images with this name - ${this.props.inputName}`))
            })
}

export default fetchImages;