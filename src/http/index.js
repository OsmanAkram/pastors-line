import axios from 'axios';

const http= axios.create({
    baseURL: process.env.REACT_APP_API_BASE_URL_OUR,
});

export default http;