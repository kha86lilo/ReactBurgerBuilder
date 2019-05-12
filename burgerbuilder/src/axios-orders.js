import axios from 'axios';

const instance = axios.create({
    baseURL : "https://react-burger-builder-945a1.firebaseio.com/"
});

export default instance;