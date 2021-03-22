import axios from 'axios'

const instance = axios.create({
    baseURL: 'https://react-burger-builder-ae428.firebaseio.com/'
});

export default instance;