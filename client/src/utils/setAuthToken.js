import axios from 'axios'

const setAuthToken = token => {
    if (token) {
        // Add token to every axios request
        axios.defaults.headers.common['Authorization'] = token;
    } else {
        // Delete auth to every request
        delete axios.defaults.headers.common['Authorization'];
    }
}

export default setAuthToken