import axios from 'axios'
import { GET_ERRORS, SET_CURRENT_USER } from './types'
import setAuthToken from '../utils/setAuthToken'
import jwt_decode from 'jwt-decode'
import swal from 'sweetalert';

// Register User
export const registerUser = (userData, history) => dispatch => {
    axios.post('/api/users/register', userData)
        .then(res =>
            swal({
                title: "Registered Successfully!",
                icon: "success",
                confirm: true
            })
                .then((done) => {
                    if (done) {
                        history.push('/login')
                    }
                })
        )
        .catch(err => dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        }));
}

// Login User
export const loginUser = userData => dispatch => {
    axios.post('/api/users/login', userData)
        .then(res => {
            // Save to localStorage
            const { token } = res.data;
            // Set token to localStorage
            localStorage.setItem('jwtToken', token);
            // Set token to auth header
            setAuthToken(token);
            // Decode token to get user data
            const decoded = jwt_decode(token);
            // Set current user
            dispatch(setCurrentUser(decoded));
        })
        .catch(err => dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        }));
}

// Set logged in user
export const setCurrentUser = (decoded) => {
    return {
        type: SET_CURRENT_USER,
        payload: decoded
    }
}

// Logout
export const logoutUser = () => dispatch => {
    localStorage.removeItem('jwtToken');
    setAuthToken(false);
    dispatch(setCurrentUser({}))
}