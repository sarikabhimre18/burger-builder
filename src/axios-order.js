import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://react-my-burger-dbd25.firebaseio.com/'
})
export default instance