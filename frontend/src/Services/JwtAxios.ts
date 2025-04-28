import axios from "axios";

// Use environment variable for baseURL with localhost fallback
export const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:4000';
export const IMAGES_URL = process.env.REACT_APP_IMAGES_URL || 'http://localhost:4000/images';

// Create new axios instance
const jwtAxios = axios.create({
    baseURL: API_URL
});

// Add interceptor to automatically inject JWT token
jwtAxios.interceptors.request.use(request => {
    if (localStorage.loginData) {
        const loginData = JSON.parse(localStorage.loginData);

        // Add Authorization header with Bearer token to requests
        request.headers = {
            Authorization: 'Bearer ' + loginData.token
        } as any;
    }

    return request;
})

export default jwtAxios;